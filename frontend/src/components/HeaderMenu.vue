<script>
import image_open_active from '@/assets/img/active/open-folder.png'
import new_folder_active from '@/assets/img/active/add-folder.png'
import new_file_active from '@/assets/img/active/add-file.png'
import rename_active from '@/assets/img/active/rename.png'
import logout_active from '@/assets/img/active/logout.png'
import delete_active from '@/assets/img/active/delete.png'
import image_open_inactive from '@/assets/img/inactive/open-folder.png'
import new_folder_inactive from '@/assets/img/inactive/add-folder.png'
import new_file_inactive from '@/assets/img/inactive/add-file.png'
import rename_inactive from '@/assets/img/inactive/rename.png'
import edit_file_inactive from '@/assets/img/inactive/edit-file.png'
import delete_inactive from '@/assets/img/inactive/delete.png'
import { useSelectedItemStore } from '@/stores/selected_item'
import { computed, ref } from 'vue'
import { usePathStore } from '@/stores/path'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    
  }),
  setup() {
     const selected_item_store = useSelectedItemStore();
     const path_store = usePathStore()
     const authStore = useAuthStore();


    const menu_header = ['Home', 'Share', 'View'];
    if(authStore.auth_user.user.name) {
      menu_header.unshift(authStore.auth_user.user.name)
    }

    const active_menu_list = ref('Home');

    const getImageForMenu = (menu) => {
      if (menu.name === 'Open') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0
          ? image_open_active
          : image_open_inactive;
      } else if (menu.name === 'New Folder') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0
          ? new_folder_active
          : new_folder_inactive;
      } else if (menu.name === 'New File') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0
          ? new_file_active
          : new_file_inactive;
      } else if (menu.name === 'Rename') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0
          ? rename_active
          : rename_inactive;
      } else if (menu.name === 'Delete') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0
          ? delete_active
          : delete_inactive;
      } else if (menu.name === 'Edit File') {
        return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0 &&  selected_item_store.selected_item.type !== 'folder'
          ? image_open_active
          : image_open_inactive;
      } else if (menu.name == "Log out") {
        return logout_active;
      }
    };

    const menu_operational = computed(() => {
      let menu = [];
      if(active_menu_list.value == 'Home') {
        menu = [
        {
          name: 'Open',
          image: getImageForMenu({ name: 'Open' }),
        },
        {
          name: 'New Folder',
          image: getImageForMenu({ name: 'New Folder' }),
        },
        {
          name: 'New File',
          image: getImageForMenu({ name: 'New File' }),
        },
        {
          name: 'Rename',
          image: getImageForMenu({ name: 'Rename' }),
        },
        {
          name: 'Delete',
          image: getImageForMenu({ name: 'Delete' }),
        },
        {
          name: 'Edit File',
          image: getImageForMenu({ name: 'Edit File' }),
        },
        ];
      } else if (active_menu_list.value == authStore.auth_user.user.name ) {
        menu = [
          {
            name: 'Log out',
            image: getImageForMenu({ name: 'Log out' }),
          },
        ]
      }
      return menu
    });

    const handleClickMenuList = (menu_list) => {
      active_menu_list.value = menu_list
    }

    return {
      selected_item_store, menu_operational, path_store, menu_header, active_menu_list, handleClickMenuList, authStore
    };
  },
  methods : {
    handleClickMenuOperasional(menu){
      if(menu.name == 'Open') {
        if(this.selected_item_store.selected_item.type == 'folder') {
          if(this.selected_item_store.selected_item.id <= 5 ) {
            this.path_store.changePath(this.selected_item_store.selected_item)
          } else {
            this.path_store.addPath(this.selected_item_store.selected_item)
          }
        }
      } else if(menu.name == 'Log out') {
        this.authStore.setLogout();
        Swal.fire({
            title: 'Success!',
            text: "Success Logout",
            icon: 'success',
        }).then(() => {
          window.location = ('/login')
        }); 
      }
    },
  }
}
</script>

<template>
  <div class="flex flex-row">
    <a
      href="#"
      v-for="(menu, index) in menu_header"
      :key="index"
      @click.prevent="handleClickMenuList(menu)"
      :class="
        (menu == active_menu_list && 'bg-gray-100 border-t border-r border-l border-gray-300 rounded-t-sm') +
        ' px-3'
      "
    >
      {{ menu }}
    </a>
  </div>
  <div class="bg-gray-100 flex flex-row py-3 border-gray-300 border-1 gap-3 px-3 min-h-[95px]" >
    <a href="#" v-for="(menu, index) in menu_operational" :key="index" @click.prevent="handleClickMenuOperasional(menu)" class=" hover:bg-blue-100 p-2">
      <div style="min-height: 32px; text-align: center">
        <img :src="menu.image" style="width: 30px; margin: auto" />
      </div>
      <div>{{ menu.name }}</div>
    </a>
  </div>
</template>
