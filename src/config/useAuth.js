import { ref } from 'vue'
import Cookies from 'js-cookie';

export function useAuth() {
  const isAdmin = ref(false)
  const user = Cookies.get('User')
  const userRole = user ? JSON.parse(user).role : 'user';

  if (userRole === 'admin') {
    isAdmin.value = true
  }

  return {
    isAdmin
  }
}