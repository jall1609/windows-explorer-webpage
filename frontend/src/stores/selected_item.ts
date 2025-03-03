import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSelectedItemStore = defineStore('selected_item_store', () => {
  const selected_item = ref({})
  function selectItem(id_item : object ) {
    selected_item.value = id_item
  }

  return { selected_item, selectItem }
})
