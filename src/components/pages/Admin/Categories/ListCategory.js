import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'

export function ListCategory(props) {
    const { categories, editCategory, onDeleteCategory } = props

    return (
        <>
            {/* Bootstrap Icons */}
            {/* https://icons.getbootstrap.com/ */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

            {/* Listado de Categorias */}
            <div id="listadoRegistros">
                <Card border="success">
                    <Card.Header>Categorías</Card.Header>
                    <Card.Body>

                        {/* Tabla */}
                        <Table responsive bordered striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Categoría</th>
                                    <th>Imagen</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length >= 1 &&
                                    categories.map((category, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{category.id}</td>
                                                <td>{category.title}</td>
                                                <td>
                                                    <div className="image-wrap">
                                                        <Image src={category.image} alt={category.title} />
                                                    </div>
                                                </td>
                                                <Actions
                                                    category={category}
                                                    editCategory={editCategory}
                                                    onDeleteCategory={onDeleteCategory}
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
    const { category, editCategory, onDeleteCategory } = props

    return (
        <td>
            <Button variant="success" size="sm" onClick={() => editCategory(category)} > {/* onClick={() => console.log('Actualizar categoria')} */}
                <i className="bi bi-pencil"></i>
            </Button>{' '}

            <Button variant="danger" size="sm" onClick={() => onDeleteCategory(category)} > {/* onClick={() => console.log('Eliminar categoria')} */}
                <i className="bi bi-x"></i>
            </Button>
        </td>
    )
}
