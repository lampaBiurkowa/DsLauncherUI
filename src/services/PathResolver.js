import { ConfigurationHandler } from "./ConfigurationService";

export function getProfilePath(id) {
    return `${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getCoreBucketName()}/${ConfigurationHandler.getCoreUserStorageFolder()}/${id}/${ConfigurationHandler.getCoreUserProfileId()}`;
}