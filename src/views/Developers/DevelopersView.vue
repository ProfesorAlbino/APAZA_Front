<script setup>
import { getConfig, getLangForPage } from '@/config/BasicConfig';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const PAGE = 'developers';
const lang = ref({});
const router = useRouter();
 const profiles= ref([
        {
          id: 1,
          name: "Diego Ríos Saborío",
          jobTitle: 'Fullstack Developer',
          description: 'Informático Empresarial graduado de la UCR. Especializado en desarrollo backend y móvil, con capacidad full-stack para soluciones integrales.',
          image: './devs/diego.jpeg',
          linkedin: 'www.linkedin.com/in/diegoríos',
          github: 'https://github.com/DiegoERS'
        },
        {
          id: 2,
          name: 'Elias Mena',
          jobTitle: 'Desarrollador Front-End',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, voluptatum!',
          image: './devs/Elias.jpg',
          email: 'fanny.caceres@example.com',
          linkedin: 'https://linkedin.com/in/fannycaceres',
          github: 'https://github.com/fannycaceres'
        },
        {
          id: 3,
          name: 'Jonathan',
          jobTitle: 'System Engineer',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, voluptatum!',
          image: '/path/to/joe.jpg',
          email: 'joe.smith@example.com',
          linkedin: 'https://linkedin.com/in/joesmith',
          github: 'https://github.com/joesmith'
        },
        {
          id: 4,
          name: 'Yeikel',
          jobTitle: 'System Engineer',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, voluptatum!',
          image: '/path/to/fanny.jpg',
          email: 'fanny.caceres@example.com',
          linkedin: 'https://linkedin.com/in/fannycaceres',
          github: 'https://github.com/fannycaceres'
        },
        {
          id: 5,
          name: 'Jafeth',
          jobTitle: 'System Engineer',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, voluptatum!',
          image: '/path/to/joe.jpg',
          email: 'joe.smith@example.com',
          linkedin: 'https://linkedin.com/in/joesmith',
          github: 'https://github.com/joesmith'
        }
      ]);

      // Calcular número de tarjetas en la primera fila
const calculateFirstRowCount = (total) => {
  if (total % 2 === 0) {
    // Si es par, distribuir mitad y mitad
    return total / 2;
  } else {
    // Si es impar, poner más en la primera fila
    return Math.ceil(total / 2);
  }

  
};

onMounted(async () => {
    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
    }).catch(() => {
        router.go(0);
    });
});

const firstRowCount = calculateFirstRowCount(profiles.value.length);
const firstRow = profiles.value.slice(0, firstRowCount);
const secondRow = profiles.value.slice(firstRowCount);

</script>

<template>
    <div class="dev-container">
        <div class="banner text-center py-5 rounded-5 rounded-top-0">
                <h1 class="display-4 text-white">{{ lang?.developers?.title }}</h1>
            </div>
      <!-- Primera fila -->
      <div class="profiles-row">
        <div v-for="person in firstRow" :key="person.id" class="card">
          <div class="card-header">
            <div class="profile-image">
              <img :src="person.image" :alt="person.name">
            </div>
          </div>
          <div class="card-content">
            <h3 class="name">{{ person.name }}</h3>
            <p class="job-title">{{ person.jobTitle }}</p>
            <p class="description">{{ person.description }}</p>
            
            <div class="social-icons">
              <a :href="`mailto:${person.email}`" class="icon">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="person.linkedin" target="_blank" class="icon">
                <i class="fab fa-linkedin"></i>
              </a>
              <a :href="person.github" target="_blank" class="icon">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Segunda fila (si hay) -->
      <div v-if="secondRow.length > 0" class="profiles-row">
        <div v-for="person in secondRow" :key="person.id" class="card">
          <div class="card-header">
            <div class="profile-image">
              <img :src="person.image" :alt="person.name">
            </div>
          </div>
          <div class="card-content">
            <h3 class="name">{{ person.name }}</h3>
            <p class="job-title">{{ person.jobTitle }}</p>
            <p class="description">{{ person.description }}</p>
            
            <div class="social-icons">
              <a :href="`mailto:${person.email}`" class="icon">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="person.linkedin" target="_blank" class="icon">
                <i class="fab fa-linkedin"></i>
              </a>
              <a :href="person.github" target="_blank" class="icon">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .profiles-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .banner {
    /* background: linear-gradient(45deg, #ff6b6b, #4ecdc4); */
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    margin-bottom: 2rem;
}
  .card {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin: 0 10px;
  }
  
  .card-header {
    background-color: #0d6e6e;
    height: 120px;
    position: relative;
    border-radius: 8px 8px 0 0;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid white;
  }
  
  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-content {
    padding: 60px 20px 20px;
    text-align: center;
  }
  
  .name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .job-title {
    margin: 5px 0 15px;
    color: #0d6e6e;
    font-weight: 600;
  }
  
  .description {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 20px;
  }
  
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 1rem;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #0d6e6e;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .icon:hover {
    background-color: #0a5b5b;
    transform: translateY(-3px);
  }
  
  /* Media query para dispositivos móviles */
  @media (max-width: 768px) {
    .profiles-row {
      flex-direction: column;
      align-items: center;
    }
    
    .card {
      margin: 10px 0;
    }
  }
  </style>