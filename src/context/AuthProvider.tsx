import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }) { 
    const [usuario, setUsuario] = useState(null)

    useEffect(() => { 
        const usuarioGuardado = localStorage.getItem('usuario')
        if (usuarioGuardado) { 
            setUsuario({ nickname: usuarioGuardado })
        }
    }, [])

    const login = (nickname) => { 
        setUsuario(nickname)
        localStorage.setItem('usuario', nickname)
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

export function useAuth() {
  return useContext(AuthContext);
}