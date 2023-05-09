import React from 'react'

export function Content(props) {
    const { children } = props

    return (
        <div className="container">
            <div className="row justify-content-center mt-3 pt-2">
                <div className="col-md-12">
                    {/* Codigo que viene de componentes */}
                    {children}
                </div>
            </div>
        </div>
    )
}
