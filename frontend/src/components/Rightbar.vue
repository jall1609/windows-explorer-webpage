<script>
import { usePathStore } from '@/stores/path';
import { useSelectedItemStore } from '@/stores/selected_item';
import api from '@/Utils/api';
import { onMounted, ref } from 'vue';


export default {
  setup () {
    const selected_item_store = useSelectedItemStore();
    const path_store = usePathStore()
    const data_items = ref([]);
    const loading = ref(true)

    onMounted( async () => {
      await api
        .get('/items/' + path_store.last_path.id + '?type=folder' ) 
        .then((response) => {
          data.value = response.data
        })
        .catch((err) => {
          console.log(err.message)
        })
        .finally(() => {
          loading.value = false
        })
    })

    return {selected_item_store, path_store, loading, data_items}

  }
}
</script>

<template>
  <div class="border-gray-100 border-l px-3 ">
    <div v-if="loading">Loading...</div>
  </div>
</template>
