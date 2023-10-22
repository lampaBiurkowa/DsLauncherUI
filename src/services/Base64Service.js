import { UsersCache } from "./CacheService";

export function getProfilePictureBase64(userId) {
    return UsersCache.getById(userId).images.profileImageBase64;
}
