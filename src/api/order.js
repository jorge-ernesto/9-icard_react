import { Global } from './../utils/Global'
let debug = false


// Listar pedidos por mesa
export const getOrdersByTableApi = async (idTable, status = "", ordering = "") => {
    try {
        const tableFilter = `table=${idTable}`
        const statusFilter = `status=${status}`
        const closeFilter = `close=False`

        const url = Global.url + `orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`
        if (debug) console.log('url', url)
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}