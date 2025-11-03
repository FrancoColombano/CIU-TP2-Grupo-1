import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider.tsx"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import type { Usuario } from "../types/tipos.tsx"

export default function PerfilUsuario() {
  const { usuario, logout } = useAuth()
  const [error, setError] = useState("")

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    document.title = `Anti-Social - Perfil ${usuario ? usuario.nickName : 'Usuario'}`
  }, [usuario])

  const navigate = useNavigate()

  // Cargar usuarios desde el backend al iniciar el componente
  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios")
        return res.json()
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message))
  }, [])

  const [actualizarForm, setActualizarForm] = useState({
    email: usuario ? usuario.email : "",
    nickName: usuario ? usuario.nickName : ""
  })

  const manejarCambioActualizar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setActualizarForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const yaExisteNickName = (nombreUsuario: string) => {
    return usuarios.some((u: Usuario) => u.nickName === nombreUsuario)
  }

  const manejarSubmitActualizar = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!actualizarForm.email || !actualizarForm.nickName) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (yaExisteNickName(actualizarForm.nickName) && actualizarForm.nickName !== usuario?.nickName) {
      setError("El NickName ya está en uso. Por favor, elige otro.")
      return
    }

    fetch(`http://localhost:3000/user/${usuario?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(actualizarForm)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar usuario")
        return response.json()
      })
      .then(() => {
        alert("Datos actualizados correctamente. Por favor, vuelve a iniciar sesión.")
        handleClose()
        logout()
        navigate("/login")
      })
      .catch((err) => setError(err.message))
  }


  if (!usuario) {
    return (
      <Alert variant="warning" className="mt-3">
        <p>Acceso restringido. Inicie sesión para ver su perfil.</p>
        <Button onClick={() => navigate("/login")} variant="dark">Iniciar sesión</Button>
      </Alert>
    )
  }

  return (
    <div>
      <h1>Bienvenido {usuario.nickName}</h1>
      <h2>Tus datos</h2>
      <ul>
        <li>
          <strong>Email:</strong> {usuario.email}</li>
        <li><strong>NickName:</strong> {usuario.nickName}</li>
      </ul>
      <Button variant="dark" onClick={handleShow}>Actualizar datos</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={manejarSubmitActualizar}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Nuevo Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu nuevo email"
                name="email"
                defaultValue={usuario.email}
                value={actualizarForm.email}
                onChange={manejarCambioActualizar}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNickName">
              <Form.Label>Nuevo NickName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nuevo nickname"
                name="nickName"
                defaultValue={usuario.nickName}
                value={actualizarForm.nickName}
                onChange={manejarCambioActualizar}
                pattern="^\S+$"
                required />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="dark" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2 className="mt-4">Tus publicaciones</h2>
    </div>
  )
}
