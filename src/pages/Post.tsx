import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider.tsx"
import { Alert } from "react-bootstrap"

export default function Post() {
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
      <h1>Post Page</h1>
      <p>Crea tu post</p>
    </div>
  )
}
