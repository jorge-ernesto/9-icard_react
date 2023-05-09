import React, { useEffect, useState, useCallback } from 'react'
import { useCategory, useProduct } from '../../../../hooks'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import { useDropzone } from 'react-dropzone';

import { useFormik } from 'formik'
import * as Yup from 'yup'

export function CreateEditProduct(props) {
    const { onHide, onRefetch, product } = props
    const { categories, getCategories } = useCategory()
    const { addProduct, updateProduct } = useProduct()
    const [previewImage, setPreviewImage] = useState(product?.image ? product.image : null)

    useEffect(() => {
        getCategories()
        // eslint-disable-next-line
    }, []);


    // Formulario
    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? editSchema() : createSchema()),
        onSubmit: async (formValue) => {
            // console.log('submit', formValue)

            try {
                // Editar producto
                if (product) {
                    console.log('Editar producto')
                    const response = await updateProduct(product.id, formValue)
                    console.log('response onSubmit', response)
                } else { // Crear producto
                    console.log('Crear producto')
                    const response = await addProduct(formValue)
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
                        <td> <Form.Label>Precio</Form.Label> </td>
                        <td>
                            <Form.Control type="number" className="form-control" name="price" placeholder="Precio" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="mt-2 text-danger small">{formik.errors.price}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Categoria</Form.Label> </td>
                        <td>
                            <Form.Select name="category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Selecciona una categoría</option>
                                {categories && categories.length >= 1 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No hay categorías disponibles</option>
                                )}
                            </Form.Select>
                            {formik.touched.category && formik.errors.category ? (
                                <div className="mt-2 text-danger small">{formik.errors.category}</div>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <td> <Form.Label>Estado</Form.Label> </td>
                        <td>
                            <Form.Check type="checkbox" id="active" label="Activo" checked={formik.values.active} onChange={formik.handleChange} /> {/* Formik funciona relacionando los inputs con el atributo "name" o "id" de los mismos */}
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
                <Button type="submit" variant="primary">{product ? "Editar" : "Crear"}</Button>
            </div>

        </Form>
    )
}

const initialValues = (data) => {
    return {
        title: data?.title ? data.title : '',
        price: data?.price ? data.price : '',
        category: data?.category ? data.category : '',
        active: data?.active ? true : false,
        image: '',
    }
}

const createSchema = () => {
    return {
        title: Yup.string().required('Ingrese titulo'),
        price: Yup.number().required('Ingrese precio'),
        category: Yup.number().required('Seleccione categoría'),
        active: Yup.boolean().required('Seleccione estado'),
        image: Yup.string().required('Ingrese imagen'),
    }
}

const editSchema = () => {
    return {
        title: Yup.string().required('Ingrese titulo'),
        price: Yup.number().required('Ingrese precio'),
        category: Yup.number().required('Seleccione categoría'),
        active: Yup.boolean().required('Seleccione estado'),
        image: Yup.string(),
    }
}
