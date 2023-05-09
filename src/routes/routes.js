import routesAdmin from './routes.admin'
import routesClient from './routes.client'

// RUTAS
// De este modo, conseguimos esto [[{}], [{}]]
// const routes = [routerAdmin, routerClient]

// De este modo, conseguimos esto [{}, {}]
const routes = [...routesAdmin, ...routesClient]

export default routes
