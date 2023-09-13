export class NdibverFileHandler {
    constructor() {
        this.SEPARATOR = ':';
    }

    getVersionsData(path) {
        const output = {};

        if (!fs.existsSync(path)) {
            return output;
        }

        const base64Content = fs.readFileSync(path, 'base64');
        const decoderConf = new EndcoderConfiguration();
        const decodedContent = this.base64Decode(base64Content, decoderConf.GetEncodingPassword());

        const lines = decodedContent.split('\n');
        for (const line of lines) {
            const components = line.split(this.SEPARATOR);
            if (components.length !== 2) {
                console.warn(`NdibverFileHandler: Warning: Cannot parse line ${line}`);
                continue;
            }

            const appName = components[0];
            if (output.hasOwnProperty(appName)) {
                console.warn(`NdibverFileHandler: Warning: app ${appName} defined more than once`);
                continue;
            }

            const version = parseInt(components[1], 10);
            output[appName] = version;
        }

        return output;
    }

    saveVersionsData(path, versionsData) {
        let content = '';

        for (const [appName, version] of Object.entries(versionsData)) {
            content += `${appName}${this.SEPARATOR}${version}\n`;
        }

        const encoderConf = new EndcoderConfiguration();
        const base64Content = this.base64Encode(content, encoderConf.GetEncodingPassword());
        fs.writeFileSync(path, base64Content, 'base64');
    }

    base64Encode(input, password) {
        const buffer = Buffer.from(input, 'utf8');
        const passwordBuffer = Buffer.from(password, 'utf8');
        const encryptedBuffer = Buffer.concat([buffer, passwordBuffer]);
        return encryptedBuffer.toString('base64');
    }

    base64Decode(input, password) {
        const encryptedBuffer = Buffer.from(input, 'base64');
        const passwordBuffer = Buffer.from(password, 'utf8');
        const contentBuffer = encryptedBuffer.slice(0, -passwordBuffer.length);
        return contentBuffer.toString('utf8');
    }
}
