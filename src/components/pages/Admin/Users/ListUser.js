import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export function ListUser(props) {
    const { users, editUser, onDeleteUser } = props

    return (
        <>
            {/* Bootstrap Icons */}
            {/* https://icons.getbootstrap.com/ */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

            {/* Listado de Usuarios */}
            <div id="listadoRegistros">
                <Card border="success">
                    <Card.Header>Usuarios</Card.Header>
                    <Card.Body>

                        {/* Tabla */}
                        <Table responsive bordered striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Activo</th>
                                    <th>Staff</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length >= 1 &&
                                    users.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>
                                                    {user.is_active ? <i className="bi bi-check text-success fs-4"></i> : <i className="bi bi-x text-danger fs-4"></i>}
                                                </td>
                                                <td>
                                                    {user.is_staff ? <i className="bi bi-check text-success fs-4"></i> : <i className="bi bi-x text-danger fs-4"></i>}
                                                </td>
                                                <Actions
                                                    user={user}
                                                    editUser={editUser}
                                                    onDeleteUser={onDeleteUser}
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
    const { user, editUser, onDeleteUser } = props

    return (
        <td>
            <Button variant="success" size="sm" onClick={() => editUser(user)} > {/* onClick={() => console.log('Actualizar usuario')} */}
                <i className="bi bi-pencil"></i>
            </Button>{' '}

            <Button variant="danger" size="sm" onClick={() => onDeleteUser(user)} > {/* onClick={() => console.log('Eliminar usuario')} */}
                <i className="bi bi-x"></i>
            </Button>
        </td>
    )
}
