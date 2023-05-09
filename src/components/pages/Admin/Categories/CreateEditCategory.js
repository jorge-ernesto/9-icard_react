import React, { useState, useCallback } from 'react'
import { useCategory } from '../../../../hooks'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { useDropzone } from 'react-dropzone';

import { useFormik } from 'formik'
import * as Yup from 'yup'

export function CreateEditCategory(props) {
    const { onHide, onRefetch, category } = props
    const { addCategory, updateCategory } = useCategory()
    const [previewImage, setPreviewImage] = useState(category?.image ? category.image : null)


    // Formulario
    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? editSchema() : createSchema()),
        onSubmit: async (formValue) => {
            // console.log('submit', formValue)

            try {
                // Editar categoría
                if (category) {
                    console.log('Editar categoría')
                    const response = await updateCategory(category.id, formValue)
                    console.log('response onSubmit', response)
                } else { // Crear categoría
                    console.log('Crear categoría')
                    const response = await addCategory(formValue)
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


    // Se ejecuta esta función al usar el boton "Subir Imagen"
    const uploadImage = useCallback((acceptedFile) => {
        console.log(acceptedFile)
        const file = acceptedFile[0]
        formik.setFieldValue('image', file)
        setPreviewImage(URL.createObjectURL(file))
        // eslint-disable-next-line
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        noKeyboard: true,
        multiple: false,
        onDrop: uploadImage
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
                        <td> <Form.Label>Titulo</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="title" placeholder="Titulo" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.title && formik.errors.title ? (
                                <div className="mt-2 text-danger small">{formik.errors.title}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Imagen</Form.Label> </td>
                        <td>
                            <div className="d-grid gap-2">
                                <Button type="button" variant="primary" {...getRootProps()}>Subir imagen</Button>
                                <input {...getInputProps()} />
                                <Image width="100%" src={previewImage} />
                            </div>
                            {formik.submitCount > 0 && formik.errors.image ? (
                                <div className="mt-2 text-danger small">{formik.errors.image}</div>
                            ) : null}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary">{category ? "Editar" : "Crear"}</Button>
            </div>

        </Form>
    )
}

const initialValues = (data) => {
    return {
        title: data?.title ? data.title : '',
        image: '',
    }
}

const createSchema = () => {
    return {
        title: Yup.string().required('Ingrese titulo'),
        image: Yup.string().required('Ingrese imagen'),
    }
}

const editSchema = () => {
    return {
        title: Yup.string().required('Ingrese titulo'),
        image: Yup.string(),
    }
}
