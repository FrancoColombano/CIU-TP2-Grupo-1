import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function ColorSchemesExample() {

    const { usuario } = useContext(AuthContext)
    const { logout } = useAuth();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={"/"}>Inicio</Nav.Link>
                    <Nav.Link as={NavLink} to={"/login"}>Iniciar Sesión</Nav.Link>
                    <Nav.Link as={NavLink} to={"/post"}>Crear Post</Nav.Link>
                    <Nav.Link as={NavLink} to={"/usuario"}>Perfil Usuario</Nav.Link>
                </Nav>
            </Container>
            {usuario && <Button variant="outline-light" onClick={logout}>Cerrar Sesión</Button>}
        </Navbar>
    );
}

export default ColorSchemesExample;
