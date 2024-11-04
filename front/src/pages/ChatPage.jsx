import { useEffect, useState, useMemo, useCallback } from "react";
import stompService from "../utils/StompService";

const expensiveFunction = (field) => {
    console.log('I am validating the field');
    //Expensive function that validates the field
    for(let i = 0; i < 1000000000; i++){
        //do nothing
    }
    return true;
}

const debounce = (func, wait) =>  {
    let timeout = null;
    console.log("Outside", timeout, wait, func);
    return function (...args) {
        console.log("Inside", timeout);
        const later = () => {
            timeout = null;
            func(...args);
        };
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}



export default function ChatPage () {
    const user = localStorage.getItem('user');
    const [ messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [ actualUser, setActualUser] = useState(user?.toLowerCase());
    const [ message, setMessage] = useState("");
    const [ to, setTo] = useState("");
    const [darkMode, setDarkMode] = useState(true);

    // eslint-disable-next-line
    const expensiveFunctionWithCallback = useCallback(debounce(() => expensiveFunction(message), 1000), []);
    // eslint-disable-next-line
    const isValidated = useMemo(() => expensiveFunctionWithCallback(message), [message]);
    const myStyle = {
        background: darkMode ? 'black' : 'white',
        color: darkMode ? 'white' : 'black'
    }

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
        <div style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection:'column', ...myStyle, height: '100vh'}} >
            <h1>Chat</h1>
            <button onClick={() => setDarkMode(prev => !prev)}>Dark Mode: {darkMode.toString()}</button>
            <p>{isValidated ? 'Valid!' : 'Not valid'}</p>
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
