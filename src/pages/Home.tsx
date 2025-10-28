import { useEffect } from "react"

export default function Home() {

  useEffect(() => { 
    document.title = "Anti-Social | Inicio"
  }, [])

  return (
    <div className="container">Home</div>
  )
}
