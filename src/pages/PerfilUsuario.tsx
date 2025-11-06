import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider.tsx"
import { Alert, Button, Card, Col, Container, Form, Modal, ModalBody, ModalTitle, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import type { Post, Usuario } from "../types/tipos.tsx"
import "../styles/estilos.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PerfilUsuario() {
  const { usuario, logout } = useAuth()
  const [error, setError] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const navigate = useNavigate()
  /*Comportamiento modal editar usuario*/
  const [showUpdateUsuario, setShowUpdateUsuario] = useState(false)
  const handleCloseUpdateUsuario = () => setShowUpdateUsuario(false)
  const handleShowUpdateUsuario = () => setShowUpdateUsuario(true)
  /*Comportamiento modal eliminar post*/
  const [showEliminarPost, setShowEliminarPost] = useState(false)
  const handleCloseEliminarPost = () => setShowEliminarPost(false)
  const handleShowEliminarPost = () => setShowEliminarPost(true)

  useEffect(() => {
    document.title = `Anti-Social - Perfil ${usuario ? usuario.nickName : 'Usuario'}`
  }, [usuario])

  if (!usuario) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          <Alert.Heading>Acceso restringido</Alert.Heading>
          <p>Debes iniciar sesión para ver tu perfil.</p>
          <Button onClick={() => navigate("/login")} variant="primary">
            Iniciar sesión
          </Button>
        </Alert>
      </Container>
    )
  }
  
  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios")
        return res.json()
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    if (!usuario || !usuario.id) return
    fetch(`http://localhost:3000/user/${usuario.id}/post`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los posts del usuario")
        return res.json()
      })
      .then((data) => setPosts(data))
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizarForm)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar usuario")
        return response.json()
      })
      .then(() => {
        alert("Datos actualizados correctamente. Por favor, vuelve a iniciar sesión.")
        handleCloseUpdateUsuario()
        logout()
        navigate("/login")
      })
      .catch((err) => setError(err.message))
  }

  function manejarClickPost(id: number | undefined): void {
    if (id) {
      navigate(`/post/${id}`)
    }
  }



  const eliminarPost = (id: number): void => {

    fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar post")
        return response.json()
      })
      .then(() => {
        setPosts(postsActuales => postsActuales.filter(p => p.id !== id)) //eliminamos el post eliminado de la lista de posts local
      })
      .catch((err) => setError(err.message))
  }

  return (
    <Container className="my-4">
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="profile-avatar">
          <span style={{ fontSize: '2.5rem' }}>👤</span>
        </div>
        <h1 className="mb-2">@{usuario.nickName}</h1>
        <p className="text-muted mb-3">{usuario.email}</p>
        <Button variant="primary" size="sm" onClick={handleShowUpdateUsuario}>
          Editar perfil
        </Button>
      </div>

      {/* Stats */}
      <Card className="mb-4">
        <Card.Body className="py-3">
          <Row className="text-center">
            <Col xs={4} className="border-end">
              <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>
                {posts.length}
              </h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Posts</p>
            </Col>
            <Col xs={4} className="border-end">
              <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>0</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Seguidores</p>
            </Col>
            <Col xs={4}>
              <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>0</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Siguiendo</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal de edición */}
      <Modal show={showUpdateUsuario} onHide={handleCloseUpdateUsuario}>
        <Form onSubmit={manejarSubmitActualizar}>
          <Modal.Header closeButton>
            <Modal.Title>Editar perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                value={actualizarForm.email}
                onChange={manejarCambioActualizar}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNickName">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nickname"
                name="nickName"
                value={actualizarForm.nickName}
                onChange={manejarCambioActualizar}
                pattern="^\S+$"
                required
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateUsuario}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Publicaciones */}
      <h2 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
        Tus publicaciones
      </h2>

      {posts.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <p className="text-muted mb-3">Aún no tenés publicaciones</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Ir a inicio
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {[...posts].reverse().map((post) => (
            <Row key={post.id} className="mb-3">
              <Col xs={11}>
                <Card
                  className="post-card"
                  onClick={() => manejarClickPost(post.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Card.Text className="mb-2">{post.texto}</Card.Text>
                    {post.Post_images && post.Post_images.length > 0 && (
                      <div className="mb-2">
                        {post.Post_images.map((img) => (
                          <Card.Img
                            key={img.id}
                            src={img.url}
                            className="my-2"
                            style={{ borderRadius: '8px' }}
                          />
                        ))}
                      </div>
                    )}

                    {post.Tags && post.Tags.length > 0 && (
                      <div className="mb-2">
                        {post.Tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="badge bg-secondary me-1"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {tag.texto}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })
                          : "Fecha desconocida"}
                      </small>
                      <small style={{ color: 'var(--accent-blue)' }}>
                        Ver más →
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={1} className="d-flex align-items-center">
                <i className="bi bi-trash" style={{ cursor: 'pointer' }} onClick={handleShowEliminarPost}></i>
              </Col>
              <Modal show={showEliminarPost} onHide={handleCloseEliminarPost} centered className="text-center" size="sm">
                <ModalTitle>¿Desea eliminar el post?</ModalTitle>
                <ModalBody className="text-center">
                  <Button variant="secondary" onClick={handleCloseEliminarPost} className="me-2">
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={() => {
                    eliminarPost(post.id)
                    handleCloseEliminarPost()
                  }}>
                    Eliminar
                  </Button>
                </ModalBody>
              </Modal>
            </Row>
          ))}
        </Row>
      )}
    </Container>
  )
}


