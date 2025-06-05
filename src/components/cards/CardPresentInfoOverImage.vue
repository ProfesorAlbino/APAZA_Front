<template>
    <div class="col">
        <div class="card h-100 event-card">
            <img :src="image" class="card-img-top" :alt="title">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ description }}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">{{ date }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

</script>


<style scoped>
.events-container {
    /* background-color: #f8f9fa; */
    background-color: var(--background-color-3);
    min-height: 100vh;
}

.banner {
    /* background: linear-gradient(45deg, #ff6b6b, #4ecdc4); */
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    margin-bottom: 2rem;
}

.event-card {
    color: var(--text-color-3);
    transition: all 0.3s ease;
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    /* <-- El box-shadow no importa porque siempre es negro por eso no puse var() */
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}

.card-title {
    font-weight: bold;
}

.card-title, .card-text {
    color: #2C2C2C
}
.dark-mode .card-footer .text-muted {
  color: #ffff !important;
}
.card-footer {
    background-color: var(--background-color-3);
    border-top: 1px solid var(--background-color);
}
</style>
