import { useEffect, useState, useMemo, useCallback } from "react";
import stompService from "../utils/StompService";
import AnotherComponent from "../components/AnotherComponent";
import { useSelector } from "react-redux";

const expensiveFunction = (field) => {
    // console.log('I am validating the field');
    //Expensive function that validates the field
    for(let i = 0; i < 1000000000; i++){
        //do nothing
    }
    return true;
};

export default function ChatPage () {
    console.log('Chat Page Mounted');
    const user = localStorage.getItem('user');
    const [ messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [ actualUser, setActualUser] = useState(user?.toLowerCase());
    const [ message, setMessage] = useState("");
    const [ to, setTo] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const userRedux = useSelector(state => state.user);
    // eslint-disable-next-line
    const isValidated = expensiveFunction(message);
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

    const fn = () => {
        console.log('I am a function');
    };

    useEffect(() => {
        if (!actualUser) {
            return;
        }
        console.log('User catched by redux', userRedux);
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

    return (
        <div style={{ width: '80%', display: 'flex', alignItems: 'center', flexDirection:'column', ...myStyle, height: '100vh'}} >
            <h1>Chat</h1>
            {
                actualUser 
                ? 
                <>
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
                </>
                : <p>Por favor, ingrese un nombre de usuario</p>
            }
            <AnotherComponent fn={fn}/>
        </div>
    );
}
