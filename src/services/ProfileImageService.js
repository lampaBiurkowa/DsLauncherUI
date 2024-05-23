import { publicPath } from "../App";
import { UsersCache } from "./CacheService";

export function getProfilePictureUrl(userId) {
    console.log('wazne', userId);
    if (userId) {
        return `${publicPath}${UsersCache.getById(userId).profileImage}`;
    }
    else {
        return `${publicPath}0a032d94-7b1b-4e02-9a31-5566e90710d3.jpeg`;
    }
}
