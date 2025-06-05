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
                <button class="btn btn-danger ms-3" @click="modalDelete">{{ lang?.memberpage?.actions?.delete }}</button>
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
    background-color: var(--background-color-3);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.banner {
    background: linear-gradient(45deg, var(--primary-color), var(--background-color));
    width: 100%;
    height: 150px;
}

.card {
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-custom {
    background-color: var(--primary-color);
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 25px;
    transition: transform 0.2s ease-in-out, background-color 0.2s;
}

.btn-custom:hover {
    background-color: var(--decorative-color);
    transform: scale(1.1);
}

.modal-content {
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
