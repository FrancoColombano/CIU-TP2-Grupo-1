import { useEffect, useState } from "react"
import { Button, Form, Card, Alert } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import type { Usuario } from "../types/tipos"

export default function Login() {

  useEffect(() => {
    document.title = "Anti-Social | Iniciar Sesion"
  }, [])

  const [loginForm, setLoginForm] = useState({ // manejar estado del formulario de login
    nickName: "",
    clave: ""
  })

  const [registroForm, setRegistroForm] = useState({ // manejar estado del formulario de registro
    nickName: "",
    email: "",
    clave: ""
  })

  const [usuarios, setUsuarios] = useState<Usuario[]>([]) // lista de usuarios obtenidos del backend
  const [error, setError] = useState("") // manejar errores de login/registro
  const { login, usuario } = useAuth() // obtener función de login y usuario actual desde el contexto de autenticación
  const [tieneUsuario, setTieneUsuario] = useState(true) // estado para alternar entre login y registro

  const claveMaestra: string = "123456"
  const navigate = useNavigate()

  // Handler para el formulario de LOGIN, basicamente actualiza el estado del formulario cada vez que hay un cambio
  const manejarCambioLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handler para el formulario de REGISTRO, lo mismo que el de login pero para el registro
  const manejarCambioRegistro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegistroForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Cargar usuarios desde el backend al iniciar el componente
  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios")
        return res.json()
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message))
  }, [tieneUsuario])

  // Submit del LOGIN, verifica la clave maestra y si el usuario existe
  const manejarSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Limpiar errores previos
    
    if (!loginForm.nickName || !loginForm.clave) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (loginForm.clave !== claveMaestra) {
      setError("Clave incorrecta")
      return
    }

    const usuarioEncontrado = usuarios.find((u) => u.nickName === loginForm.nickName) // busca si algun usuario tiene el nickName ingresado

    if (!usuarioEncontrado) {
      setError("Usuario no encontrado")
      return
    }


    login(usuarioEncontrado)
    navigate("/usuario")
  }

  // Submit del REGISTRO, crea un nuevo usuario en el backend
  const manejarSubmitRegistro = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validar campos obligatorios
    if (!registroForm.nickName || !registroForm.email || !registroForm.clave) {
      setError("Todos los campos son obligatorios")
      return
    }

    fetch("http://localhost:3000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nickName: registroForm.nickName,
        email: registroForm.email
      })
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error al crear usuario")
          })
        }
        return response.json()
      })
      .then(() => {
        console.log(  "Usuario creado con éxito")
        setTieneUsuario(true) 
        navigate("/login")
      })
      .catch((err: any) => {
        setError(err.message)
      })
  }

  if (usuario) { // si ya hay un usuario logueado, redirige a la pagina de usuario cuando intenta acceder a login
    return <Navigate to="/usuario" />
  }

  if (tieneUsuario) { //Si tieneUsuario es true muestro iniciar sesion
    return (
      <Card style={{ width: '18rem' }} className="container">
        <Card.Body>
          <Card.Title className="d-block text-center mb-3">Iniciar Sesión</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={manejarSubmitLogin}>
            <Form.Group className="mb-3" controlId="nickName">
              <Form.Control
                type="text"
                placeholder="Ingrese nickname"
                name="nickName"
                value={loginForm.nickName}
                onChange={manejarCambioLogin}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="clave">
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                name="clave"
                value={loginForm.clave}
                onChange={manejarCambioLogin}
              />
            </Form.Group>
            <Button className="w-100" variant="dark" type="submit">
              Iniciar Sesion
            </Button>
          </Form>
          <Card.Link
            className="d-block text-center mt-2"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setError("") // Limpiar errores al cambiar de formulario
              setTieneUsuario(false)
            }}
          >
            ¿No tenés cuenta? Registrate
          </Card.Link>
        </Card.Body>
      </Card>
    )
  }
  //Si tieneUsuario es falso muestro el register
  return (
    <Card style={{ width: '18rem' }} className="container">
      <Card.Body>
        <Card.Title className="d-block text-center mb-3">Crea tu cuenta</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarSubmitRegistro}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Ingrese email"
              name="email"
              value={registroForm.email}
              onChange={manejarCambioRegistro}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nickName">
            <Form.Control
              type="text"
              placeholder="Ingrese nickname"
              name="nickName"
              value={registroForm.nickName}
              onChange={manejarCambioRegistro}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="clave">
            <Form.Control
              type="password"
              placeholder="Crea una contraseña"
              name="clave"
              value={registroForm.clave}
              onChange={manejarCambioRegistro}
              required
            />
          </Form.Group>
          <Button className="w-100" variant="dark" type="submit">
            Registrate
          </Button>
        </Form>
        <Card.Link
          className="d-block text-center mt-2"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setError("")
            setTieneUsuario(true)
          }}
        >
          ¿Ya tenés cuenta? Inicia Sesión
        </Card.Link>
      </Card.Body>
    </Card>
  )
}
