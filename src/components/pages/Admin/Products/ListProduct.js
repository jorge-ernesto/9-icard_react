import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'

export function ListProduct(props) {
    const { products, editProduct, onDeleteProduct } = props

    return (
        <>
            {/* Bootstrap Icons */}
            {/* https://icons.getbootstrap.com/ */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

            {/* Listado de Productos */}
            <div id="listadoRegistros">
                <Card border="success">
                    <Card.Header>Categorías</Card.Header>
                    <Card.Body>

                        {/* Tabla */}
                        <Table responsive bordered striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Imagen</th>
                                    <th>Precio</th>
                                    <th>Categoría</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length >= 1 &&
                                    products.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{product.id}</td>
                                                <td>{product.title}</td>
                                                <td>
                                                    <div className="image-wrap">
                                                        <Image src={product.image} alt={product.title} />
                                                    </div>
                                                </td>
                                                <td>{product.price}</td>
                                                <td>{product.category_data?.title ?? ''}</td>
                                                <td>
                                                    {product.active ? <i className="bi bi-check text-success fs-4"></i> : <i className="bi bi-x text-danger fs-4"></i>}
                                                </td>
                                                <td>
                                                    <Button variant="success" size="sm" onClick={() => editProduct(product)} >
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>{' '}

                                                    <Button variant="danger" size="sm" onClick={() => onDeleteProduct(product)} >
                                                        <i className="bi bi-x"></i>
                                                    </Button>
                                                </td>
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
