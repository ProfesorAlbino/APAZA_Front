const DEV_MODE = false;
const LOCAL_API_URL = "http://localhost:3000";//<-- EN MI PC NO SIRVE EL LOCALHOST
const API_URL = "https://apaza-api.onrender.com";

function getConfig() {
    return {
        URL: DEV_MODE ? LOCAL_API_URL : API_URL
    }
}

export { getConfig };