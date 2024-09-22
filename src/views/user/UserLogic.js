import { login, register } from '@/services/AuthService';
import { getStatusCodeMessage } from '@/config/StatusCodes';
import { createCookie } from '@/config/CookiesService';

export async function loginUser(user) {
    const res = await login(user)
        .then(response => {
            createCookie('User', JSON.stringify(response.data.data));
            return {
                status: true,
                message: getStatusCodeMessage(response.status)
            }
        })
        .catch((e) => {
            return {
                status: false,
                message: getStatusCodeMessage(e.status)
            }
        });
    return res;
}

export async function registerUser(user) {
    const res = await register(user)
        .then(response => {
            return {
                status: true,
                message: getStatusCodeMessage(response.status)
            }
        })
        .catch((e) => {
            return {
                status: false,
                message: getStatusCodeMessage(e.status)
            }
        });
    return res;
}

