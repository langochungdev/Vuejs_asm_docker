import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
    const tuKhoa = ref('')
    return { tuKhoa }
})
