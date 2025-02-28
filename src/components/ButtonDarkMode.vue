<script setup>
import MoonIcon from './icons/theme/MoonIcon.vue'
import SunIcon from './icons/theme/SunIcon.vue'
</script>
<template>
  <div class="d-flex justify-content-between align-items-center mg-left">
    <div class="theme-label">
      <MoonIcon class="menu-icon"/>
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
    <label class="toggle" :class="{'theme-icon-effect': isDarkMode}">
      <div class="icon icon--moon">
        <MoonIcon/>
      </div>
      <div class="icon icon--sun">
        <SunIcon/>
      </div>
    </label>
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
    this.$emit('theme-change', this.isDarkMode)
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
      this.$emit('theme-change', this.isDarkMode)
    }
  }
}
</script>

<style scoped>
.form-check-input:checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
.form-check-input:focus {
  box-shadow: none;
}
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

  .toggle{
    display: none;
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
  /* estilo de iconos de tema */
  .toggle {
    background-color:rgba(255, 255, 255, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    line-height: 1;
  }

  .icon {
    grid-area: 1 / 1;
    transition: transform 500ms ease-in-out;
  }

  .icon--moon {
    transition-delay: 200ms;
  }

  .icon--sun {
    transform: scale(0);
  }

  .toggle.theme-icon-effect .icon--moon {
    transform: rotate(360deg) scale(0);
    transition-delay: 0ms;
  }

  .toggle.theme-icon-effect .icon--sun {
    transition-delay: 200ms;
    transform: scale(1) rotate(360deg);
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
