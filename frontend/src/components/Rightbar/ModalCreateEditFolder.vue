<script >

import { useAuthStore } from '@/stores/auth';
import { useFolderStore } from '@/stores/folder';
import { useModalStore } from '@/stores/modal';
import { usePathStore } from '@/stores/path';
import { useSelectedItemStore } from '@/stores/selected_item';
import api from '@/Utils/api'
import { findFolderPathById } from '@/Utils/function';
import Swal from 'sweetalert2'
import { ref,defineProps, watch  } from 'vue';


export default {
  data: () => ({
  }),
  methods : {
    createFunction() {
      console.log('qwe')
    }
  },
  methods : {
  },
  setup() {
    const selected_item_store = useSelectedItemStore();
    const authStore = useAuthStore();
    const folder_store = useFolderStore();
    const modal_store = useModalStore();
    const path_store = usePathStore();
    const parent_folder = path_store.last_path;
    const current_item = selected_item_store.selected_item;
    const folder_name = ref( modal_store.data_modal.edit_or_create == 'edit' ? current_item?.name : "");

    const default_errror_message = {
      name : [],
    };
    const error = ref(default_errror_message)

    const handleSubmit = async () => {
      error.value = default_errror_message;
      const post = async () => {
        if(modal_store.data_modal.edit_or_create == 'create') {
          return await api.post('/folders', {name: folder_name.value, parent_folder_id : parent_folder.id}, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }});
        } else {
          return await api.patch('/folders/' + current_item.id , {name: folder_name.value}, {headers: {"Authorization" : "Bearer "+ authStore.auth_user.access_token }});
        };
      }

      post()
        .then((e) => {
          Swal.fire({
              title: 'Success!',
              text: `Sucess ${modal_store.data_modal.edit_or_create} folder`,
              icon: 'success',
          }).then(() => {
            folder_store.fatchFullFolder()
            folder_store.fetchItemByFolderId(parent_folder.id)
            modal_store.toggleModal('modal_create_edit_folder');
            if(modal_store.data_modal.edit_or_create == 'edit') {
              path_store.changeNameById(current_item.id, folder_name.value)
              selected_item_store.selectItem(null)
            } 
          }); 
        })
        .catch(e => {
          console.log(e)
          const errornya = e.response.data.data;
          error.value = errornya;
        })
    }
    return {folder_name, handleSubmit, error, modal_store, parent_folder}
  }
}
</script>

<template>
  <div className="fixed inset-0 bg-black/50  flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-2/3">
        <h2 className="text-2xl font-bold mb-4">{{ modal_store.data_modal.edit_or_create == 'create' ? `Create Folder in ${parent_folder.name} ` : 'Edit Folder' }} </h2>
        <div className="my-3">
          <form  action="#" @submit.prevent="handleSubmit">
              <div className="my-3">
                <label htmlFor="folder_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Folder Name</label>
                  <input type="text" name="folder_name" id="folder_name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tugas Kuliah" v-model="folder_name" @keydown.enter="createFunction" />
                  <div v-for="(err, index) in error.name" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{{ err }}</span>
                  </div>
              </div>
              <div className="flex justify-end">
                  <button @click="modal_store.toggleModal('modal_create_edit_folder')" type="button" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700" >Close</button>
                  <button type="submit" className="bg-blue-500 text-white py-2 ml-3 px-4 rounded-lg hover:bg-blue-600"
                  > Submit</button>
              </div>
          </form>
        </div>
      </div>
    </div>
</template>
