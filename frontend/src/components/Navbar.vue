<script>
import search_img from '@/assets/img/search.png'
import { useAuthStore } from '@/stores/auth';
import { usePathStore } from '@/stores/path';
import { useSearchingStore } from '@/stores/searching';
import { useSelectedItemStore } from '@/stores/selected_item';
import api from '@/Utils/api';
import { ref,defineProps, watch  } from 'vue';

export default {
    data: () => ({
        search_img:search_img
    }),
    setup() {
        const path_store = usePathStore()
        const searching = ref("")
        const authStore = useAuthStore();
        const searching_store = useSearchingStore();

        const handleSubmit = () => {
            searching_store.setKeyword(searching.value)
        }

        return { path_store, searching, handleSubmit}
    }
  }
  </script>

<template>
  <div class=" flex flex-row my-2 mx-3">
    <div class="border-gray-200 border-1 w-3/4 flex rounded-md px-3  text-gray-500">
        <div  class="my-auto">{{ path_store.path.map(e => e.name).join(" > ") }}</div>
    </div>
    <div class=" w-1/4  mx-2 px-3">
        <div className="flex">
            <a href="#" @click.prevent="handleSubmit" className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-200 rounded-s-md ">
                <img :src="search_img" alt="" srcset="" width="20px">
            </a>
            <input type="text"  onChange={handleChange} name="phone_number"  className="rounded-none rounded-e-lg  border border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full  p-2.5   " :placeholder="'Search in ' + path_store.last_path.name + ' and childrens'" v-model="searching" />
        </div>
    </div>
  </div>  
</template>
  