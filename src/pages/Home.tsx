import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import type { Post, Usuario } from "../types/tipos"
import { Button, Card, Col, Container, Row } from "react-bootstrap"


export default function Home() {
  const { usuario } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([]) // lista de usuarios obtenidos del backend
  const [error, setError] = useState(null)

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
  }, [])

  function nombreUsuario(userId: number | undefined): string {
    const usuarioEncontrado = usuarios.find((u) => u.id === userId)
    console.log(posts[3].Post_Images?.[2].url)
    return usuarioEncontrado ? usuarioEncontrado.nickName : "Usuario inexistente"
  }

  return (
    <div>
      <Container className="my-3" >
        <h2>Feed de Publicaciones</h2>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} lg={12} md={12} sm={12} className="mb-4">
              <Card style={{ width: '100%'}}>
                <Card.Body>
                  <Card.Title>{nombreUsuario(post.userId)}</Card.Title>
                  <Card.Text>
                    {post.texto}
                  </Card.Text>
                  <Card.Img
                    variant="top"
                    src="https://picsum.photos/1920/1080"
                    alt="Imagen del post" />
                </Card.Body>
              </Card>
            </Col>))}
        </Row>
      </Container>
    </div >
  )
}
