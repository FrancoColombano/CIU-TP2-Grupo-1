import { useEffect, useState } from "react"
import type { Post, Usuario } from "../types/tipos"
import { Alert, Card, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Home({recargarPagina}: {recargarPagina: Number}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([]) 
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Anti-Social | Inicio"
  }, [])

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
    fetch("http://localhost:3000/post/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los posts")
        return res.json()
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
  }, [recargarPagina]) 

  function nombreUsuario(userId: number | undefined): string {
    const usuarioEncontrado = usuarios.find((u) => u.id === userId)
    return usuarioEncontrado ? usuarioEncontrado.nickName : "Usuario inexistente"
  }

  function manejarClickPost(id: number): void {
    if (id) {
      navigate(`/post/${id}`)
    }
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }
  return (
    <div>

      <Container className="my-3" >
        <h2>Feed de Publicaciones</h2>
        <Row>
          {[...posts].reverse().map((post) => (
            <Col key={post.id} xs={12} className="mb-3">
              <Card
                className="post-card"
                onClick={() => manejarClickPost(post.id)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <Card.Title>{nombreUsuario(post.userId)}</Card.Title>
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
          ))}
        </Row>
      </Container>
    </div >
  )
}
