import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'


function ColorSchemesExample() {

    //const { usuario } = useContext(AuthContext)
    const { logout, usuario } = useAuth();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Nav className="flex-column">
                <Navbar.Brand as={Link} to={"/"} >
                    <img src="./LogoRedSocialOscuro.png" alt="Logo red social" className='img-fluid flex-column' style={{ width: '60px' }} />
                </Navbar.Brand>
                <Nav.Link as={NavLink} to={"/"}>Inicio</Nav.Link>
                <Nav.Link as={NavLink} to={"/login"}>Iniciar Sesión</Nav.Link>
                <Nav.Link as={NavLink} to={"/usuario"}>Perfil Usuario</Nav.Link>
                {usuario && <Button className="mx-3" variant="outline-light" onClick={logout}>Cerrar Sesión</Button>}
            </Nav>
        </Navbar>
    );
}

export default ColorSchemesExample;
