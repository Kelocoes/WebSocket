import { useEffect, useState } from "react";
import stompService from "../utils/StompService";

export default function ChatPage () {
    const user = localStorage.getItem('user');
    const [ messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [ actualUser, setActualUser] = useState(user?.toLowerCase());
    const [ message, setMessage] = useState("");
    const [ to, setTo] = useState("");

    const sendMessage = () => {
        stompService.publish("/message", {
            sender: actualUser,
            to,
            content: message,
        });

        setMessages((prevMessages) => [...prevMessages, { sender: actualUser, content: message }]);
    };

    useEffect(() => {
        if (!actualUser) {
            return;
        }
        const connectAndSubscribe = async () => {
            await stompService.connect();

            stompService.subscribe("/messageTo/" + actualUser.toLowerCase(), (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        };

        connectAndSubscribe();

        return () => {
            stompService.disconnect();
        };
        // eslint-disable-next-line
    }, []);

    if (!actualUser) {
        return (
            <div>
                <h1>Chat</h1>
                <p>Por favor, ingrese un nombre de usuario</p>
            </div>
        );
    }

    return (
        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
            <h1>Chat</h1>
            <div id="chat">
                <input type="text" placeholder="To" onChange={(e) => setTo(e.target.value)} />
                <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>
                    Send
                </button>
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender === actualUser ? "right" : "left" }}>
                        {msg.sender}: {msg.content}
                    </p>
                ))}
            </div>
        </div>
    );
}
