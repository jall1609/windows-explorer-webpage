import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Item } from '@/Utils/dto'
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

    await api.get(`/folders/search-with-children?name=${keyword.value}&parent_folder_id=${path_store.last_path.id}`, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }})
    .then((e) =>{
      folder_store.item_in_right_panel = (e.data.data)
    })
  }

  return { keyword, item_searcing,  setKeyword}
})
