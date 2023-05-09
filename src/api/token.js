import { Global } from './../utils/Global'

export const setToken = (token) => {
    localStorage.setItem(Global.token, token)
}

export const getToken = () => {
    return localStorage.getItem(Global.token)
}

export const removeToken = () => {
    localStorage.removeItem(Global.token)
}