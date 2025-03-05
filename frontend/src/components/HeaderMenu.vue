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
import { useFolderStore } from '@/stores/folder'
import { useModalStore } from '@/stores/modal'
import ModalCreateEditFolder from '@/components/Rightbar/ModalCreateEditFolder.vue'
import api from '@/Utils/api'

export default {
  data: () => ({
    
  }),
  components : {
    ModalCreateEditFolder
  },
  setup() {
     const selected_item_store = useSelectedItemStore();
     const path_store = usePathStore()
     const authStore = useAuthStore();
     const folder_store = useFolderStore();
     const modal_store = useModalStore()


    const menu_header = ['Home', 'Share', 'View'];
    if(authStore.auth_user.user.name) {
      menu_header.unshift(authStore.auth_user.user.name)
    }

    const active_menu_list = ref('Home');

    const getPropForMenu = (menu) => {
      function isActive(menu_name) {
        if(menu_name == 'Edit File') {
          return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0 &&  "content" in selected_item_store.selected_item;
        } else if ( menu_name == 'New Folder' || menu_name == 'New File') {
          return path_store.last_path.name != 'This PC'
        } else if(menu_name == 'Log out') {
          return true;
        } else if( menu.name == 'Delete'|| menu.name == 'Rename') {
          return selected_item_store.selected_item?.id > 5
        }
        // else if (menu_name == 'Open') {
        //   console.log(folder_store.menu_sidebar.map(e => e.name).includes(selected_item_store.selected_item?.name),selected_item_store.selected_item?.name )
        //   return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0 && folder_store.menu_sidebar.map(e => e.name).includes(selected_item_store.selected_item?.name) == false
        // } else
        else {
          return selected_item_store.selected_item && Object.keys(selected_item_store.selected_item).length > 0;
        }
      }
      const return_prop = {
        is_active : isActive(menu.name)
      };
      if (menu.name === 'Open') {
        return_prop.image = isActive(menu.name) ? image_open_active : image_open_inactive;
      } else if (menu.name === 'New Folder') {
        return_prop.image = isActive(menu.name) ? new_folder_active : new_folder_inactive;
      } else if (menu.name === 'New File') {
        return_prop.image = isActive(menu.name) ? new_file_active : new_file_inactive;
      } else if (menu.name === 'Rename') {
        return_prop.image = isActive(menu.name) ? rename_active : rename_inactive;
      } else if (menu.name === 'Delete') {
        return_prop.image = isActive(menu.name) ? delete_active : delete_inactive;
      } else if (menu.name === 'Edit File') {
        return_prop.image = isActive(menu.name) ? image_open_active : image_open_inactive;
      } else if (menu.name == "Log out") {
        return_prop.image = logout_active
      }
      return return_prop;
    };

    const menu_operational = computed(() => {
      let menu = [];
      if(active_menu_list.value == 'Home') {
        menu = [
        {
          name: 'Open',
          prop: getPropForMenu({ name: 'Open' }),
        },
        {
          name: 'New Folder',
          prop: getPropForMenu({ name: 'New Folder' }),
        },
        {
          name: 'New File',
          prop: getPropForMenu({ name: 'New File' }),
        },
        {
          name: 'Rename',
          prop: getPropForMenu({ name: 'Rename' }),
        },
        {
          name: 'Delete',
          prop: getPropForMenu({ name: 'Delete' }),
        },
        {
          name: 'Edit File',
          prop: getPropForMenu({ name: 'Edit File' }),
        },
        ];
      } else if (active_menu_list.value == authStore.auth_user.user.name ) {
        menu = [
          {
            name: 'Log out',
            prop: getPropForMenu({ name: 'Log out' }),
          },
        ]
      }
      return menu
    });

    const handleClickMenuList = (menu_list) => {
      active_menu_list.value = menu_list
    }

    return {
      selected_item_store, menu_operational, path_store, menu_header, active_menu_list, handleClickMenuList, authStore, modal_store, folder_store
    };
  },
  methods : {
    async handleHapus() {
      const current_item = this.selected_item_store.selected_item;
      const type_item = "content" in current_item ? 'files' : 'folders';
      Swal.fire({
          title: "Are you sure?",
          text: `Apa kamu yakin akan menghapus ${current_item.name}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
          if (result.isConfirmed) {
              await api.delete(`/${type_item}/${current_item.id}`, {headers: {"Authorization" : "Bearer "+ this.authStore.auth_user.access_token}})
              .then(() => {
                  Swal.fire({
                      title: 'Success!',
                      text: `Berhasil Delete!`,
                      icon: 'success',
                  }).then(() => {
                    this.folder_store.fatchFullFolder()
                    this.folder_store.fetchItemByFolderId(current_item.parent_folder_id ?? current_item.folder_id)
                  });
              }).catch((e) => {
                  let response = e.response;
                  console.log(response)
              })
          }           
      });
    },
    handleClickMenuOperasional(menu){
      if(menu.name == 'Open') {
        if(this.selected_item_store.selected_item?.type == 'folder') {
          if(this.selected_item_store.selected_item.id <= 5 ) {
            this.path_store.changePath(this.selected_item_store.selected_item)
          } else {
            this.path_store.addPath(this.selected_item_store.selected_item)
          }
        }
      } 
      else if(menu.name == 'Log out') {
        this.authStore.setLogout();
        Swal.fire({
            title: 'Success!',
            text: "Success Logout",
            icon: 'success',
        }).then(() => {
          window.location = ('/login')
        }); 
      } 
      else if (menu.name == 'New Folder' || menu.name == 'Rename') {
        if(this.menu_operational.find(e => e.name == menu.name).prop.is_active == false) return;
        let data_modal = null;
        if(menu.name == 'New Folder') {
          data_modal = {
            edit_or_create  : 'create',
          }
        } else if (menu.name == 'Rename') {
          data_modal = {
            edit_or_create  : 'edit',
          }
        } ;
        this.modal_store.setDataModal(data_modal )
        if(this.menu_operational.find(e => e.name == 'New Folder').prop.is_active) this.modal_store.toggleModal('modal_create_edit_folder')
      } 
      else if (menu.name == 'Delete') {
        this.handleHapus()
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
    <a href="#" v-for="(menu, index) in menu_operational" :key="index" @click.prevent="handleClickMenuOperasional(menu)" :class=" (menu.prop.is_active && 'hover:bg-blue-100')  + ' p-2'">
      <div style="min-height: 32px; text-align: center">
        <img :src="menu.prop.image" style="width: 30px; margin: auto" />
      </div>
      <div>{{ menu.name }}</div>
    </a>
  </div>
  <ModalCreateEditFolder v-if="modal_store.modals.modal_create_edit_folder" />
</template>
