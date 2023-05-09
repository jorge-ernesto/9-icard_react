import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { loginApi } from '../../../../api/user'
import { useAuthContext } from '../../../../hooks' // Importar hook useAuthContext

import { useFormik } from 'formik'
import * as Yup from 'yup'

export function LoginForm() {
    // Acceder al hook useAuthContext
    const { login } = useAuthContext()


    // Formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            // console.log('submit', formValue)

            try {
                // Enviar datos del usuario
                const response = await loginApi(formValue)
                console.log('response onSubmit', response)

                // Obtener token
                const { access } = response
                console.log('access', access)

                // Proceso de Login
                login(access)
            } catch (error) {
                console.log('error onSubmit', error.message)

                // Alerta visual
                swal(
                    'Error',
                    'Usuario o contraseña incorrectos',
                    'error'
                )
            }
        }
    })


    return (
        <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control type="email" className="form-control" name="email" value={formik.values.email} placeholder="Correo electrónico" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? (
                    <div className="mt-2 text-danger small">{formik.errors.email}</div>
                ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control type="password" className="form-control" name="password" value={formik.values.password} placeholder="Contraseña" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? (
                    <div className="mt-2 text-danger small">{formik.errors.password}</div>
                ) : null}
            </Form.Group>

            <div className="d-grid gap-2">
                <Button type="submit" className="btn btn-primary">
                    Iniciar sesión
                </Button>
            </div>
        </Form>
    )
}

const initialValues = () => {
    return {
        email: 'admin@admin.com',
        password: 'admin',
    }
}

const validationSchema = () => {
    return {
        email: Yup.string().email('Ingrese un correo electrónico válido').required('Ingrese un correo electrónico'),
        password: Yup.string().required('Ingrese una contraseña'),
    }
}
