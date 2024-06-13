<template>
   <form @submit.prevent="handleSubmit()">
      <p>Jūsų vardas</p>
      <input class="personal-info" type="text" required v-model="formData.name" />
      <p>Jūsų pavardė</p>
      <input class="personal-info" type="text" required v-model="formData.surname" />
      <p>Jūsų amžius</p>
      <input class="personal-info" type="number" required v-model="formData.age" />
      <p>Lytis:</p>
      <input v-model="formData.gender" id="man" name="gender" type="radio" value="Vyras">
      <label for="man">Vyras</label>
      <input v-model="formData.gender" id="woman" name="gender" type="radio" value="Moteris">
      <label for="woman">Moteris</label>
      <p>Kokie jūsų programavimo įgūdžiai?</p>
      <input v-model="formData.languages" type="checkbox" id="language1" value="HTML">
      <label for="language1">HTML</label><br>
      <input v-model="formData.languages" type="checkbox" id="language2" value="CSS">
      <label for="language2">CSS</label><br>
      <input v-model="formData.languages" type="checkbox" id="language3" value="JavaScript">
      <label for="language3">JavaScript</label><br>
      <input v-model="formData.languages" type="checkbox" id="language4" value="PHP">
      <label for="language4">PHP</label>
      <p>Kokią transporto priemonę mieliau vairuojat?</p>
      <select v-model="formData.transport" name="better-transport" id="better-transport">
         <option value="Dviratis">Dviratį</option>
         <option value="Automobilis">Automobilį</option>
         <option value="Paspirtukas">Paspirtuką</option>
         <option value="Kita">Kita</option>
      </select>
      <p>Papasakokite daugiau apie savo vairavimo patirtį</p>
      <textarea v-model="formData.moreInfo" name="more-info" id="more-info"></textarea>
      <button class="save-btn" type="submit">{{ submitButtonText }}</button>
   </form>
</template>

<script setup>
import { ref, watch, computed, defineEmits } from 'vue';
const emits = defineEmits(['submit']); // Define the 'submit' event
const props = defineProps({
   initialData: {
      type: Object,
      default: null,
   },
});

const formData = ref({
   name: "",
   surname: "",
   age: "",
   transport: "--Nepasirinkta--",
   languages: [],
   gender: "",
   moreInfo: ""
});

// Watch for changes in initialData prop and update formData
watch(() => props.initialData, (newData) => {
   if (newData) {
      Object.keys(formData.value).forEach(key => {
         if (newData[key] !== undefined) {
            formData.value[key] = newData[key];
         }
      });
   } else {
      resetFormData();
   }
});

const submitButtonText = computed(() => {
   return props.initialData ? 'Atnaujinti' : 'Pridėti'; // Change button text based on edit or add mode
});

function resetFormData() {
   formData.value = {
      name: "",
      surname: "",
      age: "",
      transport: "--Nepasirinkta--",
      languages: [],
      gender: "",
      moreInfo: ""
   };
}

function handleSubmit() {
   emits('submit', formData.value, props.initialData)
   resetFormData(); // Clear form after submission
}
</script>

<style scoped>
form {
   grid-area: a;
   margin: 1rem auto;
   background: white;
   padding: 4em;
   border-radius: 10px;
}

label {
   display: inline-block;
   margin: 0.5em;
   font-size: 0.8em;
   text-transform: uppercase;
   color: #aaa;
   font-weight: 500;
}

.personal-info,
select {
   display: block;
   box-sizing: border-box;
   padding: 1em;
   border: none;
   border: 1px solid #ddd;
   margin: 2px;
   width: 100%;
   border-radius: 10px;
}

p {
   margin: 1em 0 1em 0;
   color: #aaa;
   text-transform: uppercase;
   font-size: 0.9em;
   font-weight: bold;
}

textarea {
   width: 100%;
   padding: 1em;
   height: 8em;
   resize: none;
   font-family: Arial, Helvetica, sans-serif;
   letter-spacing: 0.1ch;
   border-radius: 10px;
   border: 1px solid #ddd;
}

button {
   cursor: pointer
}

.save-btn {
   float: right;
   padding: 1rem;
   border-radius: 10px;
   border: solid 1px green;
   color: green;
   transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.save-btn:hover {
   background-color: green;
   color: white;
}
</style>
