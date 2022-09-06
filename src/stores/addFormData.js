import { defineStore } from 'pinia'

export const useFormDataStore = defineStore('formData', {
   state: () => {
      return{
         nextId: 0,
         formData: [],
      }
   },
   getters: {
      getData(state) { return this.formData }
   },
   actions: {
      addData(data) {
         this.formData.push({ ...data, id:this.nextId++ })
      }
   }
})