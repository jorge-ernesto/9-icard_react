import React from 'react'
import { useUser } from '../../../../hooks'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik'
import * as Yup from 'yup'

export function CreateEditUser(props) {
    const { onHide, onRefetch, user } = props
    const { addUser, updateUser } = useUser()


    // Formulario
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? editSchema() : createSchema()),
        onSubmit: async (formValue) => {
            // console.log('submit', formValue)

            try {
                // Editar usuario
                if (user) {
                    console.log('Editar usuario')
                    const response = await updateUser(user.id, formValue)
                    console.log('response onSubmit', response)
                } else { // Crear usuario
                    console.log('Crear usuario')
                    const response = await addUser(formValue)
                    console.log('response onSubmit', response)
                }

                // Actualizar lista y cerrar modal
                onRefetch()
                onHide()
            } catch (error) {
                console.log('error onSubmit', error.message)
            }
        }
    })


    return (
        <Form onSubmit={formik.handleSubmit}>

            <Table responsive bordered>
                <thead className="table-dark">
                    <tr>
                        <th>Caracteristica</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> <Form.Label>Usuario</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="username" placeholder="Usuario" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="mt-2 text-danger small">{formik.errors.username}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Email</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="mt-2 text-danger small">{formik.errors.email}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Nombre</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="first_name" placeholder="Nombre" value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className="mt-2 text-danger small">{formik.errors.first_name}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Apellidos</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="last_name" placeholder="Apellidos" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <div className="mt-2 text-danger small">{formik.errors.last_name}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Contraseña</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="password" placeholder="Constraseña" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="mt-2 text-danger small">{formik.errors.password}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Permisos</Form.Label> </td>
                        <td>
                            <Form.Check type="checkbox" id="is_active" label="Activo" checked={formik.values.is_active} onChange={formik.handleChange} /> {/* Formik funciona relacionando los inputs con el atributo "name" o "id" de los mismos */}
                            <Form.Check type="checkbox" id="is_staff" label="Es Staff" checked={formik.values.is_staff} onChange={formik.handleChange} /> {/* Formik funciona relacionando los inputs con el atributo "name" o "id" de los mismos */}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary">{user ? "Editar" : "Crear"}</Button>
            </div>

        </Form>
    )
}

// Notas (`??`) o (`? :`)
// si `data?.username` tiene un valor booleano de false,
// la primera expresión `data?.username || ''`, devolverá el valor booleano false,
// mientras que la segunda expresión `data?.username ? data?.username : ''`, devolverá una cadena vacía ('').
const initialValues = (data) => {
    return {
        username: data?.username ? data.username : '',        // data?.username || '' (Otra forma)
        email: data?.email ? data.email : '',                 // data?.email || '' (Otra forma)
        first_name: data?.first_name ? data.first_name : '',  // data?.first_name || '' (Otra forma)
        last_name: data?.last_name ? data.last_name : '',     // data?.last_name || '' (Otra forma)
        password: '',
        is_active: data?.is_active ? true : false,
        is_staff: data?.is_staff ? true : false,
    }
}

const createSchema = () => {
    return {
        username: Yup.string().required('Ingrese usuario'),
        email: Yup.string().email('Ingrese email válido').required('Ingrese email'),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required('Ingrese contraseña'),
        is_active: Yup.bool().required('Ingrese check'),
        is_staff: Yup.bool().required('Ingrese check'),
    }
}

const editSchema = () => {
    return {
        username: Yup.string().required('Ingrese usuario'),
        email: Yup.string().email('Ingrese email válido').required('Ingrese email'),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        is_active: Yup.bool().required('Ingrese check'),
        is_staff: Yup.bool().required('Ingrese check'),
    }
}
