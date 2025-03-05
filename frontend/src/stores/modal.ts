import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Auth, Modals } from '@/Utils/dto'

export const useModalStore = defineStore('modal_store', () => {
  const modals = ref<Modals>({
    modal_create_edit_folder : false
  })
  const data_modal = ref<object | null>(null);

  function setDataModal(new_data_modal : object) {
    data_modal.value =new_data_modal;
  }

  function setModal(modal_change : {nama_modal : string, is_open : boolean}) {
    if (modals.value.hasOwnProperty(modal_change.nama_modal)) {
      modals.value[modal_change.nama_modal] = modal_change.is_open
    }
  }
  function toggleModal(modal_name : string) {
    setModal({ nama_modal: modal_name, is_open: !modals.value[modal_name] })
  }

  return { modals, toggleModal, data_modal, setDataModal}
})
