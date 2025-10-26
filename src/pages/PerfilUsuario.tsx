import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider.tsx"
import { Alert } from "react-bootstrap"

export default function PerfilUsuario() {
  const { usuario } = useContext(AuthContext)
  if (!usuario) {
    return (
      <Alert variant="warning" className="mt-3">
        Acceso restringido
      </Alert>
    )
  }

  return (
    <div>
      <h1>Bienvenido {usuario.nickname}</h1>
    </div>
  )
}
