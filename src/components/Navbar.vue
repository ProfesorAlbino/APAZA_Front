<template>
    <nav ref="navbar" :class="['navbar', 'navbar-expand-lg', 'fixed-top', navbarClass]">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" @click="gotoHome">
                <img src="/Apaza/apaza_logo.png" alt="APAZA Logo" width="60" height="60" class="me-2 navbar-logo">
                <span id="title" class="fs-2 fw-semibold">APAZA</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span id="description" class="visually-hidden">Open main menu</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse fs-5" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" @click="gotoHome">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Junta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Colaboradores</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="goToEvents">Eventos</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            navbarClass: 'navbar-transparent',
            router: useRouter()
        };
    },
    mounted() {
        if (window.location.pathname !== '/') {
            this.navbarClass = 'navbar-solid';
        }
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const navbar = this.$refs.navbar;
            const navbarHeight = navbar.offsetHeight;
            if (window.scrollY >= navbarHeight) {
                this.navbarClass = 'navbar-solid';
            } else {
                this.navbarClass = 'navbar-transparent';
            }

            if (window.location.pathname !== '/') {
                this.navbarClass = 'navbar-solid';
            }
        },
        navigateLoginOrLogout() {
            //window.location.href = '/login';
            this.router.push('/login');
            this.navbarClass = 'navbar-solid'; // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****             
        },
        goToEvents() {
            this.router.push('/events');
            this.navbarClass = 'navbar-solid'; // <-- NO SE SI SEA LA MEJOR FORMA DE HACERLO ****REVISAR****             
        },
        gotoHome() {
            this.router.push('/');
        }
    },
};
</script>

<style scoped>
.navbar {
    font-family: var(--text-font-1);
    transition: background-color 0.8s ease;
}

.navbar-transparent {
    background-color: rgba(255, 255, 255, 0);
}

.navbar-solid {
    background-color: var(--background-color);
}

.navbar-logo {
    transition: transform 0.3s ease;
}

.navbar-logo:hover {
    transform: scale(1.5);
}

.nav-link {
    color: var(--text-color-1) !important;
}

.nav-link:hover {
    color: var(--text-hover-1) !important;
}

#title {
    color: var(--text-color-1);
}

#description {
    color: var(--text-color-1);
}

/* Estilos para modo oscuro si es necesario */
@media (prefers-color-scheme: dark) {
    .navbar-solid {
        background-color: var(--background-color);
    }

    .nav-link,
    #title,
    #description {
        color: var(--text-color-1-dark, #fff) !important;
    }

    .nav-link:hover {
        color: var(--text-hover-1) !important;
    }
}
</style>