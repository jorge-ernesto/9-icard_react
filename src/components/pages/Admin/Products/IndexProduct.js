import React, { useEffect, useState } from 'react'
import { HeaderProduct, ListProduct, CreateEditProduct, ModalProduct } from '.'
import { useProduct } from '../../../../hooks' // Importar hook useUser
let debug = false

export function IndexProduct() {
    // Acceder al hook useUser
    const { loading, error, products, getProducts, deleteProduct } = useProduct()

        if (debug) {
            console.log('loading ---->', loading)
            console.log('error ---->', error)
            console.log('products ---->', products)
        }

    // State para actualizar lista de productos
    const [refetch, setRefetch] = useState(false);

    // State para Modal
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [refetch]);



    // Actualizar lista de producto
    const onRefetch = () => setRefetch((prev) => !prev);

    // Abrir y cerrar Modal
    // const handleOpenModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    const openCloseModal = () => setShowModal((prev) => !prev);

    // Crear producto
    const createProduct = () => {
        setTitleModal("Crear Producto")
        setContentModal(<CreateEditProduct onHide={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal()
    }

    // Editar producto
    const editProduct = (data) => {
        setTitleModal("Editar Producto")
        setContentModal(<CreateEditProduct onHide={openCloseModal} onRefetch={onRefetch} product={data} />)
        openCloseModal()
    }

    // Eliminar producto
    const onDeleteProduct = async (data) => {
        const result = window.confirm(`¿Eliminar producto ${data.title}?`)
        if (result) {
            try {
                await deleteProduct(data.id)
                onRefetch()
            } catch (error) {
                console.log('error', error.message)
            }
        }
    }



    return (
        <>
            <HeaderProduct
                title="Productos"
                btnTitle="Crear Productos"
                btnClick={createProduct}
            />

            {loading ? (
                <div className="alert alert-success" role="alert">
                    Cargando...
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Hubo un error al cargar los productos.
                        </div>
                    ) : (
                        <ListProduct
                            products={products}
                            editProduct={editProduct}
                            onDeleteProduct={onDeleteProduct}
                        />
                    )}
                </>
            )}

            <ModalProduct
                show={showModal}
                onHide={openCloseModal}
                title={titleModal}
                body={contentModal}
            />
        </>
    )
}
