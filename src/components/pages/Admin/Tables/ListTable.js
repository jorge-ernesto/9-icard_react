import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export function ListTable(props) {
    const { tables, editTable, onDeleteTable } = props

    return (
        <>
            {/* Bootstrap Icons */}
            {/* https://icons.getbootstrap.com/ */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

            {/* Listado de Categorias */}
            <div id="listadoRegistros">
                <Card border="success">
                    <Card.Header>Mesas</Card.Header>
                    <Card.Body>

                        {/* Tabla */}
                        <Table responsive bordered striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Mesa numero</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables && tables.length >= 1 &&
                                    tables.map((table, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{table.id}</td>
                                                <td>{table.number}</td>
                                                <Actions
                                                    table={table}
                                                    editTable={editTable}
                                                    onDeleteTable={onDeleteTable}
                                                />
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
                <br />
            </div>
        </>
    )
}

const Actions = (props) => {
    const { table, editTable, onDeleteTable } = props

    return (
        <td>
            <Button variant="success" size="sm" onClick={() => editTable(table)} >
                <i className="bi bi-pencil"></i>
            </Button>{' '}

            <Button variant="danger" size="sm" onClick={() => onDeleteTable(table)} >
                <i className="bi bi-x"></i>
            </Button>
        </td>
    )
}
