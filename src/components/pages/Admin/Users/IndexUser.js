import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { HeaderUser, ListUser, CreateEditUser, ModalUser } from '.'
import { useUser } from '../../../../hooks' // Importar hook useUser
import { useAuthContext } from '../../../../hooks' // Importar hook useAuthContext
let debug = false

export function IndexUser() {
    // Acceder al hook useUser
    const { loading, error, users, getUsers, deleteUser } = useUser()
    
    // Acceder al hook useAuthContext
    const { auth } = useAuthContext()

        // Se imprimirán las variables loading, error y users en la consola dos veces, una vez al definirlas usando useUser y una vez dentro de useEffect
        if (debug) {
            console.log('loading ---->', loading)
            console.log('error ---->', error)
            console.log('users ---->', users)
        }

    // State para actualizar lista de usuarios
    const [refetch, setRefetch] = useState(false);

    // State para Modal
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    // Metodos de ciclo de vida de los componentes - funcionales en React
    // Equivalente a componentWillMount
    useEffect(() => {
        if (debug) {
            console.log('---- IndexUser useEffect ----')
            console.log('El componente se va a montar');
        }
        getUsers()
        // eslint-disable-next-line
    }, [refetch]);



    // Actualizar lista de usuarios
    const onRefetch = () => setRefetch((prev) => !prev);

    // Abrir y cerrar Modal
    // const handleOpenModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    const openCloseModal = () => setShowModal((prev) => !prev);

    // Crear usuario
    const createUser = () => {
        setTitleModal("Crear Usuario")
        setContentModal(<CreateEditUser onHide={openCloseModal} onRefetch={onRefetch} />)
        openCloseModal()
    }

    // Editar usuario
    const editUser = (data) => {
        setTitleModal("Editar Usuario")
        setContentModal(<CreateEditUser onHide={openCloseModal} onRefetch={onRefetch} user={data} />)
        openCloseModal()
    }

    // Eliminar usuario
    const onDeleteUser = async (data) => {
        const result = window.confirm(`¿Eliminar usuario ${data.email}?`)
        if (result) {
            try {
                await deleteUser(data.id)
                onRefetch()
            } catch (error) {
                console.log('error', error.message)
            }
        }
    }


    // Validar permisos
    if (auth.me.is_active === false || auth.me.is_staff === false) {
        return <Navigate to="/admin" />
    }

    return (
        <>
            <HeaderUser
                title="Usuarios"
                btnTitle="Crear Usuarios"
                btnClick={createUser}
            />

            {loading ? (
                <div className="alert alert-success" role="alert">
                    Cargando...
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger" role="alert">
                            Hubo un error al cargar los usuarios.
                        </div>
                    ) : (
                        <ListUser
                            users={users}
                            editUser={editUser}
                            onDeleteUser={onDeleteUser}
                        />
                    )}
                </>
            )}

            <ModalUser
                show={showModal}
                onHide={openCloseModal}
                title={titleModal}
                body={contentModal}
            />
        </>
    )
}
