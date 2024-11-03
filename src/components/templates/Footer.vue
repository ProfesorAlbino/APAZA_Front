<template>
    <footer class="footer_area section_padding_130_0">

        <div class="container">
            <div class="row">
                <!-- Single Widget-->
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="single-footer-widget section_padding_0_130">
                        <!-- Footer Logo-->
                        <div class="footer-logo mb-3"></div>
                        <p>{{ lang?.footer?.body?.phrase }}</p>
                        <!-- Copywrite Text-->
                        <div class="copywrite-text mb-5">
                            <p class="mb-0">{{ lang?.footer?.titles?.social }}</p>
                        </div>
                        <!-- Footer Social Area-->
                        <div class="footer_social_area">

                            <a  data-toggle="tooltip" data-placement="top" title="FaceBook"
                                data-original-title="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </a>

                            <a  data-toggle="tooltip" data-placement="top" title=""
                                data-original-title="Pinterest">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </a>

                            <a  data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-tiktok" viewBox="0 0 16 16">
                                    <path
                                        d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>
                <!-- Single Widget-->
                <div class="col-12 col-sm-6 col-lg">
                    <div class="single-footer-widget section_padding_0_130">
                        <!-- Widget Title-->
                        <h5 class="widget-title">Apaza</h5>
                        <!-- Footer Menu-->
                        <div class="footer_menu">
                            <ul>
                                <li><a @click="navigate('/about')">{{ lang?.footer?.titles?.aboutUs }}</a></li>
                                <li><a >{{ lang?.footer?.titles?.team }}</a></li>
                                <li><a >{{ lang?.footer?.titles?.developers }}</a></li>
                                <li><a @click="navigate('/login')">{{ lang?.footer?.titles?.session }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Single Widget-->
                <div class="col-12 col-sm-6 col-lg">
                    <div class="single-footer-widget section_padding_0_130">
                        <!-- Widget Title-->
                        <h5 class="widget-title">{{ lang?.events }}</h5>
                        <!-- Footer Menu-->
                        <div class="footer_menu">
                            <ul>
                                <li><a >{{ lang?.footer?.titles?.help }}</a></li>
                                <li><a >{{ lang?.footer?.titles?.info }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Single Widget-->
                <div class="col-12 col-sm-6 col-lg">
                    <div class="single-footer-widget section_padding_0_130">
                        <!-- Widget Title-->
                        <h5 class="widget-title">{{ lang?.footer?.titles?.contact }}</h5>
                        <!-- Footer Menu-->
                        <div class="footer_menu">
                            <ul>
                                <li><a >{{ lang?.footer?.titles?.info }}</a></li>
                                <li><a >{{ lang?.footer?.titles?.email }}</a></li>
                                <li><a >{{ lang?.footer?.titles?.whatsapp }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
        <p class="text-center"> {{ lang?.footer?.body?.infoText }}</p>
    </div>
    
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getLangForPage, getConfig } from '@/config/BasicConfig';
import { ref, onMounted } from 'vue';

const PAGE = 'footer';

const router = useRouter();

const lang = ref({});

onMounted(async () => {
    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
    }).catch(() => {
        router.go(0);
    });
});

function navigate(url) {
    router.push(url);
}

</script>

<style>
body {
    margin-top: 20px;
}

.footer_area {
    position: relative;
    z-index: 1;
    overflow: hidden;
    webkit-box-shadow: 0 8px 48px 8px rgba(47, 91, 234, 0.175);
    box-shadow: 0 8px 48px 8px rgba(47, 91, 234, 0.175);
    padding: 60px;
}

.footer_area .row {
    margin-left: -25px;
    margin-right: -25px;
}

.footer_area .row .col,
.footer_area .row .col-1,
.footer_area .row .col-10,
.footer_area .row .col-11,
.footer_area .row .col-12,
.footer_area .row .col-2,
.footer_area .row .col-3,
.footer_area .row .col-4,
.footer_area .row .col-5,
.footer_area .row .col-6,
.footer_area .row .col-7,
.footer_area .row .col-8,
.footer_area .row .col-9,
.footer_area .row .col-auto,
.footer_area .row .col-lg,
.footer_area .row .col-lg-1,
.footer_area .row .col-lg-10,
.footer_area .row .col-lg-11,
.footer_area .row .col-lg-12,
.footer_area .row .col-lg-2,
.footer_area .row .col-lg-3,
.footer_area .row .col-lg-4,
.footer_area .row .col-lg-5,
.footer_area .row .col-lg-6,
.footer_area .row .col-lg-7,
.footer_area .row .col-lg-8,
.footer_area .row .col-lg-9,
.footer_area .row .col-lg-auto,
.footer_area .row .col-md,
.footer_area .row .col-md-1,
.footer_area .row .col-md-10,
.footer_area .row .col-md-11,
.footer_area .row .col-md-12,
.footer_area .row .col-md-2,
.footer_area .row .col-md-3,
.footer_area .row .col-md-4,
.footer_area .row .col-md-5,
.footer_area .row .col-md-6,
.footer_area .row .col-md-7,
.footer_area .row .col-md-8,
.footer_area .row .col-md-9,
.footer_area .row .col-md-auto,
.footer_area .row .col-sm,
.footer_area .row .col-sm-1,
.footer_area .row .col-sm-10,
.footer_area .row .col-sm-11,
.footer_area .row .col-sm-12,
.footer_area .row .col-sm-2,
.footer_area .row .col-sm-3,
.footer_area .row .col-sm-4,
.footer_area .row .col-sm-5,
.footer_area .row .col-sm-6,
.footer_area .row .col-sm-7,
.footer_area .row .col-sm-8,
.footer_area .row .col-sm-9,
.footer_area .row .col-sm-auto,
.footer_area .row .col-xl,
.footer_area .row .col-xl-1,
.footer_area .row .col-xl-10,
.footer_area .row .col-xl-11,
.footer_area .row .col-xl-12,
.footer_area .row .col-xl-2,
.footer_area .row .col-xl-3,
.footer_area .row .col-xl-4,
.footer_area .row .col-xl-5,
.footer_area .row .col-xl-6,
.footer_area .row .col-xl-7,
.footer_area .row .col-xl-8,
.footer_area .row .col-xl-9,
.footer_area .row .col-xl-auto {
    padding-right: 25px;
    padding-left: 25px;
}

.single-footer-widget {
    position: relative;
    z-index: 1;
}

.single-footer-widget .copywrite-text a {
    color: #747794;
    font-size: 1rem;
}

.single-footer-widget .copywrite-text a:hover,
.single-footer-widget .copywrite-text a:focus {
    color: #3f43fd;
}

.single-footer-widget .widget-title {
    margin-bottom: 1.5rem;
}

.single-footer-widget .footer_menu li a {
    color: #747794;
    margin-bottom: 1rem;
    display: block;
    font-size: 1rem;
}

.single-footer-widget .footer_menu li a:hover,
.single-footer-widget .footer_menu li a:focus {
    color: #3f43fd;
}

.single-footer-widget .footer_menu li:last-child a {
    margin-bottom: 0;
}

.footer_social_area {
    position: relative;
    z-index: 1;
}

.footer_social_area a {
    border-radius: 50%;
    height: 40px;
    text-align: center;
    width: 40px;
    display: inline-block;
    background-color: #f5f5ff;
    line-height: 40px;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin-right: 10px;
}

.footer_social_area a i {
    line-height: 36px;
}

.footer_social_area a:hover,
.footer_social_area a:focus {
    color: #ffffff;
}

@-webkit-keyframes bi-cycle {
    0% {
        left: 0;
    }

    100% {
        left: 100%;
    }
}

@keyframes bi-cycle {
    0% {
        left: 0;
    }

    100% {
        left: 100%;
    }
}

ol li,
ul li {
    list-style: none;
}

ol,
ul {
    margin: 0;
    padding: 0;
}
</style>