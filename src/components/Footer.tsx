import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {

  return (
    <aside className="sidebar-footer">
      <Container className="h-100 d-flex flex-column py-4">
        <div className="mb-4">
          <h5 className="fw-bold text-light">Anti-Social Net</h5>
        </div>

        <ul className="list-unstyled d-flex flex-column">
          <li className="mb-3">
            <Link to="/" className="text-light text-decoration-none d-flex align-items-center p-2 rounded">
              <i className="bi bi-house-door me-3 fs-5"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/post" className="text-light text-decoration-none d-flex align-items-center p-2 rounded">
              <i className="bi bi-search me-3 fs-5"></i>
              <span>Publicaciones</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/login" className="text-light text-decoration-none d-flex align-items-center p-2 rounded">
              <i className="bi bi-bell me-3 fs-5"></i>
              <span>Iniciar Sesion</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/usuario" className="text-light text-decoration-none d-flex align-items-center p-2 rounded">
              <i className="bi bi-person me-3 fs-5"></i>
              <span>Perfil</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-bottom-footer">
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/usuario">Perfil</Link>
            <Link to="/prensa">Prensa</Link>            
            <Link to="/empleo">Empleo</Link>            
            <Link to="/condiciones">Terminos y Condiciones</Link>
            <Link to="/ubicaciones">Nosotros</Link>            
          </div>
          <p className="footer-copyright">© 2025 Anti-Social Net</p>
        </div>
      </Container>
    </aside >
  );
}