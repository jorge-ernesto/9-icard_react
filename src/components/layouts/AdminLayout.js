import React from 'react'
import { Login } from './../../components/pages/Admin'
import { Header, Content, Footer } from './../layouts'
import { useAuthContext } from './../../hooks' // Importar hook useAuthContext

export function AdminLayout(props) {
    const { children } = props

    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()
    // Variable auth para pruebas
    // const auth = null


    // Validar si esta logueado.
    // Evalua si 'auth' es undefined, null, 0, false, cadena vacia '' o NaN
    if (!auth) {
        return <Login />
    }

    return (
        <>
            <Header />
            <Content children={children} />
            <Footer />
        </>
    )
}
