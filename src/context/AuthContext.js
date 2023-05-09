import React, { createContext, useState, useEffect } from 'react'
import { setToken, getToken, removeToken } from './../api/token';
import { useUser } from './../hooks' // Importar hook useUser
let debug = false


// Crear el contexto, especificamos data que tendra. Estas funciones son a las que podremos acceder desde cualquier componente
export const AuthContext = createContext({
    auth: undefined,
    login: () => console.log('login'),
    logout: () => console.log('logout'),
})


// Crear el componente funcional, que actuara como contexto. Este componente envolvera todos los componentes (rutas)
export const AuthProvider = (props) => {
    const { children } = props

    // Acceder al hook useUser
    const { getMe } = useUser()

    // State para autenticacion
    // El hook useState, se utiliza en componentes funcionales de React para permitirles tener estado interno y cambiarlo de manera dinámica. Al utilizar useState, puedes definir una variable de estado y una función que permite actualizar su valor
    // Equivalente a state y setState en componentes de clase
    const [auth, setAuth] = useState(undefined) // auth inicializa en undefined

    // Metodos de ciclo de vida de los componentes - funcionales en React
    // Equivalente a componentWillMount
    useEffect(() => {
        if (debug) {
            console.log('---- AuthProvider useEffect ----')
            console.log('El componente se va a montar');
        }

        // Funcion asincrona autoejecutable
        (async () => {
            // Obtener token
            const token = getToken()

            if (token) {
                // Obtener token decodificado (datos del usuario)
                const me = await getMe(token)

                if (debug) {
                    console.log('token', token)
                    console.log('me', me)
                }

                // Setear State de autenticacion
                setAuth({ token, me })
            } else {
                setAuth(null)
            }
        })();

        // Funcion asincrona
        /*
        const fetchData = async () => {
            // Obtener token
            // Obtener token decodificado (datos del usuario)
            // Setear State de autenticacion
        };
        fetchData();
        */

        // Funcion asincrona autoejecutable
        /*
        (async () => {
            // Obtener token
            // Obtener token decodificado (datos del usuario)
            // Setear State de autenticacion
        })();
        */

        // eslint-disable-next-line
    }, []); // Si no se agrega dependencia en el segundo argumento, 'useEffect' actua como 'componentWillMount'. Si se agrega 'auth' como dependencia en el segundo argumento de 'useEffect', la función se ejecutará cada vez que cambie el valor de 'auth', lo que puede llevar a solicitudes innecesarias al servidor si 'auth' cambia con frecuencia. Para este caso se genera un bucle ya que usamos 'setAuth'.

    // Verificar State de autenticacion
    useEffect(() => {
        if (debug) {
            if (auth) { // Cuando este definido y no sea null
                console.log('---- Verificar State de autenticacion ----');
                console.log('auth', auth);
            }
        }
    }, [auth]);


    // Funcion Login
    const login = async (token) => {
        if (debug) console.log('---- AuthContext Login ----')

        // Setear token
        setToken(token)

        // Obtener token decodificado (datos del usuario)
        const me = await getMe(token);
        if (debug) console.log('me', me);

        // Setear State de autenticacion
        setAuth({ token, me })
    }

    // Funcion Logout
    const logout = async (token) => {
        if (debug) console.log('---- AuthContext Logout ----')

        if (auth) {
            // Eliminar token
            removeToken()

            // Setear State de autenticacion
            setAuth(null)
        }
    }

    // Reemplazar data del contexto
    const valueContext = {
        auth: auth,
        login: login,
        logout: logout
    }


    if (auth === undefined) {
        return null
    }

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    )
}
