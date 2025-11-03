import { Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/estilos.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"
import PerfilUsuario from "./pages/PerfilUsuario"
import AuthProvider from "./context/AuthProvider";

function App() {

  return (
    <AuthProvider>
      <div className="app-container">
        {/* Columna izquierda - Navegación */}
        <aside className="sidebar-left">
          <Header />
        </aside>

        {/* Columna central - Contenido principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuario" element={<PerfilUsuario />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </main>

        {/* Columna derecha - Footer/Widgets */}
        <aside className="sidebar-right">
          <Footer />
        </aside>
      </div>

    </AuthProvider>
  )
}

export default App
