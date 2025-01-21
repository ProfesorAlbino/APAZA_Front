<template>
    <div class="wrapper d-flex">
        <!-- Sidebar Holder -->
        <!-- <nav id="sidebar">
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
        </nav> -->

        <button class="toggle-btn btn btn-primary d-md-none" @click="toggleSidebar">
            ☰
        </button>


        <nav id="sidebar" :class="{ active: !isSidebarVisible }">

            <div class="sidebar-header d-flex">
                <button class="toggle-btn btn btn-primary d-md-none me-2" @click="toggleSidebar">
                    ☰
                </button>
                <a @click="goToPage('/')">
                    <h3 class="text-white">{{ lang?.sidebar?.titles?.main }}</h3>
                </a>
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

// Estado para controlar la visibilidad del sidebar
const isSidebarVisible = ref(true);

// Alterna el estado del sidebar
const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
    background-color: var(--background-color);
    transition: all 0.3s;
    position: fixed;
    font-family: var(--text-font-1);
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background-color: var(--background-color-7);
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid var(--background-color-6);
}

#sidebar ul li a {
    padding: 10px 20px;
    font-size: 1.1em;
    display: block;
    color: var(--text-color-1);
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar ul li a:hover {
    color: var(--text-hover-1);
    background-color: var(--background-color-5);
}

#sidebar ul li.active>a {
    background-color: var(--background-color-6);
    color: var(--text-color-1);
}

#sidebar ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background-color: var(--background-color-7);
}

#content {
    margin-left: 250px;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
    background-color: var(--background-color-3);
}

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }

    #sidebar.active {
        margin-left: 0;
    }

    #content {
        margin-left: 0;
    }
}

.toggle-btn {
    background-color: var(--background-color-2);
    color: var(--text-color-1);
    border: none;
}

.toggle-btn:hover {
    background-color: var(--background-color-5);
    color: var(--text-hover-1);
}
</style>