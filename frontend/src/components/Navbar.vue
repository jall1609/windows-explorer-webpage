<script>
import search_img from '@/assets/img/search.png'
import { usePathStore } from '@/stores/path';
export default {
    data: () => ({
        search_img:search_img
    }),
    setup() {
        const path_store = usePathStore()

        return { path_store}
    }
  }
  </script>

<template>
  <div class=" flex flex-row my-2 mx-3">
    <div class="border-gray-200 border-1 w-3/4 flex rounded-md px-3 ">
        <div class="my-auto">{{ path_store.path.map(e => e.name).join(" > ") }}</div>
    </div>
    <div class=" w-1/4  mx-2 px-3">
        <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-200 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <img :src="search_img" alt="" srcset="" width="20px">
            </span>
            <input type="text"  onChange={handleChange} name="phone_number"  className="rounded-none rounded-e-lg  border border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " :placeholder="'Search in ' + path_store.last_path.name" />
        </div>
    </div>
  </div>  
</template>
  