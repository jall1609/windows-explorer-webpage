<script>
import { useAuthStore } from '@/stores/auth'
import { useFolderStore } from '@/stores/folder'
import { usePathStore } from '@/stores/path'
import { useSelectedItemStore } from '@/stores/selected_item'
import api from '@/Utils/api'
import { onMounted, ref } from 'vue'
import SubFolderList from '@/components/Leftbar/SubFolderList.vue'
import { findFolderPathById } from '@/Utils/function'

export default {
  data: () => ({
    
  }),
  components : {
    SubFolderList
  },
  setup() {
    const path_store = usePathStore()
    const authStore = useAuthStore();
    const folder_store = useFolderStore();
    const menu_sidebar = folder_store.menu_sidebar

    onMounted( async () => {
      await folder_store.fatchFullFolder()
    })
    const selected_item_store = useSelectedItemStore()

    return {   menu_sidebar, selected_item_store, path_store, folder_store}
  },
  methods : {
    handleSelect(menu) {
      this.path_store.changePath(findFolderPathById(this.folder_store.getFullFolder, menu.id))
    }
  }
}
</script>

<template>
  <div class="mx-3 w-1/6 min-h-[80vh] border-r border-gray-100 pr-3" style="overflow-x: scroll;">
    <div v-for="(menu , index) in menu_sidebar" class="my-2">
      <a href="#" 
        :class=" (path_store.last_path.id == menu.id && 'bg-blue-100 '  ) +  '  flex flex-row hover:bg-blue-50  px-2 py-1 rounded-sm'"
        
        :key="index"
        @click.prevent="handleSelect(menu)"
        >
        <div><img :src="menu.image" width="17px" alt="" srcset=""></div>
        <div class="ml-3">{{ menu.name }}</div>
      </a>
      <div v-for="(sub_menu, index) in (folder_store.getFullFolder?.childrens?.find(e => e.name == menu.name)?.childrens)" :key="sub_menu.id">
        <SubFolderList :sub_menu="sub_menu" :handleSelect="handleSelect"  />
      </div>
    </div>
  </div>
</template>
