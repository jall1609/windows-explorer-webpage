import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Folder, Item } from '@/Utils/dto'
import api from '@/Utils/api'
import { useAuthStore } from './auth'
import { usePathStore } from './path'
import { useFolderStore } from './folder'

export const useSearchingStore = defineStore('searching_store', () => {
  const keyword = ref<string | null>(null)
  const item_searcing = ref<Item | null>(null)
  const authStore = useAuthStore();
  const path_store = usePathStore();
  const folder_store = useFolderStore();
  async function  setKeyword(string : string|null) {
    keyword.value = string;
    if(string == null) return;
    let folder_dan_file : Item[] = []

    await api.get(`/folders/search-with-children?name=${keyword.value}&parent_folder_id=${path_store.last_path.id}`, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }})
    .then((e) =>{
      folder_dan_file = (e.data.data.filter((e : Folder) => e.id != path_store.last_path.id));
    })
    await api.get(`/files/search-with-children?name=${keyword.value}&folder_id=${path_store.last_path.id}`, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }})
    .then((e) =>{
      folder_dan_file = [...folder_dan_file, ...e.data.data]
    })
    folder_store.item_in_right_panel =folder_dan_file
  }

  return { keyword, item_searcing,  setKeyword}
})
