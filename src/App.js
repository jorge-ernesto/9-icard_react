// Podemos escribir `rfc` (React Function Component) o `rcc` (React Class Component) en VSCode,
// para crear rapidamente un componente en React

// Impostar Estilos
import './assets/css/styles.scss'

// Importar Componentes
import { Navigation } from './routes'

// Importar Contexto
import { AuthProvider } from './context'

export default function App() {
    return (
        // Rutas
        // <div>
        //     <Navigation />
        // </div>

        // Rutas envueltas en contexto, esta es otra forma de hacerlo
        // <AuthProvider>
        //     <Navigation />
        // </AuthProvider>

        // Rutas envueltas en contexto
        <AuthProvider
            children={<Navigation />}
        />
    )
}
