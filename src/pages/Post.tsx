import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider.tsx"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export default function Post() {
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    document.title = "Anti-Social | Crear Post"
  }, [])

  const navigate = useNavigate();

  if (!usuario) {
    return (
      <Alert variant="warning" className="mt-3">
        <p>Acceso restringido. Por favor, inicia sesión para crear un post.</p>
        <Button onClick={() => navigate("/login")} variant="dark">Iniciar sesión</Button>
      </Alert>
    )
  }

  return (
    <div>
      <h1>Post Page</h1>
      <p>Crea tu post</p>
    </div>
  )
}
