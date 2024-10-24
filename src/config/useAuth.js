import { ref } from 'vue'

export function useAuth() {
  const isAdmin = ref(false)
  
  const checkUserRole = () => {
    const userRole = localStorage.getItem('userRole')
    isAdmin.value = userRole === 'admin'
  }

  return {
    isAdmin,
    checkUserRole
  }
}