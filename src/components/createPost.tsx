import { useAuth } from "../context/AuthProvider";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Post, Post_image, Tag} from "../types/tipos";
import { useNavigate } from "react-router-dom"

interface RecargarPagina { 
    setRecargarPagina: React.Dispatch<React.SetStateAction<number>>
}

export default function CreatePost({setRecargarPagina}: RecargarPagina) {
    const { usuario } = useAuth();
    const navigate = useNavigate()
    //Traido de la DB
    const [posts, setPost] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [images, setImages] = useState<Post_image[]>([]);
    const [error, setError] = useState<string | null>(null);

    //Campos del form
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<Post_image | null>(null);
    const [tag, setTag] = useState<Tag | null>(null);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!usuario) {
           return navigate("/login")
        }
        setShow(true);
    }

    useEffect(() => {
        fetch("http://localhost:3000/tag/")
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron obtener los tags");
                return res.json();
            })
            .then((data) => setTags(data))
            .catch((e: any) => setError(e.message));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/post_image/")
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron obtener las imagenes");
                return res.json();
            })
            .then((data) => setImages(data))
            .catch((e: any) => setError(e.message));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`http://localhost:3000/user/${usuario?.id}/post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: description }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al crear el post");
                return res.json();
            })
            .then((postCreado: Post) => {
                setPost([...posts, postCreado]);

                // Encadenar las siguientes peticiones AQUÍ DENTRO
                const promises = [];

                if (tag && postCreado.id) {
                    const tagPromise = fetch(`http://localhost:3000/post/${postCreado.id}/tag`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tagIds: [tag.id] }),
                    });
                    promises.push(tagPromise);
                }

                if (image && postCreado.id) {
                    const imagePromise = fetch(`http://localhost:3000/post/${postCreado.id}/image`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagenIds: [image.id] }),
                    });
                    promises.push(imagePromise);
                }

                return Promise.all(promises);
            })
            .then(() => {
                setDescription("");
                setImage(null);
                setTag(null);
                setRecargarPagina(prev => prev + 1) //Hace que cambie el valor para que vuelva a correr el useEffect en HOME
                handleClose();
                navigate("/")
            })
            .catch((e: any) => {
                console.error(e);
                setError(e.message);
            });
        if (error){
            <Alert variant="danger">{error}</Alert>
        }
    }

    function retornarTag(texto: string): Tag | null {
        const tagEncontrado = tags.find((t) => t.texto === texto);
        return tagEncontrado ? tagEncontrado : null;
    }

    function retornarImagen(url: string): Post_image | null {
        const imagenEncontrada = images.find((i) => i.url === url);
        return imagenEncontrada ? imagenEncontrada : null;
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="floating-button">+</Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}> 
                    <Modal.Header closeButton>
                        <Modal.Title>{usuario?.nickName}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* Descripción */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Añadí una descripción</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        {/* Imagen */}
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Seleccionar imagen</Form.Label>
                            <Form.Select
                                aria-label="Seleccionar una imagen"
                                onChange={(e) => setImage(retornarImagen(e.target.value))}
                            >
                                <option value="">Seleccioná una URL de imagen</option>
                                {images.map((i) => (
                                    <option key={i.id} value={i.url}>{i.url}</option>
                                ))}
                            </Form.Select>

                            {image && (
                                <div className="mt-2">
                                    <img
                                        src={image.url}
                                        alt="Vista Previa"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        {/* Tag */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Seleccionar TAG</Form.Label>
                            <Form.Select
                                aria-label="Seleccionar TAG"
                                onChange={(e) => setTag(retornarTag(e.target.value))}
                            >
                                <option value="">Seleccioná un TAG</option>
                                {tags.map((t) => (
                                    <option key={t.id} value={t.texto}>{t.texto}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit"> 
                            Crear Post
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}