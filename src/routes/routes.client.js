import { ClientLayout, BasicLayout } from './../components/layouts'
import { Home } from './../components/pages/Client'
import { Error404 } from '../components/pages'

const routesClient = [
    {
        path: '/',
        layout: ClientLayout,
        component: Home
    },
    {
        path: '/home',
        layout: ClientLayout,
        component: Home
    },
    {
        path: '*',
        layout: BasicLayout,
        component: Error404
    }
]

export default routesClient
