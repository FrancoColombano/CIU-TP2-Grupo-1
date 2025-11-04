import { useEffect, useState } from "react"
import type { Post, Usuario } from "../types/tipos"
import { Alert, Card, CardFooter, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export default function PostsTag() {
const { id } = useParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([]) // lista de usuarios obtenidos del backend
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
    fetch(`http://localhost:3000/tag/${id}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los posts del tag")
        return res.json()
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
  }, [])

  function nombreUsuario(userId: number | undefined): string {
    const usuarioEncontrado = usuarios.find((u) => u.id === userId)
    return usuarioEncontrado ? usuarioEncontrado.nickName : "Usuario inexistente"
  }

  function manejarClickPost(id: number): void {
    if (id) {
      navigate(`/post/${id}`)
    }
  }

  function nombreTag(tagId: string | undefined): string {
    const tags = posts.map((p) =>p.Tags).flat()
    const tag = tags.find(t => t?.id === Number(tagId))
    return tag ? tag.texto : "Tag desconocido"  
  }
  
  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div>
      <Container className="my-3" >
        <h2>Posts con tag {nombreTag(id)}</h2>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} lg={12} md={12} sm={12} className="mb-4">
              <Card style={{ width: '100%', cursor: 'pointer'}} onClick={() => manejarClickPost(post.id)}>
                <Card.Body>
                  <Card.Title>{nombreUsuario(post.userId)}</Card.Title>
                  <Card.Text>
                    {post.texto}
                  </Card.Text>
                  {post.Post_images && post.Post_images.length > 0 &&
                    post.Post_images.map((img) => (
                      <Card.Img
                        key={img.id}
                        variant="bottom"
                        src={img.url}
                        className="my-2"
                      />
                    ))
                  }
                  <CardFooter className="text-muted">
                      Publicado el {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Fecha desconocida"}
                  </CardFooter>
                </Card.Body>
              </Card>
            </Col>))}
        </Row>
      </Container>
    </div >
  )
}