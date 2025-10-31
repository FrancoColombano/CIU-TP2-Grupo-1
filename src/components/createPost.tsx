
import { AuthContext } from "../context/AuthProvider";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";


type Tag = {
    id: number;
    texto: string;
};

type Image = {
    id: number;
    URL: string;
};

type Post = {
    id: number;
    texto: string;
};

export default function CreatePost() {
    const { usuario } = useContext(AuthContext);

    //Traido de la DB
    const [posts, setPost] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [image, setImage] = useState<Image[]>([]);
    const [error, setError] = useState<string | null>(null);

    //Campos del form
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState<undefined | string>(undefined);
    const [tag, setTag] = useState<null | string>(null);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nuevoPost = { usuario, description, tag, imageURL }

    useEffect(() => {
        fetch("http://localhost:3000/tag/")
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron obtener los tags");
                return res.json();
            })
            .then((data) => setTags(data))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((e: any) => setError(e.message));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/image/")
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron obtener las imagenes");
                return res.json();
            })
            .then((data) => setImage(data))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((e: any) => setError(e.message));
    }, []);
        
    fetch(`http://localhost:3000/user/${usuario.id}/post`, { //Aregar ID a usuario
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPost),
    })
        .then((res) => {
            if (!res.ok) throw new Error("Error al crear el post")
            return res.json()
        })
        .then((postCreado: Post) => {
            setPost([...posts, postCreado]);
            setTag("");
            setImageURL("");
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((e: any) => setError(e.message));


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nuevoPost = {usuario, description, tag, imageURL };

        fetch(`http://localhost:3000/user/${usuario.id}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPost),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al crear el post");
                return res.json();
            })
            .then((postCreado: Post) => {
                setPost([...posts, postCreado])
                setTag(null)
                setImageURL("")
                setDescription("")
            
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((e: any) => setError(e.message))

    }

return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{usuario.nickname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Añadí una descripción</Form.Label>
                    <Form.Control required as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3" >
                    <Form.Select aria-label="Seleccionar una imagen">
                        <option>Seleccioná una URL de imagen</option>
                        {image.map((i) => (
                            <option>{i.URL}</option>
                        ))}
                        <Form.Control onChange={(e) => setImageURL(e.target.value)} />
                    </Form.Select>
                    {imageURL} ? (<div><img src={imageURL} alt="Vista Previa imagen URL" /></div>)
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Select aria-label="Seleccionar TAG">
                        <option>Seleccioná un TAG</option>
                        {tags.map((t) => (
                            <option>{t.texto}</option>
                        ))}
                        <Form.Control onChange={(e) => (setTag(e.target.value))}/>
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>   
                Crear Post
            </Button>
        </Modal.Footer>
    </Modal>
);
}
