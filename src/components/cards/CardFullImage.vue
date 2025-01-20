<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    descriptionCard: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

function goToEventPage(link) {
    router.push(link);
}
</script>

<template>
    <div class="container">
        <div class="custom-card mx-auto">
            <img src="/Apaza/APAZA_FONDO.jpg" alt="Card image" class="card-img img-fluid">
            <div class="card-overlay">
                <h5 class="card-title">Título de la Tarjeta</h5>
                <p class="card-text">Este es un texto de ejemplo para la tarjeta. Al hacer hover sobre la tarjeta, este
                    texto aparecerá con una animación suave.</p>
                <button class="btn card-btn text-white">Leer más</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-card {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    max-width: 350px;
    height: 400px;
    transition: transform 0.3s ease;
}

.custom-card:hover {
    transform: scale(1.03);
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom,
            transparent,
            rgba(42, 93, 127, 0.8));
    padding: 20px;
    color: var(--white-color);
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.custom-card:hover .card-overlay {
    transform: translateY(0);
}

.card-title {
    color: var(--white-color);
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.card-text {
    color: var(--white-color);
    font-size: 1rem;
}

.card-btn {
    background-color: var(--accent-color);
    border: none;
    transition: background-color 0.3s ease;
}

.card-btn:hover {
    background-color: var(--secondary-color);
}
</style>