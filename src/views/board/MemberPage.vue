<template>
    <div class="event-detail my-5 d-flex flex-column align-items-center">
        <div class="banner text-center py-5 mb-5 w-100">
            <h1 class="display-4 text-white">{{ lang?.memberpage?.titles?.main }}</h1>
            
        </div>
        <div class="container d-flex flex-column align-items-center">
            <div class="card shadow-lg p-4 mb-5 text-center" style="max-width: 500px;">
                <img :src="member.photo" class="img-fluid rounded mb-3" alt="Foto del miembro">
                <h1 class="display-5 mt-3">{{ member.name }}</h1>
                <p class="lead">{{ member.role }}</p>
            </div>
            <div v-if="isAdmin" class="card shadow-lg p-4 mb-5 text-center " style="max-width: 300px;">
                <h5 class="card-title">{{ lang?.memberpage?.actions?.main }}</h5>
                <button class="btn btn-secondary" @click="goToPage('/admin/board-list')">{{ lang?.memberpage?.actions?.listAdmin }}</button>
                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editMemberModal">{{ lang?.memberpage?.actions?.edit }}</button>
                <button class="btn btn-danger " @click="modalDelete">{{ lang?.memberpage?.actions?.delete }}</button>
            </div>
            <div class="text-center mt-3">
                <button @click="goToPage('/board')" class="btn btn-custom">{{ lang?.memberpage?.actions?.list }}</button>
            </div>
        </div>
    </div>
    <BaseModal v-if="isAdmin" :title="modalDeleteInfo.title" :body="modalDeleteInfo.body"
        :closeText="modalDeleteInfo.closeText" :acceptText="modalDeleteInfo.acceptText"
        :onAccept="modalDeleteInfo.onAccept" colorAcceptButton="danger" />


        <div class="modal fade" id="editMemberModal" tabindex="-1" aria-labelledby="editMemberModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editMemberModalLabel">{{ lang?.memberpage?.editModal?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editMember" class="needs-validation" novalidate>
              <div class="mb-3 text-center">
                <img :src="imagePresent || member.photo" class="img-thumbnail" alt="Foto actual del miembro" width="150">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">{{ lang?.memberpage?.editModal?.name }}</label>
                <input v-model="updatedMember.name" type="text" class="form-control" id="name" required />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">{{ lang?.memberpage?.editModal?.role }}</label>
                <input v-model="updatedMember.role" type="text" class="form-control" id="role" required />
              </div>
              <div class="mb-3">
                <label for="photo" class="form-label">{{ lang?.memberpage?.editModal?.photo }}</label>
                <input type="file" class="form-control" id="photo" @change="handleImageUpload" accept="image/*" />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {{ isLoading ? lang?.memberpage?.editModal?.saving: lang?.memberpage?.editModal?.save }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <LoadingModal idModal="load" />
</template>

<script setup>
import BaseModal from '@/components/modals/BaseModal.vue';
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import { deleteMember, updateMember } from '@/services/BoardService';
import { isUserLoggedAdmin } from '@/utils/Validations';
import { getLangForPage, getConfig } from '@/config/BasicConfig';
import LoadingModal from '@/components/modals/LoadingModal.vue';

const router = useRouter();
const isAdmin = ref(false);
const member = ref({});
const updatedMember = ref({
    name: '',
    role: ''
});
const PAGE = 'memberpage';
const lang = ref({});
const infModal = ref({});
const previewImage = ref(null);
const imagePresent = ref(null);
const isLoading = ref(false);

const modalDelete = () => {
    const myModal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop'));
    myModal.show();
}

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        previewImage.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePresent.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const closeModalEdit = () => {
    Modal.getOrCreateInstance(document.getElementById('editMemberModal')).hide();
};

const editMember = async () => {
  try {
    isLoading.value = true;
    const editMember={
        id: member.value._id,
        name: updatedMember.value.name,
        role: updatedMember.value.role,
        image: previewImage.value|| null
    };
    console.log(editMember);
    await updateMember(editMember);
    setTimeout(() => {
      isLoading.value = false;
      closeModalEdit();
      if (previewImage.value)
      member.value.photo = imagePresent.value;
        member.value.name = updatedMember.value.name;
        member.value.role = updatedMember.value.role;
        sessionStorage.setItem('member', JSON.stringify(member.value));
        imagePresent.value = null;
    }, 1500);
  } catch (error) {
    console.error('Error al actualizar el miembro:', error);
  }
};


const modalDeleteInfo = ref({
    title: infModal.value.title,
    body: infModal.value.message,
    closeText: infModal.value.cancel,
    acceptText: infModal.value.delete,
    onAccept: async () => {
        if (!isAdmin.value) return;
        await deleteMember(member.value._id);
        router.push('/board');
    }
});

function goToPage(url) {
    router.push(url);
}

// Observa los cambios en `infModal` y actualiza `modalDeleteInfo`
watchEffect(() => {
    if (infModal.value) {
        modalDeleteInfo.value.title = infModal.value.title;
        modalDeleteInfo.value.body = infModal.value.message;
        modalDeleteInfo.value.closeText = infModal.value.cancel;
        modalDeleteInfo.value.acceptText = infModal.value.delete;

    }
});

onMounted(async() => {
    isAdmin.value = isUserLoggedAdmin();
    const item = sessionStorage.getItem('member');
    if (!item) router.push('/board');
    member.value = JSON.parse(item);

    updatedMember.value.name = member.value.name;
    updatedMember.value.role = member.value.role;

    await getLangForPage(getConfig().CURRENT_LANG, PAGE).then((data) => {
        lang.value = data;
        infModal.value = lang.value.memberpage.modal;
    }).catch(() => {
        router.go(0);
    });
});
</script>

<style scoped>
.event-detail {
  font-family: var(--text-font-1);
  background: linear-gradient(135deg, var(--background-color-3) 0%, var(--background-color) 100%);
  min-height: 100vh;
}

/* Banner Hero Section */
.banner {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  position: relative;
  overflow: hidden;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
}

.banner .display-4 {
  font-family: var(--text-font-1);
  font-weight: 800;
  color: var(--text-color-1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

/* Container Principal */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Cards de Miembro */
.card {
  border: none;
  border-radius: 20px;
  background: var(--background-color-4);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.card .img-fluid {
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: cover;
}

.card .img-fluid:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.card .display-5 {
  color: var(--text-color-2);
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
}

.card .lead {
  color: var(--text-color-3);
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Card de Acciones de Administrador */
.card-title {
  color: var(--text-color-2);
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  border-radius: 2px;
}

/* Botones */
.btn {
  font-family: var(--text-font-1);
  font-weight: 600;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 0.4rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #5a6268, #495057);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107, #ffb300);
  color: #212529;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #ffb300, #ffa000);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
}

.btn-custom {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
  padding: 15px 40px;
  font-size: 1.1rem;
  margin-top: 2rem;
}

.btn-custom:hover {
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  transform: translateY(-3px);
}

/* Modal Styles */
.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.75rem auto;
  max-width: 600px;
}

.modal-content {
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  width: 100%;
}

.modal-header {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-color-1);
  border-radius: 20px 20px 0 0;
  border-bottom: none;
}

.modal-title {
  font-family: var(--text-font-1);
  font-weight: 700;
}

.modal-body {
  padding: 2rem;
  background: var(--background-color-4);
}

.modal-body .text-center {
  margin-bottom: 1.5rem;
}

.modal-body .img-thumbnail {
  display: block;
  margin: 0 auto;
  border-radius: 15px;
  border: 3px solid var(--accent-color);
  padding: 5px;
}

.form-label {
  color: var(--text-color-2);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 0 15px;
  }
}

@media (max-width: 768px) {
  .banner {
    padding: 3rem 0;
    border-radius: 0 0 20px 20px;
  }
  
  .banner .display-4 {
    font-size: 2rem;
  }
  
  .card {
    margin-bottom: 2rem;
  }
  
  .card .display-5 {
    font-size: 1.5rem;
  }
  
  .card .lead {
    font-size: 1.1rem;
  }
  
  .btn {
    width: 100%;
    margin: 0.2rem 0;
  }
  
  .btn-custom {
    padding: 12px 30px;
    font-size: 1rem;
  }
  
  .modal-dialog {
    margin: 1rem auto;
    max-width: 95vw;
  }
}

@media (max-width: 576px) {
  .banner {
    padding: 2rem 0;
  }
  
  .banner .display-4 {
    font-size: 1.8rem;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .card .display-5 {
    font-size: 1.3rem;
  }
  
  .card .lead {
    font-size: 1rem;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 0.8rem;
  }
  
  .modal-dialog {
    margin: 0.5rem auto;
    max-width: 98vw;
  }
  
  .modal-body {
    padding: 1rem;
  }
}

/* Mejoras de Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible para navegación por teclado */
.btn:focus-visible {
  outline: 3px solid var(--accent-color);
  outline-offset: 2px;
}

.form-control:focus-visible,
.form-select:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Alto contraste */
@media (prefers-contrast: high) {
  .card {
    background: white;
    border: 2px solid #000;
  }
  
  .btn {
    border: 2px solid #000;
  }
}
</style>