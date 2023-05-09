import { AdminLayout } from './../components/layouts'
import { /*Home,*/ IndexUser, IndexCategory, IndexProduct, IndexTable, IndexOrder, ListOrder } from './../components/pages/Admin'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: IndexOrder // Antes estaba Home
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: IndexUser
    },
    {
        path: '/admin/categories',
        layout: AdminLayout,
        component: IndexCategory
    },
    {
        path: '/admin/products',
        layout: AdminLayout,
        component: IndexProduct
    },
    {
        path: '/admin/tables',
        layout: AdminLayout,
        component: IndexTable
    },
    {
        path: '/admin/tables/:id',
        layout: AdminLayout,
        component: ListOrder
    },
]

export default routesAdmin
