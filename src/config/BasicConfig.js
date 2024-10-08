const DEV_MODE = true;
const LOCAL_API_URL = "http://localhost:3000";
const API_URL = "https://apaza-api.onrender.com";
const EXPIRATION_DAYS = DEV_MODE ? 160 : 30;
const SECURE = !DEV_MODE;
const SAME_SITE = 'none';
const LANG_DEFAULT = 'es';
let language = LANG_DEFAULT;

function getConfig() {
    return {
        URL: DEV_MODE ? LOCAL_API_URL : API_URL,
        LANG: LANG_DEFAULT
    }
}

async function getLang(lang) {
    let language;
    try {
        language = await import(`@/config/lang/${lang}.json`);
    } catch {
        language = await import(`@/config/lang/${LANG_DEFAULT}.json`);
    }
    return language.default ?? language;
}

function cookiesConfig() {
    return {
        expires: EXPIRATION_DAYS, // Tiempo de expiración (días)
        secure: SECURE, // Solo para conexiones HTTPS
        sameSite: SAME_SITE
    }
}

function setLang(lang) {
    language = lang;
}

export { getConfig, cookiesConfig, getLang, LANG_DEFAULT, setLang, language };