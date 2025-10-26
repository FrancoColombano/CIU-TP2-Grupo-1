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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<PerfilUsuario />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        <Footer />
      </AuthProvider>
  )
}

export default App
