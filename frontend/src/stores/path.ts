import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Folder } from '@/dto'

export const usePathStore = defineStore('path_store', () => {
  const default_path = [
    {
      id : 1,
      name : 'This PC',
      type : 'folder'
    }
  ];
  const path = ref<Folder[]>(default_path)
  function addPath(newPath : Folder) {
    path.value.push(newPath)
  }
  function changePath(newPath : Folder) {
    path.value = [...default_path, newPath]
  }
  const last_path = computed(() => path.value[path.value.length - 1]) 

  return { path, addPath , changePath, last_path}
})
