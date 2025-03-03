<script>
import { usePathStore } from '@/stores/path';
import { useSelectedItemStore } from '@/stores/selected_item';


export default {
  setup () {
    const selected_item_store = useSelectedItemStore();
    const path_store = usePathStore()
    return {selected_item_store, path_store}
  }
}
</script>

<template>
  <div class="border-gray-100 border-l px-3 ">
    Count: {{ path_store.last_path }}
  </div>
</template>
