<script setup>
import Form from './components/Form.vue';
import { useFormDataStore } from './stores/addFormData';

const store = useFormDataStore();
</script>

<template>
  <Form />
  <div class="answers" v-for="formData in store.formData">
      <p>Vardas: {{formData.name}}</p>
      <p>Pavardė: {{formData.surname}}</p>
      <p>Amžius: {{formData.age}}</p>
      <p>Lytis: {{formData.gender}}</p>
      <p>Transportas: {{formData.transport}}</p>
      <p>Įgūdžiai: {{formData.languages}}</p>
      <p>Daugiau info: {{formData.moreInfo}}</p>
   </div>
</template>

<style scoped>
  .answers {
   padding: 1em 2em 2em 2em;
   border: 1px solid black;
   border-radius: 10px;
   width: 100%;
}
</style>
