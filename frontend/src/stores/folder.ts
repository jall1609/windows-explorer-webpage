import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/Utils/api'
import { useAuthStore } from './auth';
import type { Folder, Item } from '@/Utils/dto';
import document_img from '@/assets/img/document.png'
import download_img from '@/assets/img/download.png'
import hardisk_img from '@/assets/img/hardisk.png'

export const useFolderStore = defineStore('folder_store', () => {
  const menu_sidebar = [
    {
      id : 2,
      type : 'folder',
      name: 'My Document',
      image: document_img,
    },
    {
      id : 3,
      type : 'folder',
      name: 'Downloads',
      image: download_img,
    },
    {
      type : 'folder',
      id : 4,
      name: 'Local Disk (C:)',
      image: hardisk_img,
    },
    {
      id : 5,
      type : 'folder',
      name: 'Local Disk (D:)',
      image: hardisk_img,
    },
  ];
  const authStore = useAuthStore();
  const item_in_right_panel = ref<Item[]>([])

  const full_folder = ref<Folder>({})
  function setFullFolder(new_full_folder : Folder ) {
    full_folder.value = new_full_folder
  }

  const getFullFolder = computed(() => full_folder.value)

  async function fatchFullFolder() {
    let data = null;
    await api
      .get('/folders/full-folder', {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }} ) 
      .then((response) => {
        data = response.data.data[0]
        setFullFolder(response.data.data[0])
      })
      .catch((err) => {
        console.log(err.message)
      })
    return data;
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

  return { getFullFolder, setFullFolder , fatchFullFolder, fetchItemByFolderId, item_in_right_panel, menu_sidebar}
})
