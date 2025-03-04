<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useFolderStore } from '@/stores/folder';
import { usePathStore } from '@/stores/path';
import { useSelectedItemStore } from '@/stores/selected_item';
import api from '@/Utils/api';
import { onMounted, ref } from 'vue';
import folder_img from '@/assets/img/folder.png'



export default {
  data: () => ({
    folder_img : folder_img
  }),
  methods : {
  }
}
</script>

<script setup lang="ts">
  import { strLimit } from '@/Utils/function';
  const folder_store = useFolderStore();


</script>

<template>
  <div class="  px-5 ">
    <div class="grid grid-cols-4  gap-x-[100px]">
      <a href="#" class="flex flex-row max-w-[200px] p-2 rounded-md hover:bg-blue-50"  v-for="(item, index) in folder_store.item_in_right_panel" :key="index">
        <div class="mr-2"><img :src="folder_img" style="min-width: 30px; max-width: 30px;" alt="" srcset="" class="" ></div>
        <div class="text-wrap text-justify"> {{ strLimit(item.name, 90) }} </div>
      </a>
    </div>
  </div>
</template>
