<template>
    <div class="wrapper">
        <!-- Sidebar Holder -->
        <nav id="sidebar">
            <div class="sidebar-header text-center" @click="goToPage('/')">
                <h3>{{ lang?.sidebar?.titles?.main }}</h3>
            </div>

            <ul class="list-unstyled components">
                <li class="active">
                    <a @click="goToPage('/')">{{ lang?.sidebar?.menu?.home ?? '' }}</a>
                </li>
                <li>
                    <a @click="goToPage('/admin')">{{ lang?.sidebar?.menu?.dashboard ?? '' }}</a>
                    <a @click="goToPage('/admin/add-gallery')">{{ lang?.sidebar?.menu?.gallery ?? '' }}</a>
                </li>
                <li>
                    <a @click="goToPage('/admin/event-list')">{{ lang?.sidebar?.menu?.events ?? '' }}</a>
                </li>
                <li>
                    <a @click="goToPage('/#')">{{ lang?.sidebar?.menu?.others ?? '' }}</a>
                </li>
                <li>
                    <div class="dropdown ms-5">
                        <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ lang?.sidebar?.titles?.language ?? '' }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a id="es" class="dropdown-item" @click="changeLanguage(LANGS.ES)">{{
                                lang?.sidebar?.languages?.spanish ?? '' }}</a></li>
                            <li><a id="en" class="dropdown-item" @click="changeLanguage(LANGS.EN)">{{
                                lang?.sidebar?.languages?.english ?? '' }}</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script setup>
//------------------------------------------------------------------------------------------PARA @ProfesorAlbino POR FAVOR USAR EL SCRIPT SETUP, NO EL OTRO
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { setLang, LANGS, getLangForPage, getConfig } from '@/config/BasicConfig';

const router = useRouter();
const PAGE = 'sidebar';
/* const sidebarActive = ref(false);
const homeSubmenuExpanded = ref(false);
const pageSubmenuExpanded = ref(false); */

const lang = ref({});

function goToPage(link) {
    router.push(link);
}

function changeLanguage(lang) {
    setLang(lang);
    this.router.go(0);
}


/* const toggleSidebar = () => {
    sidebarActive.value = !sidebarActive.value;
};

const toggleSubmenu = (submenu) => {
    if (submenu === 'home') {
        homeSubmenuExpanded.value = !homeSubmenuExpanded.value;
    } else if (submenu === 'page') {
        pageSubmenuExpanded.value = !pageSubmenuExpanded.value;
    }
}; */

onMounted(async () => {
    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
    }).catch(() => {
        router.go(0);
    });
});

</script>

<style scoped>
li {
    cursor: pointer;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    padding: 15px 10px;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px var(--black-color);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed var(--white-color);
    margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */
#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: var(--background-color);
    color: var(--text-color-1);
    font-family: var(--text-font-1);
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: var(--background-color-7);
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid var(--background-color-6);
}

#sidebar ul p {
    color: var(--text-color-1);
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: var(--background-color-7);
    background: var(--white-color);
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: var(--white-color);
    background: var(--background-color-7);
}


a[data-toggle="collapse"] {
    position: relative;
}

a[aria-expanded="false"]::before,
a[aria-expanded="true"]::before {
    content: '\e259';
    display: block;
    position: absolute;
    right: 20px;
    font-family: var(--text-font-2);
}

a[aria-expanded="true"]::before {
    content: '\e260';
}


ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: var(--background-color-7);
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: var(--white-color);
    color: var(--background-color-7);
}

a.article,
a.article:hover {
    background: var(--background-color-7) !important;
    color: var(--white-color) !important;
}


/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */
#content {
    width: calc(100% - 250px);
    padding: 40px;
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    right: 0;
}

#content.active {
    width: 100%;
}
</style>