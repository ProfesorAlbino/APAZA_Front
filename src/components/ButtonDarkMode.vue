<script setup>
import DarkModeIcon from './icons/MenuIcons/DarkModeIcon.vue'
</script>
<template>

  <div class="d-flex justify-content-between align-items-center mg-left">
    <div class="theme-label">
      <DarkModeIcon class="menu-icon"></DarkModeIcon>
      <label for="bs-switch">{{ themeLabel.value?.navbar?.titles?.darkMode || '' }}</label>
    </div>
    <div class="form-check form-switch">
      <input
        id="bs-switch"
        class="form-check-input"
        type="checkbox"
        role="switch"
        v-model="isDarkMode"
        @change="toggleTheme"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['themeLabel'],
  data() {
    return {
      isDarkMode: false
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme === 'enabled') {
      this.isDarkMode = true
      document.body.classList.add('dark-mode')
    }
    this.$emit('theme-change', this.isDarkMode);
  },
  methods: {
    toggleTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('darkMode', 'enabled')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('darkMode', 'disabled')
      }
      this.$emit('theme-change', this.isDarkMode);
    }
  }
}
</script>

<style scoped>
.theme-label {
  display: none;
}

@media (max-width: 990px) {
  .theme-label {
    display: block;
    color: var(--text-color-1);
    padding: 10px 0;
  }
  .mg-left {
    margin-bottom: 6px;
    padding-left: 5px;
  }
  .menu-icon {
    margin-right: 10px;
  }
}
/* bs switch */
input {
  cursor: pointer;
}

@media (min-width: 990px) {
  .mg-left {
    margin-left: 10px;
  }
}

/* .theme-switch {
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
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--text-color-1);
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--accent-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.icon {
  font-size: 1.2rem;
  color: var(--color-destacado);
}*/
</style>
