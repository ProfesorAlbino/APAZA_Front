<style scoped>
.toggle {
  background-color: #fff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.1);
  line-height: 1;
  margin-left: 10px;
}

.input {
  display: none;
}

.icon {
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  transition: transform 500ms;
}

.icon--moon {
  transition-delay: 200ms;
}

.icon--sun {
  transform: scale(0);
}

#switch:checked + .icon--moon {
  transform: rotate(360deg) scale(0);
}

#switch:checked ~ .icon--sun {
  transition-delay: 200ms;
  transform: scale(1) rotate(360deg);
}
</style>

<template>
  <div>
    <label class="toggle" for="switch">
      <input id="switch" class="input" type="checkbox" v-model="isDarkMode"
      @change="toggleTheme"/>
      <div class="icon icon--moon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path
            d="M504-425Zm20 385H420l20-12.5q20-12.5 43.5-28t43.5-28l20-12.5q81-6 149.5-49T805-285q-86-8-163-43.5T504-425q-61-61-97-138t-43-163q-77 43-120.5 118.5T200-444v12l-12 5.5q-12 5.5-26.5 11.5T135-403.5l-12 5.5q-2-11-2.5-23t-.5-23q0-146 93-257.5T450-840q-18 99 11 193.5T561-481q71 71 165.5 100T920-370q-26 144-138 237T524-40Zm-284-80h180q25 0 42.5-17.5T480-180q0-25-17-42.5T422-240h-52l-20-48q-14-33-44-52.5T240-360q-50 0-85 34.5T120-240q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-240q0-83 58.5-141.5T240-440q60 0 109.5 32.5T423-320q57 2 97 42.5t40 97.5q0 58-41 99t-99 41H240Z"
          />
        </svg>
      </div>

      <div class="icon icon--sun">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path
            d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"
          />
        </svg>
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
    }
  }
}
</script>