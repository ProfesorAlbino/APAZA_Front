const DEV_MODE = true;
const LOCAL_API_URL = "http://localhost:3000";
const API_URL = "https://apaza-api.onrender.com";
const EXPIRATION_DAYS = DEV_MODE ? 1 : Infinity;
const SECURE = !DEV_MODE;
const SAME_SITE = 'none';

function getConfig() {
    return {
        URL: DEV_MODE ? LOCAL_API_URL : API_URL
    }
}

function cookiesConfig() {
    return {
        expires: EXPIRATION_DAYS, // Tiempo de expiración (días)
        secure: SECURE, // Solo para conexiones HTTPS
        sameSite: SAME_SITE
    }
}

export { getConfig, cookiesConfig };