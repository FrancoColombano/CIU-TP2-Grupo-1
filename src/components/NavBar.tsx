import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'


function ColorSchemesExample() {

    //const { usuario } = useContext(AuthContext)
    const { logout, usuario } = useAuth();



    return (
        <div className="navcito">
            <Navbar bg="dark" data-bs-theme="dark">
                <Nav>
                    <Navbar.Brand as={Link} to={"/"} className='nav-item'>
                        <img src="./LogoRedSocialOscuro.png" alt="Logo red social" className='img-fluid flex-column' style={{ width: '60px' }} />
                    </Navbar.Brand>
                    <Nav.Link as={NavLink} to={"/"} className='nav-item'>I</Nav.Link>
                    <Nav.Link as={NavLink} to={"/login"} className='nav-item'>I</Nav.Link>
                    <Nav.Link as={NavLink} to={"/usuario"} className='nav-item'>P</Nav.Link>
                    {usuario && <Button className="mx-3 nav-item" variant="outline-light" onClick={logout}>C</Button>}
                </Nav>
            </Navbar>
        </div>
    );
}

export default ColorSchemesExample;
