import { useContext, useEffect, useState, type MouseEventHandler } from "react"
import { Alert, Button, Card, CardFooter, Form, ListGroup } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import type { Post, Tag, Usuario } from "../types/tipos"
import { useAuth } from "../context/AuthProvider"


export default function Post() {
  const { usuario } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [error, setError] = useState(null)
  const [comentarioTexto, setComentarioTexto] = useState("")

  useEffect(() => {
    document.title = "Anti-Social | Crear Post"
  }, [])

  if (!usuario) {
    return (
      <Alert variant="warning" className="mt-3">
        <p>Acceso restringido. Por favor, inicia sesión para crear un post.</p>
        <Button onClick={() => navigate("/login")} variant="dark">Iniciar sesión</Button>
      </Alert>
    )
  }

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el post")
        return res.json()
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
  }, [id])

  useEffect(() => {
    fetch("http://localhost:3000/user/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios")
        return res.json()
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message))
  }, [])

  const manejarSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(usuario.id)
    if (!comentarioTexto.trim()) return
    fetch(`http://localhost:3000/user/${usuario.id}/post/${post?.id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texto: comentarioTexto
      })
    })
    .then(res => res.json())
    .then(() => {
      setComentarioTexto("") // Limpiar el textarea
      fetch(`http://localhost:3000/post/${id}`) // Recargar el post para ver el nuevo comentario
        .then(res => res.json())
        .then(data => setPost(data))
    })
    .catch(err => setError(err.message))
  }

  function nombreUsuario(userId: number | undefined): string {
    const usuarioEncontrado = usuarios.find((u) => u.id === userId)
    return usuarioEncontrado ? usuarioEncontrado.nickName : "Usuario inexistente"
  }

  function manejarClickTag(id: number){
    if (id)
    navigate(`/tag/${id}/posts`)
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{nombreUsuario(post?.userId)}</Card.Title>
        <Card.Text>{post?.texto}</Card.Text>
        {post?.Post_images && post.Post_images.length > 0 &&
          post.Post_images.map((img) => (
            <Card.Img key={img.id} variant="bottom" src={img.url} className="my-2" />
          ))
        }
        {post?.Tags && post.Tags.length > 0 && (
          <div className="my-2">
            {post.Tags.map((tag) => (
              <span key={tag.id} style={{cursor: 'pointer'}} className="badge bg-secondary me-1" onClick={()=>manejarClickTag(tag.id)}>
                {tag.texto}
              </span>
            ))}
          </div>
        )}
        <CardFooter className="text-muted">
          Publicado el {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Fecha desconocida"}
        </CardFooter>
        <Form className="mt-3" onSubmit={manejarSubmitComment}>
          <Form.Group>
            <Form.Label>Agregar un comentario:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Escribí tu comentario..."
              value={comentarioTexto}
              onChange={(e) => setComentarioTexto(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Comentar
          </Button>
        </Form>
        {post?.Comments && post.Comments.length > 0 && (
          <ListGroup className="list-group-flush mt-3">
            <Card.Text className="fw-bold">Comentarios:</Card.Text>
            {post.Comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <strong>{nombreUsuario(comment.userId)}:</strong> {comment.texto}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  )
}
