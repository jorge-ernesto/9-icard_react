import { useState } from 'react'
import { getCategoriesApi, addCategoryApi, updateCategoryApi, deleteCategoryApi } from './../api/category'
import { useAuthContext } from './../hooks' // Importar hook useAuthContext

// Hook que permite usar category.js
export const useCategory = () => {
    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()

    // Datos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState(null)


    // Listar categorias
    const getCategories = async () => {
        try {
            setLoading(true)
            const response = await getCategoriesApi()
            setLoading(false)
            setCategories(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Crear categoria
    const addCategory = async (data) => {
        try {
            setLoading(true)
            const response = await addCategoryApi(data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Editar categoria
    const updateCategory = async (id, data) => {
        try {
            setLoading(true)
            const response = await updateCategoryApi(id, data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Eliminar categoria
    const deleteCategory = async (id) => {
        try {
            setLoading(true)
            const response = await deleteCategoryApi(id, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    return {
        loading, error, categories,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    }
}
