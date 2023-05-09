import { Global } from './../utils/Global'
let debug = false


// Obtener token
export const loginApi = async (data) => {
    if (debug) console.log('---- loginApi ----')

    try {
        const url = Global.url + 'auth/login/'

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, params)
        // El código de estado HTTP 200 significa "OK" (Correcto). Indica que la solicitud HTTP se ha realizado correctamente y que el servidor ha devuelto una respuesta con éxito.
        if (response.status !== 200) {
            throw new Error("Usuario o contraseña incorrectos")
        }
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Obtener token decodificado (datos del usuario)
export const getMeApi = async (token) => {
    if (debug) console.log('---- getMeApi ----')

    try {
        const url = Global.url + 'auth/me/'

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


// Listar usuarios
export const getUsersApi = async (token) => {
    try {
        const url = Global.url + 'users/'

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


// Crear usuario
export const addUserApi = async (data, token) => {
    try {
        const url = Global.url + 'users/'

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


// Editar usuario
export const updateUserApi = async (id, data, token) => {
    try {
        const url = Global.url + `users/${id}/`

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


// Eliminar usuario
export const deleteUserApi = async (id, token) => {
    try {
        const url = Global.url + `users/${id}/`

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
