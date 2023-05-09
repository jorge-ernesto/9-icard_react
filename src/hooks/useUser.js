import { useState } from 'react'
import { getMeApi, getUsersApi, addUserApi, updateUserApi, deleteUserApi } from './../api/user'
import { useAuthContext } from './../hooks' // Importar hook useAuthContext

// Hook que permite usar user.js
export const useUser = () => {
    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()

    // Datos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState(null)


    // Obtener token decodificado (datos del usuario)
    const getMe = async (token) => {
        try {
            const response = await getMeApi(token)
            return response
        } catch (error) {
            throw error
        }
    }


    // Listar usuarios
    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getUsersApi(auth.token)
            setLoading(false)
            setUsers(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Crear usuario
    const addUser = async (data) => {
        try {
            setLoading(true)
            const response = await addUserApi(data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Editar usuario
    const updateUser = async (id, data) => {
        try {
            setLoading(true)
            const response = await updateUserApi(id, data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Eliminar usuario
    const deleteUser = async (id) => {
        try {
            setLoading(true)
            const response = await deleteUserApi(id, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    return {
        getMe,
        loading, error, users,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    }
}
