export function getStatusCodeMessage(status) {
    if (status >= 200 && status <= 299) {
        return "Correcto";
    } else if (status >= 300 && status <= 399) {
        return "Redirection";
    } else if (status >= 400 && status <= 499) {
        return "Error";
    }
    return "Error del servidor";
}