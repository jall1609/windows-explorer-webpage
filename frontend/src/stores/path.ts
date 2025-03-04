import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Item } from '@/Utils/dto'
import api from '@/Utils/api';
import { useFolderStore } from './folder';
import { useAuthStore } from './auth';
import { useSelectedItemStore } from './selected_item';


export const usePathStore = defineStore('path_store', () => {
  const folder_store = useFolderStore();
  const selected_item_store = useSelectedItemStore()

  const default_path = [
    {
      id : 1,
      name : 'This PC',
      type : 'folder'
    }
  ];
  const path = ref<Item[]>(default_path)
  function addPath(newPath : Item) {
    path.value.push(newPath)
  }
  async function changePath(newPath : Item[]) {
    path.value = newPath
    const last_path = newPath[ newPath.length - 1 ];
    selected_item_store.selectItem(selected_item_store.selected_item?.id == last_path.id ? null : last_path)
    await folder_store.fetchItemByFolderId(last_path.id)
  }

  const last_path = computed(() => path.value[path.value.length - 1]) 

  return { path, addPath , changePath, last_path}
})
