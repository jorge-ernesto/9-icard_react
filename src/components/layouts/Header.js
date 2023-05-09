import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, /*Link, useLocation*/ } from 'react-router-dom'
import { useAuthContext } from '../../hooks' // Importar hook useAuthContext

export function Header() {
    // Acceder al hook useAuthContext
    const { auth, logout } = useAuthContext();

    // Acceder al pathname
    // const { pathname } = useLocation();

    // La sintaxis "?." es el operador de encadenamiento opcional de JavaScript que
    // se utiliza para evitar errores al acceder a una propiedad en caso de que el
    // objeto en el que se encuentra la propiedad no esté definido o sea nulo.
    const mostrarUsuario = () => {
        if (auth.me?.first_name && auth.me?.last_name) {
            return `${auth.me.first_name} ${auth.me.last_name}`
        }
        return auth.me?.email
    }


    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">iCardAdmin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Usando NavLink */}
                            {/* En React Router v6, la propiedad exact ya no se usa en el componente NavLink. En su lugar, se utiliza la propiedad end. La propiedad end indica que la ruta debe coincidir exactamente con el inicio y el final, lo que significa que no habrá coincidencias parciales. Por lo tanto, solo se activará el enlace con la ruta exacta cuando esté en esa ruta específica. */}
                            {/* <Nav.Link as={NavLink} to="/admin">Inicio</Nav.Link> */}
                            <Nav.Link as={NavLink} to="/admin" end>Pedidos</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin/tables">Mesas</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin/payments-history">Historial de pagos</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin/categories">Categorias</Nav.Link>
                            <Nav.Link as={NavLink} to="/admin/products">Productos</Nav.Link>
                            {auth.me?.is_staff &&
                                <Nav.Link as={NavLink} to="/admin/users">Usuarios</Nav.Link>
                            }

                            {/* Usando Link */}
                            {/* Metodo usado en curso React y Django */}
                            {/*
                            <Nav.Link as={Link} to="/admin"                  active={pathname === "/admin"}>Pedidos</Nav.Link>
                            <Nav.Link as={Link} to="/admin/tables"           active={pathname === "/admin/table"}>Mesas</Nav.Link>
                            <Nav.Link as={Link} to="/admin/payments-history" active={pathname === "/admin/payments"}>Historial de pagos</Nav.Link>
                            <Nav.Link as={Link} to="/admin/categories"       active={pathname === "/admin/categories"}>Categorias</Nav.Link>
                            <Nav.Link as={Link} to="/admin/products"         active={pathname === "/admin/products"}>Productos</Nav.Link>
                            {auth.me?.is_staff &&
                                <Nav.Link as={Link} to="/admin/users" active={pathname === "/admin/users"}>Usuarios</Nav.Link>
                            }
                            */}
                        </Nav>

                        {/* en Bootstrap 5, mr-2 se reemplazo por me-2, que significa margin-end 2 o margen a la derecha 2 */}
                        <Navbar.Text className="me-2">
                            Hola, {mostrarUsuario()}
                        </Navbar.Text>

                        <Button variant="success" onClick={logout}>Salir</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
