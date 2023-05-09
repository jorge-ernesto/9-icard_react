import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { ReactComponent as IcTable } from './../../../../assets/images/table.svg'
import classNames from 'classnames'

import { Link } from 'react-router-dom';
import { getOrdersByTableApi } from './../../../../api/order'
import { Global } from './../../../../utils/Global'
let debug = false

export function ListTableOrder(props) {
    const { tables } = props
    const [reload, setReload] = useState(false)
    const [autoReload, setAutoReload] = useState(false)

    const onReload = () => setReload((prev) => !prev)

    const onCheckAutoReload = (check) => {
        console.log('check', check)
        if (check) {
            setAutoReload(check)
        } else {
            window.location.reload()
        }
    }

    useEffect(() => {
        if (autoReload) {
            setInterval(() => {
                console.log("Este contenido se ejecutará cada 5 segundos");
                onReload()
            }, 5000);
        }
    }, [autoReload]);

    return (
        <>
            {/* Bootstrap Icons */}
            {/* https://icons.getbootstrap.com/ */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

            <h4 className="d-flex justify-content-start">
                <Button variant="primary" className="reload me-3" onClick={onReload}>
                    <i className="bi bi-arrow-clockwise"></i>
                </Button>

                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Reload automatico"
                    defaultChecked={autoReload}
                    onChange={(e) => onCheckAutoReload(e.target.checked)} // (e) => console.log(e.target.checked)
                />
            </h4>

            <div className="tables-list-admin">
                {/* Recorrer las mesas */}
                {tables && tables.length >= 1 &&
                    tables.map((table, index) => {
                        return (
                            <Table
                                key={index}
                                table={table}
                                reload={reload}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}



const Table = (props) => {
    const { table, reload } = props
    const { pending, delivered } = Global.order_status
    const [orders, setOrders] = useState([])
    const [tableBusy, setTableBusy] = useState(false) // busy es ocupado

    useEffect(() => {
        if (debug) console.log('useEffect');

        // Funcion asincrona autoejecutable
        (async () => {
            const response_pending = await getOrdersByTableApi(table.id, pending)
            const response_delivered = await getOrdersByTableApi(table.id, delivered)

            // De este modo esperamos a que se ejecute await
            // console.log('table', table)
            // console.log('response_pending', response_pending)
            setOrders(response_pending);

            // De este modo esperamos a que se ejecute await
            // console.log('table', table)
            // console.log('response_delivered', response_delivered)
            if (response_delivered.length > 0) setTableBusy(response_delivered)
            else setTableBusy(false)
        })();
        // eslint-disable-next-line
    }, [reload]);

    let icTableStyle = {
        pending: orders.length > 0,
        busy: tableBusy
    }
    if (debug) console.log('icTableStyle', icTableStyle);

    return (
        <Link to={'/admin/tables/' + table.id} className="table-admin"> {/* Antes era un div */}
            {orders.length > 0 ? (
                <Badge pill bg="warning">{orders.length}</Badge>
            ) : null}

            <IcTable className={classNames(icTableStyle)} />
            <p>Mesa {table.number}</p>
        </Link>
    )
}