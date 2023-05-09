import React, { useEffect, useState } from 'react'
import { HeaderTable, ListTable, CreateEditTable, ModalTable } from '.'
import { useTable } from '../../../../hooks' // Importar hook useUser
let debug = false

export function IndexTable() {
    // Acceder al hook useUser
    const { loading, error, tables, getTables, deleteTable } = useTable()

        if (debug) {
            console.log('loading ---->', loading)
            console.log('error ---->', error)
            console.log('tables ---->', tables)
        }

    // State para actualizar lista de categorias
    const [refetch, setRefetch] = useState(false);

    // State para Modal
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        getTables()
        // eslint-disable-next-line
    }, [refetch]);



    // Actualizar lista de categoria
    const onRefetch = () => setRefetch((prev) => !prev);

    // Abrir y cerrar Modal
    // const handleOpenModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    const openCloseModal = () => setShowModal((prev) => !prev);

    // Crear mesa
    const createTable = () => {
        setTitleModal("Crear Mesa")
        setContentModal(<CreateEditTable onHide={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal()
    }

    // Editar mesa
    const editTable = (data) => {
        setTitleModal("Editar Mesa")
        setContentModal(<CreateEditTable onHide={openCloseModal} onRefetch={onRefetch} table={data} />)
        openCloseModal()
    }

    // Eliminar mesa
    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Eliminar mesa ${data.number}?`)
        if (result) {
            try {
                await deleteTable(data.id)
                onRefetch()
            } catch (error) {
                console.log('error', error.message)
            }
        }
    }



    return (
        <>
            <HeaderTable
                title="Mesas"
                btnTitle="Crear Mesas"
                btnClick={createTable}
            />

            {loading ? (
                <div className="alert alert-success" role="alert">
                    Cargando...
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Hubo un error al cargar las mesas.
                        </div>
                    ) : (
                        <ListTable
                            tables={tables}
                            editTable={editTable}
                            onDeleteTable={onDeleteTable}
                        />
                    )}
                </>
            )}

            <ModalTable
                show={showModal}
                onHide={openCloseModal}
                title={titleModal}
                body={contentModal}
            />
        </>
    )
}
