import React from 'react'
import logo from './../../assets/images/logo.svg'

export function Footer() {
    return (
        <footer className="container" style={{ color: "#2BA977" }}>
            <br /><br /><br />
            <hr />
            <img src={logo} width="100" alt="Logotipo" />

            <p>Desarrollado por Jorge Ernesto La Chira Gutiérrez</p>
        </footer>
    )
}
