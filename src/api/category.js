import { Global } from './../utils/Global'
// let debug = false


// Listar categorias
export const getCategoriesApi = async () => {
    try {
        const url = Global.url + 'categories/'
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Crear categoria
export const addCategoryApi = async (data, token) => {
    try {
        // Las imagenes se tienen que enviar por un FormData
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('image', data.image);

        const url = Global.url + 'categories/'

        const params = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Editar categoria
export const updateCategoryApi = async (id, data, token) => {
    try {
        // Las imagenes se tienen que enviar por un FormData
        const formData = new FormData();
        formData.append('title', data.title);

        // No siempre se enviara la imagen al editar
        if (data.image) {
            formData.append('image', data.image);
        }

        const url = Global.url + `categories/${id}/`

        const params = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Eliminar categoria
export const deleteCategoryApi = async (id, token) => {
    try {
        const url = Global.url + `categories/${id}/`

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