import https from 'https';
import JSZip from 'jszip'; // Import JSZip

export class DownloadHandler {
    constructor(appName, appDirectoryPath = 'dibApps') {
        this.appName = appName;
        this.appDirectoryPath = appDirectoryPath;
        this.fileSizeInfoGet = false;
        this.apiData = {
            Protocol: 'http',
            Host: 'localhost',
            Port: 6544,
        };
        this.versionsData = {};
    }

    async createResourcesIfDoesntExist() {
        if (!fs.existsSync(this.appDirectoryPath)) {
            fs.mkdirSync(this.appDirectoryPath, { recursive: true });
        }

        if (!fs.existsSync('dibUpdater')) {
            fs.mkdirSync('dibUpdater', { recursive: true });
        }
    }

    async updateToMaster(force = false) {
        await this.createResourcesIfDoesntExist();

        let uri = `${this.apiData.Protocol}://${this.apiData.Host}:${this.apiData.Port}/Files/Download/${this.appName}`;
        if (!force && this.versionsData[this.appName]) {
            uri += `/master/${this.versionsData[this.appName]}`;
        }

        await this.update(uri, force);
    }

    async update(uri, force) {
        const downloadedZipPath = this.getDownloadedZipDestinationPath();

        // Make an HTTP request to download the file
        const response = await this.downloadFile(uri);
        const fileStream = fs.createWriteStream(downloadedZipPath);

        // Pipe the HTTP response content to the file
        response.pipe(fileStream);

        // Wait for the file to finish downloading
        await new Promise((resolve) => {
            fileStream.on('finish', async () => {
                fileStream.close();

                // Proceed with extracting and installing
                await this.extractZip(downloadedZipPath);
                this.install(force);
                this.updateAppVersion();
                this.removeInstallationFiles();
                this.Installed?.(this, this.appName);
                this.fileSizeInfoGet = false;

                resolve();
            });
        });
    }

    async downloadFile(uri) {
        // Make an HTTP GET request to the given URI
        return new Promise((resolve, reject) => {
            https.get(uri, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download from ${uri}`));
                    return;
                }
                resolve(response);
            });
        });
    }

    async extractZip(zipPath) {
        const destinationPath = this.getPathToUpdatePack();
        if (fs.existsSync(destinationPath)) {
            fs.rmSync(destinationPath, { recursive: true });
        }
    
        // Use 'jszip' to extract the ZIP file
        const zip = new JSZip();
    
        try {
            const data = await fs.promises.readFile(zipPath);
            const archive = await zip.loadAsync(data);
            await Promise.all(
                Object.keys(archive.files).map(async (filename) => {
                    const file = archive.files[filename];
                    if (!file.dir) {
                        const content = await file.async('nodebuffer');
                        const outputPath = `${destinationPath}/${filename}`;
                        this.createDirectoryFromPath(outputPath);
                        fs.writeFileSync(outputPath, content);
                    }
                })
            );
        } catch (error) {
            throw new Error(`Failed to extract ZIP file: ${error.message}`);
        }
    }

    onDownloadProgressChanged(sender, e) {
        if (!this.fileSizeInfoGet) {
            this.FileSizeInfoGet?.(sender, e.TotalBytesToReceive);
            this.fileSizeInfoGet = true;
        }

        this.PercentageChanged?.(sender, e);
    }

    getDownloadedZipDestinationPath() {
        return `dibUpdater/${this.appName}.zip`;
    }

    getPathToUpdatePack() {
        return `dibUpdater/${this.appName}`;
    }

    async updateToVersion(targetVersion, force = false) {
        await this.createResourcesIfDoesntExist();

        let uri = `${this.apiData.Protocol}://${this.apiData.Host}:${this.apiData.Port}/Download/${this.appName}/${targetVersion}`;
        const ndibver = new NdibverFileHandler();
        this.versionsData = ndibver.GetVersionsData(NDIBVER_FILE_PATH);
        if (!force && this.versionsData[this.appName]) {
            uri += `/${this.versionsData[this.appName]}`;
        }

        await this.update(uri, force);
    }

    install(force) {
        if (!fs.existsSync(this.getPathToApp())) {
            fs.mkdirSync(this.getPathToApp(), { recursive: true });
        }

        if (force) {
            this.clearAppDirectory();
        } else {
            this.removeUnnecessaryFiles();
        }

        this.copyNecessaryFiles();
    }

    getPathToApp() {
        return `${this.appDirectoryPath}/${this.appName}`;
    }

    clearAppDirectory() {
        fs.rmSync(this.getPathToApp(), { recursive: true });
        fs.mkdirSync(this.getPathToApp(), { recursive: true });
    }

    removeUnnecessaryFiles() {
        const pathToNdibrm = `${this.getPathToUpdatePack()}/${NDIBRM_FILE_RELATIVE_PATH}`;
        if (!fs.existsSync(pathToNdibrm)) {
            return;
        }

        const filesToRemovePaths = fs.readFileSync(pathToNdibrm, 'utf8').split('\n');
        for (const path of filesToRemovePaths) {
            const filePath = `${this.getPathToApp()}/${path}`;
            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath);
            }
        }
    }

    copyNecessaryFiles() {
        const pathToUpdatePack = this.getPathToUpdatePack();
        const files = this.getAllFilesInDirectory(pathToUpdatePack);

        for (const filePath of files) {
            const relativePart = filePath.replace(pathToUpdatePack, '');
            const pathInApp = `${this.getPathToApp()}/${relativePart}`;
            this.createDirectoryFromPath(pathInApp);
            fs.copyFileSync(filePath, pathInApp);
        }
    }

    createDirectoryFromPath(path) {
        if (!fs.existsSync(path)) {
            this.createDirectoryFromPath(require('path').dirname(path));
            fs.mkdirSync(path);
        }
    }

    getAllFilesInDirectory(directory) {
        let fileArray = [];
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = `${directory}/${file}`;
            const fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) {
                fileArray.push(filePath);
            } else if (fileStat.isDirectory()) {
                fileArray = fileArray.concat(this.getAllFilesInDirectory(filePath));
            }
        }

        return fileArray;
    }

    updateAppVersion() {
        const currentVersion = this.getVersion();
        const ndibver = new NdibverFileHandler();
        this.versionsData = ndibver.GetVersionsData(NDIBVER_FILE_PATH);

        if (this.versionsData[this.appName]) {
            this.versionsData[this.appName] = currentVersion;
        } else {
            this.versionsData[this.appName] = currentVersion;
        }

        ndibver.SaveVersionsData(NDIBVER_FILE_PATH, this.versionsData);
    }

    getVersion() {
        const pathToNdibmd = `${this.getPathToApp()}/${NDIBMD_FILE_RELATIVE_PATH}`;
        const ndibmd = new NdibmdFileHandler(pathToNdibmd);
        return ndibmd.Version;
    }

    removeInstallationFiles() {
        fs.rmSync('dibUpdater', { recursive: true });
        fs.rmSync(`${this.getPathToApp()}/${NDIB_DIRECTORY_RELATIVE_PATH}`, { recursive: true });
    }

    async uninstall() {
        this.removeAppFromNdibverFile();
        if (fs.existsSync(this.getPathToApp())) {
            fs.rmSync(this.getPathToApp(), { recursive: true });
        }
    }

    removeAppFromNdibverFile() {
        const ndibver = new NdibverFileHandler();
        const versionsData = ndibver.GetVersionsData(NDIBVER_FILE_PATH);

        if (versionsData[this.appName]) {
            delete versionsData[this.appName];
        }

        ndibver.SaveVersionsData(NDIBVER_FILE_PATH, versionsData);
    }

    async isUpdateAvailable() {
        const reader = new ProductAPIReader(this.apiData);
        const versionNumber = await reader.VersionByNameAsync(this.appName);
        const ndibver = new NdibverFileHandler();
        this.versionsData = ndibver.GetVersionsData(NDIBVER_FILE_PATH);

        if (this.versionsData[this.appName]) {
            return versionNumber !== this.versionsData[this.appName];
        }

        return false;
    }

    async isInstalled() {
        const ndibver = new NdibverFileHandler();
        const versionsData = ndibver.GetVersionsData(NDIBVER_FILE_PATH);
        return versionsData[this.appName] !== undefined;
    }
}