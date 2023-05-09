import { useContext } from 'react'
import { AuthContext } from '../context'

// Hook que permite usar contexto AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext)
}
