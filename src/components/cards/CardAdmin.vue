<template>
    <div class="container-xxl py-6" id="features">
        <a @click="goToEventPage(props.url)">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="advanced-feature-item text-center rounded py-5 px-4">
                            <i class="fa fa-edit fa-3x text-primary mb-4"></i>
                            <h5 class="mb-3">{{ props.title }}</h5>
                            <p class="m-0">{{ props.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

function goToEventPage(link) {
    router.push(link);
}

</script>

<style scoped>
a {
    text-decoration: none;
    cursor: pointer;
}

.feature-item,
.advanced-feature-item {
    height: 100%;
    transition: .5s;
}

.feature-item:hover {
    margin-top: -15px;
}

.advanced-feature-item {
    box-shadow: 0 0 45px var(--background-color-4);
}

.advanced-feature-item * {
    transition: .5s;
}

.advanced-feature-item:hover {
    background: var(--primary);
}

.advanced-feature-item:hover * {
    color: var(--primary-color) !important;
}
</style>