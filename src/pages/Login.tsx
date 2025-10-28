import { useContext, useEffect, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext, useAuth } from "../context/AuthProvider"

export default function Login() {

  useEffect(() => {
    document.title = "Anti-Social | Iniciar Sesion"
  }, [])

  const [logi, setLogin] = useState({
    clave: "",
    nickname: ""
  })
  const { login } = useAuth()

  const { usuario } = useContext(AuthContext)


  const [estaLogueado, setEstaLogueado] = useState(true)

  const claveMaestra: string = "123456"
  const navigate = useNavigate()

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setLogin({
      ...logi,
      [name]: value
    })
  }


  const manejarSubmit = (e) => {
    e.preventDefault()
    if (logi.clave === claveMaestra) {
      login(logi.nickname)
      navigate("/usuario")
    }
  }
  if (usuario) {
    return (
      <Navigate to="/usuario" />
    )
  }
  if (estaLogueado) {
    return (
      <>
        <Card style={{ width: '18rem' }} className="container">
          <Card.Body>
            <Card.Title className="d-block text-center mb-3">Iniciar Sesión</Card.Title>
            <Form onSubmit={manejarSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Ingrese nickname" name="nickname" onChange={manejarCambio} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Ingrese contraseña" name="clave" onChange={manejarCambio} />
              </Form.Group>
              <Button className="w-100" variant="dark" type="submit">
                Iniciar Sesion
              </Button>
            </Form>
            <Card.Link className="d-block text-center mt-2" href="#" onClick={() => setEstaLogueado(false)}>¿No tenés cuenta? Registrate</Card.Link>
          </Card.Body>
        </Card>
      </>
    )
  }
  return (
    <Card style={{ width: '18rem' }} className="container">
      <Card.Body>
        <Card.Title className="d-block text-center mb-3">Crea tu cuenta</Card.Title>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Ingrese email" name="email" onChange={manejarCambio} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Ingrese nickname" name="nickname" onChange={manejarCambio} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control type="date" placeholder="Ingrese fecha de nacimiento" name="fechaNacimiento" onChange={manejarCambio} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Género</Form.Label>
            <Form.Select aria-label="Default select example" name="genero" onChange={manejarCambio}>
              <option>Seleccione género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="No binario">No binario</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Contraseña nueva" name="clave" onChange={manejarCambio} />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Registrate
          </Button>
        </Form>
        <Card.Link className="d-block text-center mt-2" href="#" onClick={() => setEstaLogueado(true)}>¿Ya tenés cuenta? Inicia Sesión</Card.Link>
      </Card.Body>
    </Card>
  )
}

