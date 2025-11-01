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
    return usuarioEncontrado ? usuarioEncontrado.nickName : "Usuario inexistente"
  }

  return (
    <div>
      <Container className="my-3" >
        <Row>
          {posts.map((post) => (
            <Col key={post.id} lg={12} md={12} sm={12} className="mb-4">
              <div className="p-3 border bg-light">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{nombreUsuario(post.userId)}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </div>

            </Col>))}
        </Row>
      </Container>
    </div >
  )
}
