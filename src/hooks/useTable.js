import { useState } from 'react'
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi } from './../api/table'
import { useAuthContext } from './../hooks' // Importar hook useAuthContext

// Hook que permite usar table.js
export const useTable = () => {
    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()

    // Datos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tables, setTables] = useState(null)


    // Listar mesas
    const getTables = async () => {
        try {
            setLoading(true)
            const response = await getTablesApi(auth.token)
            setLoading(false)
            setTables(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Crear mesa
    const addTable = async (data) => {
        try {
            setLoading(true)
            const response = await addTableApi(data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Editar mesa
    const updateTable = async (id, data) => {
        try {
            setLoading(true)
            const response = await updateTableApi(id, data, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    // Eliminar mesa
    const deleteTable = async (id) => {
        try {
            setLoading(true)
            const response = await deleteTableApi(id, auth.token)
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    return {
        loading, error, tables,
        getTables,
        addTable,
        updateTable,
        deleteTable,
    }
}
