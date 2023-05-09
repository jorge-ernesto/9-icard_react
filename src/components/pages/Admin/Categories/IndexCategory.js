import React, { useEffect, useState } from 'react'
import { HeaderCategory, ListCategory, CreateEditCategory, ModalCategory } from '.'
import { useCategory } from '../../../../hooks' // Importar hook useUser
let debug = false

export function IndexCategory() {
    // Acceder al hook useUser
    const { loading, error, categories, getCategories, deleteCategory } = useCategory()

        if (debug) {
            console.log('loading ---->', loading)
            console.log('error ---->', error)
            console.log('categories ---->', categories)
        }

    // State para actualizar lista de categorias
    const [refetch, setRefetch] = useState(false);

    // State para Modal
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line
    }, [refetch]);



    // Actualizar lista de categoria
    const onRefetch = () => setRefetch((prev) => !prev);

    // Abrir y cerrar Modal
    // const handleOpenModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    const openCloseModal = () => setShowModal((prev) => !prev);

    // Crear categoria
    const createCategory = () => {
        setTitleModal("Crear Categoría")
        setContentModal(<CreateEditCategory onHide={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal()
    }

    // Editar categoria
    const editCategory = (data) => {
        setTitleModal("Editar Categoría")
        setContentModal(<CreateEditCategory onHide={openCloseModal} onRefetch={onRefetch} category={data} />)
        openCloseModal()
    }

    // Eliminar categoria
    const onDeleteCategory = async (data) => {
        const result = window.confirm(`¿Eliminar categoria ${data.title}?`)
        if (result) {
            try {
                await deleteCategory(data.id)
                onRefetch()
            } catch (error) {
                console.log('error', error.message)
            }
        }
    }



    return (
        <>
            <HeaderCategory
                title="Categorías"
                btnTitle="Crear Categorías"
                btnClick={createCategory}
            />

            {loading ? (
                <div className="alert alert-success" role="alert">
                    Cargando...
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Hubo un error al cargar las categorías.
                        </div>
                    ) : (
                        <ListCategory
                            categories={categories}
                            editCategory={editCategory}
                            onDeleteCategory={onDeleteCategory}
                        />
                    )}
                </>
            )}

            <ModalCategory
                show={showModal}
                onHide={openCloseModal}
                title={titleModal}
                body={contentModal}
            />
        </>
    )
}
