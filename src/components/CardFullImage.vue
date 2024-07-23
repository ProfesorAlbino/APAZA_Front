<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});
</script>

<template>
    <div
        class="relative grid h-[40rem] w-full max-w-[25rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
        <a href="#" class="col-span-1 block">
            <div :style="{ backgroundImage: `url(${props.url})` }"
                class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50">
                </div>
            </div>

            <div class="relative p-6 px-6 py-80 md:px-12">
                <h2
                    class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    {{ title }}
                </h2>
            </div>
        </a>
    </div>
</template>

<style scoped>
h2 {
    font-family: var(--text-font-1);
}
</style>