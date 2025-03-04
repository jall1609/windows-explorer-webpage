<script>
import { usePathStore } from '@/stores/path';
import folder_img from '@/assets/img/folder.png'

    export default {
        data: () => ({
            folder_img : folder_img
        }),
        props : {
            sub_menu : Object,
            handleSelect : {
                type : Function,
                required : true
            }
        },
        setup() {
            const path_store = usePathStore()

            return {path_store}
        },
      
    }

</script>

<template>
    <div class="ml-5">
        <a href="#" 
            :class=" (path_store.last_path.id == sub_menu.id && 'bg-blue-100 '  ) +  ' hover:bg-blue-50 text-nowrap px-2 py-1 rounded-sm mt-[4px] flex flex-row'"    @click.prevent="handleSelect(sub_menu)"  >
            <div class=""><img :src="folder_img" style="min-width: 17px; max-width: 17px;" alt="" srcset="" class="mr-2" ></div>
            <div>{{ sub_menu.name }} </div>
        </a>
        <div v-for="child in sub_menu.childrens" :key="child.id" >
            <SubFolderList :sub_menu="child" :handleSelect="handleSelect" />
        </div>
    </div>
</template>