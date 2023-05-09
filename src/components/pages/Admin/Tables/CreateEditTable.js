import React from 'react'
import { useTable } from '../../../../hooks'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

import { useFormik } from 'formik'
import * as Yup from 'yup'

export function CreateEditTable(props) {
    const { onHide, onRefetch, table } = props
    const { addTable, updateTable } = useTable()


    // Formulario
    const formik = useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(table ? editSchema() : createSchema()),
        onSubmit: async (formValue) => {
            // console.log('submit', formValue)
            let response;

            try {
                // Editar mesa
                if (table) {
                    console.log('Editar mesa')
                    response = await updateTable(table.id, formValue)
                    console.log('response onSubmit', response)
                } else { // Crear mesa
                    console.log('Crear mesa')
                    response = await addTable(formValue)
                    console.log('response onSubmit', response)
                }

                // Alerta visual
                alertTable(response);

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
                        <td> <Form.Label>Mesa numero</Form.Label> </td>
                        <td>
                            <Form.Control type="input" className="form-control" name="number" placeholder="Numero de mesa" value={formik.values.number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.number && formik.errors.number ? (
                                <div className="mt-2 text-danger small">{formik.errors.number}</div>
                            ) : null}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary">{table ? "Editar" : "Crear"}</Button>
            </div>

        </Form>
    )
}

const initialValues = (data) => {
    return {
        number: data?.number ? data.number : ''
    }
}

const createSchema = () => {
    return {
        number: Yup.string().required('Ingrese numero de mesa'),
    }
}

const editSchema = () => {
    return {
        number: Yup.string().required('Ingrese numero de mesa'),
    }
}

const alertTable = (response) => {
    if (Array.isArray(response.number)) {
        swal(
            'Error',
            response.number[0],
            'error'
        )
    }
}
