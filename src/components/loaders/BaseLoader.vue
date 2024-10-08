<script setup>


</script>

<template>
    <div class="preloader">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.preloader {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 111;
   /*  background: #fff; */
   background: var(--primary-color);
}

.loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    /* border-top-color: #D16806; */
    border-top-color: var(--background-color-7);
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

.loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    /* border-top-color: #ECB27B; */
    border-top-color: var(--background-color-5);
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}

.loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
   /*  border-top-color: #f7dac1; */
    border-top-color: var(--background-color-6);
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>