import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs"; // Nueva importación

const SOCKET_URL = "http://localhost:8081/ws";

export default function ChatPage() {
    const [actualUser, setActualUser] = useState();
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [message, setMessage] = useState("");

    const connect = () => {
        const socket = new SockJS(SOCKET_URL);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log("Conectado");
                stompClient.subscribe(
                    `/topic/${roomId}`,
                    (messageOutput) => {
                        const receivedMessage = JSON.parse(messageOutput.body);
                        console.log(receivedMessage.sender)
                        const isOwnMessage = receivedMessage.sender === actualUser;
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { align: isOwnMessage ? "right" : "left", message: receivedMessage.content, sender: receivedMessage.sender },
                        ]);
                    }
                );
            },
            onDisconnect: () => {
                console.log("Desconectado");
            },
        });

        stompClient.activate();
        setClient(stompClient);
    };

    const disconnect = () => {
        if (client) {
            client.deactivate();
            setClient(null);
        }
    };

    const sendMessage = () => {
        if (client && roomId && message && actualUser) {
            client.publish({
                destination: `/app/chat/${roomId}`,
                body: JSON.stringify({ content: message, sender: actualUser }),
            });
            setMessage("");
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        setActualUser(user);
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    if (!actualUser) {
        return (
            <div>
                <h1>Chat</h1>
                <p>No hay un usuario logueado</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Chat</h1>
            <p>Esta es la página de chat con el usuario {actualUser}</p>
            <div>
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button
                    onClick={
                        () => (client ? disconnect() : connect())
                    }
                >
                    {client ? "Desconectar" : "Conectar"}
                </button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>

            <div id="chat">
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.align }}>
                        {msg.sender}: {msg.message}
                    </p>
                ))}
            </div>
        </div>
    );
}
