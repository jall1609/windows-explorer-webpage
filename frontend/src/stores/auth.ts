import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Auth } from '@/Utils/dto'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<Auth | null>(null)
  function setLogin(new_auth : Auth) {
    auth.value = new_auth;
    localStorage.setItem('auth_user', JSON.stringify(new_auth))
  }
  function setLogout() {
    auth.value = null;
    localStorage.removeItem('auth_user')
  }
  const auth_user = localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user') ?? "") : null

  return { auth_user, setLogin, setLogout}
})
