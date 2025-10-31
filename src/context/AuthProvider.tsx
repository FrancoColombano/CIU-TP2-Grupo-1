import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { Usuario } from "../types/tipos"

// 1) Tipar el contexto (no dejarlo sin tipo)
type AuthContextType = {
  usuario: Usuario | null
  login: (usuario: Usuario) => void
  logout: () => void
}

// 2) Inicializar con undefined y tipar como AuthContextType | undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3) Tipar las props del provider
type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) { 
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    useEffect(() => { 
        const usuarioGuardado = localStorage.getItem('usuario')
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado))
        }
    }, [])

    const login = (usuario: Usuario) => { 
        setUsuario(usuario)
        localStorage.setItem('usuario', JSON.stringify(usuario))
    }

    const logout = () => { 
        setUsuario(null)
        localStorage.removeItem('usuario')
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// 4) Validar que el hook se use dentro del provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}