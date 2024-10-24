<script setup>
import CardAdmin from '@/components/cards/CardAdmin.vue';
</script>

<template>
    <div class="text-center mt-3 shadow p-3 mb-5 bg-body rounded ">
        <h1>Galería</h1>
    </div>

    <div class="row">
        <div class="col-4">
                <CardAdmin description="Agrega imágenes a un album" url="/admin/add-images" title="Agregar Imágenes"/>
        </div>
        <div class="col-4">
                <CardAdmin description="Edita o Elimina imágenes de un album" url="/admin/edit-gallery" title="Editar"/>
        </div>
        <div class="col-4">
                <CardAdmin description="Crea un album para guardar tus imágenes" url="/admin/add-gallery" title="Crear Album"/>
        </div>
    </div>
</template>