import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";

export default function CreateUserPage() {
    const { userId } = useParams();
    const id = userId ?? 1;

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, username, email });
        localStorage.setItem('user', username);
    };

    useEffect(() => {
        getUserById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Crear usuario</h1>
            <p>Esta es la página para crear un usuario con id {id}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Crear usuario</button>
            </form>
        </div>
    );
}
