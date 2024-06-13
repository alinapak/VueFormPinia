<template>
   <Form :initialData="formDataToEdit" @submit="(data, isEdit) => isEdit ? editForm(data) : store.addData(data)" />
   <div class="container">
      <div class="answers" v-for="(formData, index) in store.formData" :key="index">
         <p>Vardas: {{ formData.name }}</p>
         <p>Pavardė: {{ formData.surname }}</p>
         <p>Amžius: {{ formData.age }}</p>
         <p>Lytis: {{ formData.gender }}</p>
         <p>Transportas: {{ formData.transport }}</p>
         <p>Įgūdžiai: {{ formData.languages }}</p>
         <p>Daugiau info: {{ formData.moreInfo }}</p>
         <div class="btn-wrapper">
            <button class="edit-btn" @click="loadFormDataForEdit(formData.id)"><svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                     d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                     d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
               </svg></button>
            <button class="delete-btn" @click="deleteForm(formData.id)"><svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path
                     d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
               </svg></button>
         </div>
      </div>
   </div>
</template>

<script setup>
import Form from './components/Form.vue';
import { useFormDataStore } from './stores/addFormData';
import { onMounted, ref } from 'vue';

const store = useFormDataStore();
const formDataToEdit = ref(null);

onMounted(() => {
   store.loadFromLocalStorage();
});

function loadFormDataForEdit(id) {
   window.scrollTo(0, 0)
   formDataToEdit.value = store.getById(id);
}

function editForm(updatedData) {
   store.editData(updatedData);
   formDataToEdit.value = null; // Clear formDataToEdit after submission
   store.loadFromLocalStorage();
}

function deleteForm(id) {
   store.deleteData(id);
}
</script>

<style scoped>
.container {
   justify-content: space-between;
   align-items: start;
   grid-area: b;
   padding: 0 1rem;
   display: flex;
   gap: 1rem;
   flex-wrap: wrap;
   width: 100%;
}

.answers {
   min-width: 48%;
   min-height: 46%;
   position: relative;
   margin: 1rem 0;
   padding: 1em 2em;
   border: 1px solid black;
   border-radius: 10px;
}

.btn-wrapper {
   position: absolute;
   right: 0.5rem;
   top: 0.5rem;
   padding: 0.5rem;
}

.btn-wrapper button {
   font-weight: bold;
   border-radius: 50%;
}

.delete-btn {
   background-color: transparent;
   color: red;
   width: 2rem;
   height: 2rem;
   border: none;
   border-radius: 50%;
   transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.edit-btn {
   background-color: transparent;
   color: black;
   width: 2rem;
   height: 2rem;
   border: none;
   border-radius: 50%;
   transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.delete-btn:hover {
   background-color: red;
   color: white;
}

.edit-btn:hover {
   background-color: black;
   color: white;
}

button {
   cursor: pointer;
}
</style>
