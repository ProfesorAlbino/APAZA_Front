<script setup>
import { onMounted, ref } from 'vue'
import { loginUser, registerUser } from './UserLogic'
import { Toast, Modal } from 'bootstrap'
import NotificationToast from '@/components/toasts/NotificationToast.vue'
import { isUserLoggedAdmin } from '@/utils/Validations'
import { removeCookie } from '@/config/CookiesService'
import { useRouter } from 'vue-router'
import LoadingModal from '@/components/modals/LoadingModal.vue'
import { getLangForPage, getConfig } from '@/config/BasicConfig'
import ShowPswdIcon from '@/components/icons/others/ShowPswdIcon.vue'
import HidePswdIcon from '@/components/icons/others/HidePswdIcon.vue'
import BackIcon from '@/components/icons/others/BackIcon.vue'

const PAGE = 'loginpage'
const router = useRouter()
const lang = ref({}) //lang.value.loginpage?.messages?.cantLogin || ''
const isLog = ref(false)
const show = ref(false)
const showPswd = ref(true)

const userLogin = ref({
  name: '',
  email: '',
  password: ''
})

const notify = ref({
  header: lang.value?.welcome || '',
  body: lang.value?.correctText || ''
})

onMounted(async () => {
  if (isUserLoggedAdmin()) isLog.value = true
  await getLangForPage(getConfig().CURRENT_LANG, PAGE)
    .then((data) => {
      lang.value = data
    })
    .catch(() => {
      router.go(0)
    })
})

async function loginEvent() {
  modalLoading()
  const userForLogin = {
    email: userLogin.value.email,
    password: userLogin.value.password
  }
  const res = await loginUser(userForLogin)
  if (res && res.status) {
    showNotify(res.message, lang.value?.welcome || '')
    isLog.value = true
    setTimeout(() => {
      router.go(0)
    }, 1500)
  } else {
    showNotify(res ? res.message : lang.value.loginpage?.messages?.cantLoginMsg || '')
    setTimeout(() => {
      router.go(0)
    }, 1500)
  }
}

async function registerEvent() {
  modalLoading()
  if (!isLog.value) return
  const res = await registerUser(userLogin.value)
  if (res && res.status) {
    showNotify(res.message, lang.value.loginpage?.messages?.registerSuccessMsg || '')
    setTimeout(() => {
      router.go(0)
    }, 1500)
  } else {
    showNotify(res ? res.message : lang.value.loginpage?.messages?.cantRegisterMsg || '')
    setTimeout(() => {
      router.go(0)
    }, 1500)
  }
}

function logoutEvent() {
  removeCookie('User')
  isLog.value = false
  router.go(0)
}

function showNotify(header, body) {
  notify.value.header = header
  notify.value.body = body

  const toastLive = document.getElementById('liveToast')
  const toastBootstrap = Toast.getOrCreateInstance(toastLive)
  toastBootstrap.show()
}

const modalLoading = () => {
  const myModal = Modal.getOrCreateInstance(document.getElementById('load'))
  myModal.show()
}

function toggleShow() {
  show.value = !show.value
}

const handleShowPswd = () => {
  showPswd.value = !showPswd.value
}

function goToPage(url) {
  router.push(url)
}
</script>

<template>
  <div class="center">
    <div :class="show ? 'container-login right-panel-active' : 'container-login'">
      <!-- FORM REGISTER -->
      <div class="form-container sign-up-container form-floating">
        <div class="form">
          <div>
            <h1 id="cs-h1" class="my-4">{{ lang.loginpage?.titles?.createAccountText || '' }}</h1>
            <div class="divider"></div>
            <div class="form-floating">
              <input
                class="form-control"
                id="nameRegister"
                type="text"
                placeholder="Nombre"
                v-model="userLogin.name"
              />
              <label for="nameRegister">{{ lang.loginpage?.titles?.nameText || '' }}</label>
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                id="emailRegister"
                type="email"
                placeholder="Correo electrónico"
                v-model="userLogin.email"
              />
              <label for="emailRegister">{{ lang.loginpage?.titles?.emailText || '' }}</label>
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                id="passRegister"
                type="password"
                placeholder="Contraseña"
                v-model="userLogin.password"
              />
              <label for="passRegister">{{ lang.loginpage?.titles?.passwordText || '' }}</label>
            </div>
            <button @click="registerEvent()">
              {{ lang.loginpage?.titles?.registerText || '' }}
            </button>
          </div>
          <div class="tape hide--element mt-3">
            <button class="tape-btn-back ms-2 mb-2" @click="toggleShow">
              <BackIcon></BackIcon>
            </button>
          </div>
        </div>
      </div>
      <!-- FORM LOGIN -->
      <div class="form-container sign-in-container" :class="{ 'hide-element': isLog }">
        <div class="form">
          <div v-if="!isLog">
            <h1 id="cs-h1" class="mb-4">{{ lang.loginpage?.titles?.loginText || '' }}</h1>
            <div class="form-floating mb-3">
              <input
                class="form-control"
                id="emailLogin"
                type="email"
                placeholder="Correo electrónico"
                v-model="userLogin.email"
              />
              <label for="emailLogin">{{ lang.loginpage?.titles?.emailText || '' }}</label>
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                id="passLogin"
                :type="showPswd ? 'password' : 'text'"
                placeholder="Contraseña"
                v-model="userLogin.password"
              />
              <span class="showPswd" @click="handleShowPswd">
                <div v-if="showPswd">
                  <ShowPswdIcon />
                </div>
                <div v-else>
                  <HidePswdIcon />
                </div>
              </span>
              <label for="passLogin">{{ lang.loginpage?.titles?.passwordText || '' }}</label>
            </div>
            <!-- <a href="#">Olvidó su contraseña?</a> -->
            <button @click="loginEvent()">{{ lang.loginpage?.titles?.loginText || '' }}</button>
          </div>
          <div v-if="isLog">
            <h1 id="cs-h1" class="mb-3">{{ lang.loginpage?.titles?.loggedText || '' }}</h1>
            <button @click="logoutEvent()">{{ lang.loginpage?.titles?.logoutText || '' }}</button>
          </div>
        </div>
      </div>
      <!-- PANELES CON MENSAJES -->
      <div class="overlay-container hide-element" :class="{ 'show-element': isLog }">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 id="cs-h1">{{ lang.loginpage?.titles?.areAdminText || '' }}</h1>
            <button class="ghost" id="signIn" @click="toggleShow">
              {{ lang?.backText || '' }}
            </button>
          </div>
          <div v-if="isLog" class="overlay-panel overlay-right">
            <h1>¿{{ lang.loginpage?.titles?.createAnotherAdminText || '' }}?</h1>
            <button class="ghost mb-3" id="signUp" @click="toggleShow">
              {{ lang.loginpage?.titles?.createAnotherAdminText || '' }}
            </button>
            <button class="ghost" @click="goToPage('/admin/dashboard')">
              {{ lang.loginpage?.messages?.goToAdminPage || '' }}
            </button>
            <button class="ghost hide--element" @click="logoutEvent()">
              {{ lang.loginpage?.titles?.logoutText || '' }}
            </button>
          </div>
          <div v-if="!isLog" class="overlay-panel overlay-right">
            <h1>{{ lang.loginpage?.titles?.welcomeNeedLog || '' }}</h1>
            <p>{{ lang.loginpage?.messages?.loginMessageMsg || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotificationToast v-bind:header="notify.header" v-bind:body="notify.body" />
  <LoadingModal idModal="load" />
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

/* width <= 768px */
@include respond-to($breakpoint: 'mobile') {
  .divider {
    @include display-control(block);
    border-bottom: 1px solid var(--divider-color);
    margin-bottom: 2rem;
  }
  .hide-element {
    @include display-control;
  }
  .show-element {
    @include display-control($display: block);
  }
  .container-login {
    min-height: 460px;
    margin-bottom: 100px;
    margin: 30px;
    max-width: calc(100% - 60px); /* reserva espacio para el margen*/

    .sign-up-container {
      .form {
        justify-content: flex-start;
      }
    }
    .sign-in-container {
      .form {
        justify-content: center;
      }
    }
    .sign-up-container,
    .sign-in-container {
      width: 100%;
    }
    .sign-up-container .tape {
      width: 100%;
      background-color: var(--background-color);
      box-shadow: 0 2px 10px var(--background-color);

      .tape-btn-back {
        border-radius: 50%;
        padding: 10px;
        width: fit-content;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.250), 0 0 6px rgba(255, 255, 255, 0.250);
      }
    }

    .sign-up-container,
    .sign-in-container {
      .form {
        padding: 0;
        .form-floating {
          width: 250px;
        }
      }
    }
    .overlay-container {
      left: 0;
      width: 100%;
    }
  }
  .container-login.right-panel-active .sign-up-container {
    transform: translateX(0);
  }
}

/* width >= 769px */
@include respond-to('desktop') {
  .container-login {
    min-height: 440px;
  }
  .container-login.right-panel-active .sign-up-container {
    transform: translateX(100%);
  }

  .sign-up-container,
  .sign-in-container {
    width: 50%;
    .form {
      justify-content: center;
    }
  }

  .overlay-container {
    left: 50%;
    width: 50%;
  }
  .hide--element {
    @include display-control;
  }
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('/Background/bg-admin.webp');
  background-size: cover;

  .container-login {
    border-radius: 10px;
    box-shadow: 0 0 5px var(--background-color-4);
    position: relative;
    border: 1px solid var(--background-color);
    overflow: hidden;
    width: 768px;
    margin: 100px 0 100px;

    .showPswd {
      position: absolute;
      top: 20px;
      right: 10px;
      cursor: pointer;
    }

    .divider {
      @include display-control;
    }
    .sign-up-container {
      left: 0;
      opacity: 0;
      z-index: 1;
      transition: display 0.5ms ease;
    }
    .sign-in-container {
      left: 0;
      z-index: 2;
    }

    .sign-in-container, .sign-up-container {
      background-color: rgba(0,0,0,0.200);
      backdrop-filter: blur(2px);
    }
    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease;
      .form {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        text-align: center;
      }
    }
  }
  h1 {
    font-weight: bold;
    margin: 0;
  }
  #cs-h1{
    color: var(--white-color);
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
    width: 100%;
    margin-top: 10px;
    border-radius: 20px;
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
    border-color: var(--text-color-1);
  }
}

.dark-mode .center .container-login .form-container .form {
  color: var(--white-color);
  background-color: #ffffff1a;

  input {
    color: var(--white-color);
  }
  input:focus {
    color: var(--black-color);
  }
}
input {
  background-color: var(--background-color-3);
  border: none;
  border-bottom: 1px solid;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container-login.right-panel-active .sign-in-container {
  transform: translateX(100%);
  opacity: 0;
}

.container-login.right-panel-active .sign-up-container {
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
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  .overlay {
    background-image: linear-gradient(to right, var(--primary-color), var(--background-color));
    background-position: 0 0;
    color: var(--text-color-1);
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out, background-image 0.5s ease;

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

      &.overlay-right {
        right: 0;
        transform: translateX(0);
      }
    }
  }
}

.container-login.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container-login.right-panel-active .overlay {
  transform: translateX(50%);
}

.container-login.right-panel-active .overlay-left {
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
