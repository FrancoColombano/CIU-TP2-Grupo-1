import { Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/estilos.css"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"
import PostsTag from "./pages/PostsTag";
import PerfilUsuario from "./pages/PerfilUsuario"
import AuthProvider from "./context/AuthProvider";
import CreatePost from "./components/CreatePost";
function App() {
  return (
    <AuthProvider>
      <CreatePost />
      <div className="app-container">
        {/* Columna izquierda - Navegación */}
        <aside className="sidenav">
          <NavBar />
        </aside>
        <div className="spacer-left"></div>
        {/* Columna central - Contenido principal */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuario" element={<PerfilUsuario />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/tag/:id/posts" element={<PostsTag />} />
          </Routes>
        </main>
        {/* Columna derecha - Footer/Widgets */}
        <div className="spacer-right"></div>

        <div className="spacer-top">
          <img src="./LogoRedSocialOscuro.png" alt="Logo" style={{ width: '50px', display: 'flex' }} />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
