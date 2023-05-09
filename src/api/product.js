import { Global } from './../utils/Global'
// let debug = false


// Listar productos
export const getProductsApi = async () => {
    try {
        const url = Global.url + 'products/?active=True'
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}


// Crear producto
export const addProductApi = async (data, token) => {
    try {
        // Las imagenes se tienen que enviar por un FormData
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('active', data.active);
        formData.append('image', data.image);

        const url = Global.url + 'products/'

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


// Editar producto
export const updateProductApi = async (id, data, token) => {
    try {
        // Las imagenes se tienen que enviar por un FormData
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('active', data.active);

        // No siempre se enviara la imagen al editar
        if (data.image) {
            formData.append('image', data.image);
        }

        const url = Global.url + `products/${id}/`

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


// Eliminar producto
export const deleteProductApi = async (id, token) => {
    try {
        const url = Global.url + `products/${id}/`

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