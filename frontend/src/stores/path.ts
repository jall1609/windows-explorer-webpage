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
  async function addPath(newPath : Item) {
    path.value.push(newPath)
    selected_item_store.selectItem(selected_item_store.selected_item?.id != newPath.id ? newPath :  null )
    await folder_store.fetchItemByFolderId(newPath.id)
  }
  async function changePath(newPath : Item[], from_left_or_right_panel : string = 'left') {
    path.value = newPath
    const last_path = newPath[ newPath.length - 1 ];
    selected_item_store.selectItem(selected_item_store.selected_item?.id != last_path.id ? last_path :  (from_left_or_right_panel == 'right' ? null : last_path), from_left_or_right_panel )
    await folder_store.fetchItemByFolderId(last_path.id)
  }
  
  function changeNameById(id_path : number, name : string) {
    const item = path.value.find(e => e.id === id_path);
    if (item) item.name = name;

  }

  const last_path = computed(() => path.value[path.value.length - 1]) 

  return { path, addPath , changePath, last_path, changeNameById}
})
