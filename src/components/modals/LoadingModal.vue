<template>
    <div class="modal fade" :id="idModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLang, getConfig } from '@/config/BasicConfig';

const title = ref('');

defineProps({
    idModal: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    await getLang(getConfig().CURRENT_LANG).then((lang) => {
        title.value = lang.loading;
    });
});

</script>
