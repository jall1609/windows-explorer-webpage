import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Item } from '@/Utils/dto'

export const useSelectedItemStore = defineStore('selected_item_store', () => {
  const selected_item = ref<Item | null>()
  const from_left_or_right_panel = ref("")
  function selectItem(item : Item | null , from_left_or_right_panel : string = 'left') {
    selected_item.value = item
    if(selected_item.value && item) selected_item.value.type =  ("content" in item)  ? 'file' : 'folder'
    if(selected_item.value) selected_item.value.from_left_or_right_panel = from_left_or_right_panel
  }

  return { selected_item, selectItem , from_left_or_right_panel}
})
