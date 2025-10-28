import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider.tsx"
import { Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function PerfilUsuario() {
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    document.title = `Anti-Social - Perfil ${usuario ? usuario.nickname : 'Usuario'}`
  }, [usuario])

  const navigate = useNavigate()

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
      <h1>Bienvenido {usuario.nickname}</h1>
    </div>
  )
}
