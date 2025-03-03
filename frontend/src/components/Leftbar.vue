<script>
import document_img from '@/assets/img/document.png'
import download_img from '@/assets/img/download.png'
import hardisk_img from '@/assets/img/hardisk.png'
import { usePathStore } from '@/stores/path'
import { useSelectedItemStore } from '@/stores/selected_item'

export default {
  data: () => ({
  }),
  setup() {
    const menu_sidebar = [
      {
        id : 2,
        type : 'folder',
        name: 'My Document',
        image: document_img,
      },
      {
        id : 3,
        type : 'folder',
        name: 'Downloads',
        image: download_img,
      },
      {
        type : 'folder',
        id : 4,
        name: 'Local Disk (C:)',
        image: hardisk_img,
      },
      {
        id : 5,
        type : 'folder',
        name: 'Local Disk (D:)',
        image: hardisk_img,
      },
    ];
    const selected_item_store = useSelectedItemStore()
    const path_store = usePathStore()

    return {   menu_sidebar, selected_item_store, path_store}
  },
  methods : {
    handleSelect(menu) {
      this.path_store.changePath(menu)
      // this.selected_item_store.selectItem(this.selected_item_store.selected_item.id == menu.id ? {} : menu)
    }
  }
}
</script>

<template>
  <div class="mx-3 w-1/8 min-h-[80vh]">
    <a href="#" 
      :class=" (path_store.last_path.id == menu.id && 'bg-blue-100 '  ) +  ' my-2 flex flex-row   px-2 py-1 rounded-sm'"
      v-for="(menu , index) in menu_sidebar"
      :key="index"
      @click.prevent="handleSelect(menu)"
      >
      <div><img :src="menu.image" width="17px" alt="" srcset=""></div>
      <div class="ml-3">{{ menu.name }}</div>
    </a>
  </div>
</template>
