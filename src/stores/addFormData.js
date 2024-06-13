import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
   state: () => ({
      editableIdx: -1,
      nextId: 0,
      formData: [],
   }),
   getters: {
      getData: (state) => state.formData,
   },
   actions: {
      addData(data) {
         this.formData.push({ ...data, id: this.nextId++ });
         this.saveToLocalStorage();
      },
      editData(updatedData) {
         const index = this.formData.findIndex(item => item.id === this.editableIdx);
         if (index !== -1) {
            this.formData[index] = { ...updatedData, id: this.editableIdx };
            this.saveToLocalStorage();
         }
      },
      deleteData(id) {
         this.formData = this.formData.filter(item => item.id !== id);
         this.saveToLocalStorage();
      },
      getById(id) {
         this.editableIdx = id
         console.log(this.editableIdx, ' this.editableIdx')
         return this.formData.find(item => item.id === id);
      },
      saveToLocalStorage() {
         localStorage.setItem('formData', JSON.stringify(this.formData));
      },
      loadFromLocalStorage() {
         const savedData = localStorage.getItem('formData');
         if (savedData) {
            this.formData = JSON.parse(savedData);
            this.nextId = Math.max(...this.formData.map(item => item.id), 0) + 1;
         }
      },
   },
   setup() {
      this.loadFromLocalStorage();
   },
});
