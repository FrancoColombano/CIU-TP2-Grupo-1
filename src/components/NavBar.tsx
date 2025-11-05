import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'
import 'bootstrap-icons/font/bootstrap-icons.css';

function ColorSchemesExample() {
    const { logout, usuario } = useAuth();

    return (
        <div className="navcito">

            <Navbar.Brand as={Link} to={"/"} className='nav-logo'>
                <img src="./LogoRedSocialOscuro.png" alt="Logo" style={{ width: '40px' }} />
            </Navbar.Brand>

            <Nav.Link as={NavLink} to={"/"} className='nav-item'>
                <i className="bi bi-house-door icon" style={{ fontSize: '24px' }}></i>
            </Nav.Link>

            {!usuario && (
                <Nav.Link as={NavLink} to={"/login"} className='nav-item'>
                    <i className="bi bi-box-arrow-in-right icon" style={{ fontSize: '24px' }}></i>
                </Nav.Link>
            )}

            {usuario && (
                <Nav.Link as={NavLink} to={"/usuario"} className='nav-item'>
                    <i className="bi bi-person-circle icon" style={{ fontSize: '24px' }}></i>
                </Nav.Link>
            )}

            {usuario && (
                <Nav.Link className='nav-item' onClick={logout}>
                    <i className="bi bi-box-arrow-right icon" style={{ fontSize: '24px' }}></i>
                </Nav.Link>
            )}
        </div>
    );
}

export default ColorSchemesExample;
