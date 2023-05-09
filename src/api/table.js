import { Global } from './../utils/Global'
// let debug = false


// Listar mesas
export const getTablesApi = async (token) => {
    try {
        const url = Global.url + 'tables/'

        // Dejarlo como referencia
        // Realmente no es necesaria pasarle el token a esta solicitud, tal como en category.js y product.js
        const params = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Crear mesa
export const addTableApi = async (data, token) => {
    try {
        const url = Global.url + 'tables/'

        const params = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Editar mesa
export const updateTableApi = async (id, data, token) => {
    try {
        const url = Global.url + `tables/${id}/`

        const params = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Eliminar mesa
export const deleteTableApi = async (id, token) => {
    try {
        const url = Global.url + `tables/${id}/`

        const params = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }

        const response = await fetch(url, params)
        // El código de estado HTTP 204 significa "No Content" (Sin contenido). Indica que la solicitud HTTP se ha realizado correctamente, pero el servidor no devuelve ningún contenido en la respuesta.
        if (response.status === 204) {
            return { success: true };
        }
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}