import Cookies from 'js-cookie';
import { cookiesConfig } from './BasicConfig';

/**
 * Creates a standard cookie with the given name and value.
 * The cookie will expire in 7 days, it will only be sent over HTTPS connections, and it will be sent with the SameSite=None attribute.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @returns {void}
 */
function createCookieStandard(name, value) {
    createCookie(name, value, cookiesConfig());
}

/**
 * Creates a cookie with the specified name, value, and options.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} options - The options for the cookie. The options are: expires, path, domain, secure, and sameSite.
 */
function createCookie(name, value, options) {
    Cookies.set(name, value, options);
}

/**
 * Removes a cookie with the specified name.
 * 
 * @param {string} name - The name of the cookie to remove.
 */
function removeCookie(name) {
    Cookies.remove(name);
}

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param {string} name - The name of the cookie.
 * @returns {string} The value of the cookie.
 */
function getCookie(name) {
    return Cookies.get(name);
}


export { createCookieStandard, createCookie, removeCookie, getCookie };