import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Item } from '@/Utils/dto'

export const useSelectedItemStore = defineStore('selected_item_store', () => {
  const selected_item = ref<Item | null>()
  function selectItem(item : Item | null ) {
    selected_item.value = item
  }

  return { selected_item, selectItem }
})
