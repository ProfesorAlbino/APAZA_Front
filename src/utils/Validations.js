import { getCookie } from "@/config/CookiesService";

export function isUserLoggedAdmin() {
    const user = getCookie("User");
    if (!user || user === "undefined" || user === "null") return false;
    const userObj = JSON.parse(user);
    return userObj.role === "admin";
}