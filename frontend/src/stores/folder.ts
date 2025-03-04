import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/Utils/api'
import { useAuthStore } from './auth';
import type { Item } from '@/Utils/dto';

export const useFolderStore = defineStore('folder_store', () => {
  const authStore = useAuthStore();
  const item_in_right_panel = ref<Item[]>([])

  const full_folder = ref<object>({})
  function setFullFolder(new_full_folder : object ) {
    full_folder.value = new_full_folder
  }

  const getFullFolder = computed(() => full_folder.value)

  async function fatchFullFolder() {
    await api
      .get('/folders/full-folder', {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }} ) 
      .then((response) => {
        setFullFolder(response.data.data[0])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  async function fetchItemByFolderId(id_folder : number) {
    await api
      .get('/folders/' + id_folder, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }} ) 
      .then((response) => {
        const data = response.data.data;
        item_in_right_panel.value = [...data.childrens, ...data.files]
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return { getFullFolder, setFullFolder , fatchFullFolder, fetchItemByFolderId, item_in_right_panel}
})
