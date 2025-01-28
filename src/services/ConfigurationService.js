import { invoke } from '@tauri-apps/api/core';

class ConfigurationSingleton {
    coreApiUrl = null;
    launcherApiUrl = null;
    ndibcoinApiUrl = null;
    supabaseUrl = null;
    remoteVars = null;

    async init() {
        const [coreApiUrl, launcherApiUrl, ndibcoinApiUrl, supabaseUrl, remoteVars] = await Promise.all([
            invoke("get_env", { name: "CORE_API_URL" }),
            invoke("get_env", { name: "LAUNCHER_API_URL" }),
            invoke("get_env", { name: "NDIBCOIN_API_URL" }),
            invoke("get_env", { name: "SUPABASE_URL" }),
            invoke("get_remote_vars")
        ]);

        this.coreApiUrl = coreApiUrl;
        this.launcherApiUrl = launcherApiUrl;
        this.ndibcoinApiUrl = ndibcoinApiUrl;
        this.supabaseUrl = supabaseUrl;
        this.remoteVars = remoteVars;
    }

    getCoreApiUrl() {
        return this.coreApiUrl;
    }

    getLauncherApiUrl() {
        return this.launcherApiUrl;
    }

    getNdibcoinApiUrl() {
        return this.ndibcoinApiUrl;
    }

    getSupabaseUrl() {
        return this.supabaseUrl;
    }

    getCoreBucketName() {
        return this.remoteVars.coreBucket;
    }

    getCoreUserProfileId() {
        return this.remoteVars.coreUserProfileId;
    }

    getCoreUserBgId() {
        return this.remoteVars.coreUserBgId;
    }

    getCoreUserStorageFolder() {
        return this.remoteVars.coreUserStorageFolder;
    }

    getLauncherBucketName() {
        return this.remoteVars.launcherBucket;
    }

    getNdibBucketName() {
        return this.remoteVars.ndibBucket;
    }

    getNdibBgId() {
        return this.remoteVars.ndibBgId;
    }

    getNdibIconId() {
        return this.remoteVars.ndibIconId;
    }
}

async function createConfig() {
    const config = new ConfigurationSingleton();
    await config.init();
    return config;
}

export const ConfigurationHandler = await createConfig(); 
