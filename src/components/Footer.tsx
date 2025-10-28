import { Container, Row, Col, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { ReactElement } from "react";

export default function Footer(): ReactElement {

  const enlacesRapidos: ReactElement = (
    <ul className="list-unstyled">
      <li>
        <Link to="/" className="text-dark text-decoration-none">Home</Link>
      </li>      
    </ul>
  )


  return (
    <footer>
      <Container>
        {/* Versión escritorio */}

        <Row className="d-none d-md-flex mb-4"> {/*d-none hace que no se vea en mobile, d-md-flex que se vea en md en adelante*/}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Anti-Social Net</h5>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Enlaces rápidos</h6>
            {enlacesRapidos}
          </Col>          
        </Row>

        {/* Versión mobile con acordeones */}
        <Row className="d-md-none mb-4"> {/*d-md-none hace que no se vea en md en adelante*/}
          <Col>
            <h5 className="fw-bold text-center">Anti-Social Net</h5>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Enlaces rápidos</Accordion.Header>
                <Accordion.Body className="bg-footer">
                  {enlacesRapidos}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>                
          </Col>
        </Row>
      </Container>
    </footer>
  );
}