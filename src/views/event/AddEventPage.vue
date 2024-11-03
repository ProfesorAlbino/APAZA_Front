<template>
    <div class="my-5">
        <h1></h1>
    </div>
    <div class="crear-evento my-5">
        <div class="banner text-center py-5 mb-5 rounded-5 rounded-top-0">
            <h1 class="display-4 text-white">{{ lang?.eventaddpage?.titles?.main }}</h1>
            <div class="text-center">
                <button @click="goToPage('/admin/event-list')" class="btn btn-primary btn-lg btn-block">
                    {{ lang?.eventaddpage?.buttons?.back }}
                </button>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <form @submit.prevent="crearEvento" class="needs-validation" novalidate>
                                <div class="mb-4">
                                    <label for="title" class="form-label">{{ lang?.eventaddpage?.titles?.title ?? '' }}</label>
                                    <input v-model="evento.title" type="text" class="form-control" id="title" required>
                                    <div class="invalid-feedback">
                                        {{ lang?.eventaddpage?.validation?.title ?? '' }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="description" class="form-label">{{ lang?.eventaddpage?.titles?.description ?? '' }}</label>
                                    <textarea v-model="evento.description" class="form-control" id="description"
                                        rows="3" required></textarea>
                                    <div class="invalid-feedback">
                                        {{ lang?.eventaddpage?.validation?.description ?? '' }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="date" class="form-label">{{ lang?.eventaddpage?.titles?.date ?? '' }}</label>
                                    <input v-model="evento.date" type="date" class="form-control" id="date" required>
                                    <div class="invalid-feedback">
                                        {{ lang?.eventaddpage?.validation?.date ?? '' }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="type" class="form-label">{{ lang?.eventaddpage?.titles?.type ?? '' }}</label>
                                    <select v-model="evento.type" class="form-select" id="type" required>
                                        <option value="">{{ lang?.eventaddpage?.options?.default ?? '' }}</option>
                                        <option value="family">{{ lang?.eventaddpage?.options?.family ?? '' }}</option>
                                        <option value="cultural">{{ lang?.eventaddpage?.options?.cultural ?? '' }}</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        {{ lang?.eventaddpage?.validation?.type ?? '' }}
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="image" class="form-label">{{ lang?.eventaddpage?.titles?.image ?? '' }}</label>
                                    <input type="file" class="form-control" id="image" @change="handleImageUpload"
                                        accept="image/*">
                                </div>

                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        {{ lang?.eventaddpage?.buttons?.create }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NotificationToast v-bind:header="notify.header" v-bind:body="notify.body" />
    </div>
    <LoadingModal idModal="load" />
</template>

<script setup>
import NotificationToast from '@/components/toasts/NotificationToast.vue';
import LoadingModal from '@/components/modals/LoadingModal.vue';
import { ref, onMounted } from 'vue'
import { Toast, Modal } from 'bootstrap'
import { isUserLoggedAdmin } from '@/utils/Validations';
import { useRouter } from 'vue-router';
import { addEvent } from '@/services/EventService';
import { getConfig, getLangForPage } from '@/config/BasicConfig';

const router = useRouter();
const PAGE = 'eventaddpage';

const lang = ref({});

const notify = ref({
    header: 'Bienvenido',
    body: 'Correcto'
});

const evento = ref({
    title: '',
    description: '',
    date: '',
    type: '',
    image: null
});

const modalShowing = ref({});


const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        evento.value.image = file
    }
}

function goToPage(url){
    router.push(url);
}

function showNotify(header, body) {
    notify.value.header = header;
    notify.value.body = body;

    const toastLive = document.getElementById('liveToast');
    const toastBootstrap = Toast.getOrCreateInstance(toastLive);
    toastBootstrap.show();
};

function isFilledInputs() {

    return !(!evento.value.title || !evento.value.description || !evento.value.date || !evento.value.type);
}

const crearEvento = () => {
    if (!isFilledInputs()) {
        document.querySelector('form').classList.add('was-validated')
        showNotify('Error', 'Por favor, llena todos los campos del formulario.');
        return;
    }

    console.log('Evento a crear:', evento.value);

    modalShowing.value.show();
    addEvent(evento.value)
        .then(() => {
            showNotify('Evento Creado', 'Tu evento ha sido creado exitosamente.');

            evento.value = {
                title: '',
                description: '',
                date: '',
                type: '',
                image: null
            }

            document.querySelector('form').classList.remove('was-validated');
            document.getElementById('image').value = '';
            modalShowing.value.hide();
        })
        .catch(() => {
            showNotify('Error', 'Hubo un error al crear el evento.');
        });

}

onMounted(async () => {
    if (!isUserLoggedAdmin()) router.push('/events');

    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
    }).catch(() => {
        router.go(0);
    });

    modalShowing.value = Modal.getOrCreateInstance(document.getElementById('load'));
});
</script>

<style scoped>
.crear-evento {
    /*background-color: #f8f9fa;*/
    background-color: var(--background-color-3);
    min-height: 100vh;
}

.banner {
    /* background: linear-gradient(45deg, #ff6b6b, #4ecdc4); */
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    margin-bottom: 2rem;
}

.card {
    border: none;
    border-radius: 15px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.form-control,
.form-select {
    border-radius: 10px;
}

.form-control:focus,
.form-select:focus {
    /* border-color: #4ecdc4; */
    border-color: var(--background-color);
    /* box-shadow: 0 0 0 0.2rem rgba(78, 205, 196, 0.25); */
    box-shadow: 0 0 0 0.2rem var(--primary-color);
}

.btn-primary {
    /* background-color: #4ecdc4; */
    background-color: var(--primary-color);
    /* border-color: #4ecdc4; */
    border-color: var(--primary-color);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    /* background-color: #45b7ae; */
    background-color: var(--background-color);
    /* border-color: #45b7ae; */
    border-color: var(--background-color-3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.invalid-feedback {
    font-size: 0.875em;
}
</style>