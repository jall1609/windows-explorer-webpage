<script>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  import api from '@/Utils/api'
  import Swal from 'sweetalert2'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const username = ref('')
      const password = ref('')
      const loading = ref(false)
      const error = ref('')
      const authStore = useAuthStore()
      const router = useRouter()

      onMounted(() => {
        if (authStore.auth_user) {
          router.push('/')
        }
      })

      const handleInvalidCredential = () => {
        Swal.fire({
            title: 'Failed!',
            text: "Invalid Credential",
            icon: 'error',
        }).then(() => {
            location.reload();
        });
      }

      const handleLogin = async () => {
        error.value = ''
        loading.value = true

        await api.post('/auth/login', {username: username.value, password: password.value}, { headers: { 'Content-Type': 'application/json' }})
          .then((e) => {
            const responnya = e.data;
            if(responnya.success != true) handleInvalidCredential();
            authStore.setLogin(responnya.data)
            Swal.fire({
                title: 'Success!',
                text: "Success Login",
                icon: 'success',
            }).then(() => {
              window.location = ('/')
            }); 
          })
          .catch(e => {
            if(e.status == 401) handleInvalidCredential()
          })
      }

      return {
        username,
        password,
        loading,
        error,
        handleLogin
      }
    }
  }
</script>

<template>
  <main>
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Sign In
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" @submit.prevent="handleLogin">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ariel123" v-model="username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="password" />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" :disabled="loading">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>
