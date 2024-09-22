<script setup>

defineProps({
    header: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
});

</script>
<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">{{ header }}</strong>
                <!-- <small>11 mins ago</small> -->
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ body }}
            </div>
        </div>
    </div>
</template>