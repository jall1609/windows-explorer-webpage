<script setup lang="ts">
import HeaderMenu from '@/components/HeaderMenu.vue'
import Leftbar from '@/components/Leftbar.vue'
import Navbar from '@/components/Navbar.vue';
import Rightbar from '@/components/Rightbar.vue'
</script>

<template>
  <main>
    <HeaderMenu />
    <Navbar />
    <div class="flex flex-row">
      <Leftbar />
      <Rightbar />
    </div>
  </main>
</template>
