<template>
    <div class="d-flex align-items-center justify-content-center gap-2 mt-1">
        <i class="icon fa-solid fa-sun"></i>
        <label class="theme-switch">
            <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
            <span class="slider"></span>
        </label>
        <font-awesome-icon :icon="['fal', 'sun']" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDarkMode: false,
        };
    },
    mounted() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'enabled') {
            this.isDarkMode = true;
            document.body.classList.add('dark-mode');
        }
    },
    methods: {
        toggleTheme() {
            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        },
    },
};
</script>

<style scoped>
.theme-switch {
    position: relative;
    width: 60px;
    height: 34px;
}

.theme-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary-color);
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--text-color-1);
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: var(--accent-color);
}

input:checked+.slider:before {
    transform: translateX(26px);
}

.icon {
    font-size: 1.2rem;
    color: var(--color-destacado);
}
</style>