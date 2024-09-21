<script setup>
import { onMounted, ref } from 'vue';
import { login, register } from '@/services/AuthService';
import { getEvents } from '@/services/EventService';

const userLogin = ref({
    name: '',
    email: '',
    password: ''
});

onMounted(() => {
    initComponent();
    getEvents().then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error);
    });
});

async function loginEvent() {
    console.log(userLogin.value);
    const userForLogin = {
        email: userLogin.value.email,
        password: userLogin.value.password
    };
    login(userForLogin)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
};

async function registerEvent() {
    console.log(userLogin.value);

    register(userLogin.value)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
};

function initComponent() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

</script>

<template>
    <div class="center">
        <div class="container-login" id="container">
            <!-- FORM REGISTER -->
            <div class="form-container sign-up-container form-floating">
                <div class="form">
                    <h1>Crear cuenta</h1>
                    <div class="form-floating">
                        <input class="form-control" id="nameRegister" type="text" placeholder="Nombre"
                            v-model="userLogin.nameUser" />
                        <label for="nameRegister">Nombre</label>
                    </div>
                    <div class="form-floating">
                        <input class="form-control" id="emailRegister" type="email" placeholder="Correo electrónico"
                            v-model="userLogin.email" />
                        <label for="emailRegister">Correo electrónico</label>
                    </div>
                    <div class="form-floating">
                        <input class="form-control" id="passRegister" type="password" placeholder="Contraseña"
                            v-model="userLogin.password" />
                        <label for="passRegister">Contraseña</label>
                    </div>
                    <button @click="registerEvent()">Registrarse</button>
                </div>
            </div>
            <!-- FORM LOGIN -->
            <div class="form-container sign-in-container">
                <div class="form">
                    <h1>Iniciar Sesión</h1>
                    <div class="form-floating">
                        <input class="form-control" id="emailLogin" type="email" placeholder="Correo electrónico"
                            v-model="userLogin.email" />
                        <label for="emailLogin">Correo electrónico</label>
                    </div>
                    <div class="form-floating">
                        <input class="form-control" id="passLogin" type="password" placeholder="Contraseña"
                            v-model="userLogin.password" />
                        <label for="passLogin">Contraseña</label>
                    </div>
                    <a href="#">Olvidó su contraseña?</a>
                    <button @click="loginEvent()">Iniciar Sesión</button>
                </div>
            </div>
            <!-- PANELES CON MENSAJES -->
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Hola!</h1>
                        <p>Únetenos, así nos podrás apoyar en nuestras actividades y mucho más</p>
                        <button class="ghost" id="signIn">Iniciar Sesión</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Bienvenido de vuelta!</h1>
                        <p>Inicia sesión y obtén mucha información sobre el autismo</p>
                        <button class="ghost" id="signUp">Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
* {
    box-sizing: border-box;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    margin: -20px 0 50px;
}

h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    /* color: #333; */
    color: var(--text-color-3);
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    /* border: 1px solid #FF4B2B;
    background-color: #FF4B2B; 
    color: #FFFFFF;*/
    border: 1px solid var(--primary-color);
    background-color: var(--background-color);
    color: var(--text-color-1);
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    /* border-color: #FFFFFF; */
    border-color: var(--text-color-1);
}

.form {
    /* background-color: #FFFFFF; */
    background-color: var(--background-color-3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    /* background-color: #eee; */
    background-color: var(--background-color-3);
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.container-login {
    /* background-color: #fff; */
    background-color: var(--background-color-3);
    border-radius: 10px;
    /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22); */
    box-shadow: 0 14px 28px var(--background-color) 0 10px 10px var(--primary-color);
    position: relative;
    border: 1px solid var(--background-color);
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container-login.right-panel-active .sign-in-container {
    transform: translateX(100%);
    opacity: 0;
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container-login.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container-login.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    /* background: #FF416C; 
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    */
    background: var(--background-color);
    background: -webkit-linear-gradient(to right, var(--primary-color), var(--background-color));
    background: linear-gradient(to right, var(--primary-color), var(--background-color));
    /* <-- la combinación de colores de izq a der del panel */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    /* color: #FFFFFF; */
    color: var(--text-color-1);
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container-login.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container-login.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container-login.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    /* border: 1px solid #DDDDDD; */
    border: 1px solid var(--text-color-1);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}
</style>
