<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useFolderStore } from '@/stores/folder';
import { usePathStore } from '@/stores/path';
import { useSelectedItemStore } from '@/stores/selected_item';
import api from '@/Utils/api';
import { onMounted, ref } from 'vue';
import folder_img from '@/assets/img/folder.png'
import file_img from '@/assets/img/document.png'
import { useModalStore } from '@/stores/modal';
import type { Item } from '@/Utils/dto';



export default {
  data: () => ({
    file_img : file_img,
    folder_img : folder_img
  }),
  methods : {
    handleSelect(menu : Item) {
      const selected_item_store = useSelectedItemStore()
      selected_item_store.selectItem(selected_item_store.selected_item?.id != menu.id ? menu :  null , 'right')
      // path_store.changePath(findFolderPathById(folder_store.getFullFolder, menu.id))
    }
  }
}
</script>

<script setup lang="ts">
  import { findFolderPathById, strLimit } from '@/Utils/function';
  const folder_store = useFolderStore();
  const selected_item_store = useSelectedItemStore()
</script>


<template>
  <div class="  px-5 ">
    <div class="grid grid-cols-4  gap-x-[100px]">
      <a href="#" :class="'flex flex-row max-w-[200px] p-2 rounded-md hover:bg-blue-50 ' + (selected_item_store?.selected_item?.id == item.id && ' bg-blue-100 ' ) "  v-for="(item, index) in folder_store.item_in_right_panel" :key="index"  @click.prevent="handleSelect(item)">
        <div class="mr-2"><img :src=" 'content' in item ? file_img : folder_img " style="min-width: 30px; max-width: 30px;" alt="" srcset="" class="" ></div>
        <div class="text-wrap text-justify"> {{ strLimit(item.name, 90) }} </div>
      </a>
    </div>
  </div>
</template>
