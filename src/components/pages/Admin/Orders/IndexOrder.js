import React, { useEffect } from 'react'
import { HeaderOrder, ListTableOrder } from '.'
import { useTable } from '../../../../hooks' // Importar hook useUser
let debug = false

export function IndexOrder() {
    // Acceder al hook useUser
    const { loading, error, tables, getTables } = useTable()

        if (debug) {
            console.log('loading ---->', loading)
            console.log('error ---->', error)
            console.log('tables ---->', tables)
        }

    useEffect(() => {
        getTables()
        // eslint-disable-next-line
    }, []);



    return (
        <>
            <HeaderOrder
                title="Restaurante"
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
                        <ListTableOrder
                            tables={tables}
                        />
                    )}
                </>
            )}
        </>
    )
}
