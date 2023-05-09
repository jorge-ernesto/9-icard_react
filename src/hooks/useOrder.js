import { useState } from 'react'
import { getOrdersByTableApi } from './../api/order'

// Hook que permite usar order.js
export const useOrder = () => {
    // Datos
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState(null)


    // Listar pedidos por mesa
    const getOrdersByTable = async (idTable, status, ordering) => {
        try {
            setLoading(true)
            const response = await getOrdersByTableApi(idTable, status, ordering)
            setLoading(false)
            setOrders(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    return {
        loading, error, orders,
        getOrdersByTable,
    }
}