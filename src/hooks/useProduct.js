import { useState } from 'react'
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi } from './../api/product'
import { useAuthContext } from './../hooks' // Importar hook useAuthContext

// Hook que permite usar product.js
export const useProduct = () => {
    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()

    // Datos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState(null)


    // Listar productos
    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await getProductsApi()
            setLoading(false)
            setProducts(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Crear producto
    const addProduct = async (data) => {
        try {
            setLoading(true)
            const response = await addProductApi(data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Editar producto
    const updateProduct = async (id, data) => {
        try {
            setLoading(true)
            const response = await updateProductApi(id, data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Eliminar producto
    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            const response = await deleteProductApi(id, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    return {
        loading, error, products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
    }
}
