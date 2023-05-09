import React, { useEffect } from 'react'
import { HeaderOrder } from '.'
import { useOrder } from '../../../../hooks'
import { useParams } from 'react-router-dom'

import Image from 'react-bootstrap/Image'
import classNames from 'classnames'
let debug = false

export function ListOrder() {
    const { id } = useParams()

    // Acceder al hook useUser
    const { loading, error, orders, getOrdersByTable } = useOrder()

    if (debug) {
        console.log('loading ---->', loading)
        console.log('error ---->', error)
        console.log('orders ---->', orders)
    }

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at')
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <HeaderOrder
                title="Lista de Pedidos"
            />

            {loading ? (
                <div className="alert alert-success" role="alert">
                    Cargando...
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Hubo un error al cargar los pedidos.
                        </div>
                    ) : (
                        <ListOrderDetail
                            orders={orders}
                        />
                    )}
                </>
            )}
        </>
    )
}



const ListOrderDetail = (props) => {
    const { orders } = props

    return (
        <div className="list-orders-admin">
            {/* Recorrer las ordenes por mesa */}
            {orders && orders.length >= 1 &&
                orders.map((order, index) => {
                    return (
                        <ListOrderItem
                            key={index}
                            order={order}
                        />
                    )
                })
            }
        </div>
    )
}



const ListOrderItem = (props) => {
    const { order } = props
    const { title, image } = order.product_data
    console.log('order', order)

    let divStyle = {
        [order.status.toLowerCase()]: true
    }

    let estado = {
        'pending': 'PENDIENTE',
        'delivered': 'ENTREGADO'
    }

    return (
        <div className={classNames('order-item-admin', divStyle)} >

            <div className="order-item-admin__time">
                {order.created_at}
            </div>
            <div className="order-item-admin__product">
                <Image src={image} alt={title} />
                <p>{title} - {estado[order.status.toLowerCase()]}</p>
            </div>

        </div>
    )
}