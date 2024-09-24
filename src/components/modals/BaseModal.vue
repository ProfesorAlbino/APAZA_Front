<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ body }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseFnt">{{
                        closeText }}</button>
                    <button type="button" :class="'btn btn-' + colorAcceptButton" data-bs-dismiss="modal"
                        @click="onAcceptFnt">{{ acceptText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    closeText: {
        type: String,
        required: true,
    },
    acceptText: {
        type: String,
        required: true,
    },
    colorAcceptButton: {
        type: String,
        required: false,
        default: 'primary',
    },
    onAccept: {
        type: Function,
        required: false,
    },
    onClose: {
        type: Function,
        required: false,
    },
});

function onAcceptFnt() {
    if (props.onAccept) props.onAccept();
}

function onCloseFnt() {
    if (props.onClose) props.onClose();
}

</script>

<style scoped></style>