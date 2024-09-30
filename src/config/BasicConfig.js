const DEV_MODE = true;
const LOCAL_API_URL = "http://localhost:3000";
const API_URL = "https://apaza-api.onrender.com";
const EXPIRATION_DAYS = DEV_MODE ? 160 : 30;
const SECURE = !DEV_MODE;
const SAME_SITE = 'none';
const LANG_DEFAULT = 'es';

function getConfig() {
    return {
        URL: DEV_MODE ? LOCAL_API_URL : API_URL,
        LANG: LANG_DEFAULT
    }
}

async function getLang(lang) {
    let messages;
    switch (lang) {
        case 'es':
            messages = await import('@/config/lang/es.json');
            break;
        case 'en':
            messages = await import('@/config/lang/en.json');
            break;
        default:
            messages = await import('@/config/lang/es.json');
    }
    return messages.default;
}

function cookiesConfig() {
    return {
        expires: EXPIRATION_DAYS, // Tiempo de expiración (días)
        secure: SECURE, // Solo para conexiones HTTPS
        sameSite: SAME_SITE
    }
}

export { getConfig, cookiesConfig, getLang, LANG_DEFAULT };