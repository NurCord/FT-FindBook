import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import MessageParser from '../../smartComponents/ChatBot/MessageParser';
import ActionProvider from '../../smartComponents/ChatBot/ActionProviderDocs';
import config from '../../smartComponents/ChatBot/ChatBotConfig';
import 'react-chatbot-kit/build/main.css';

function Chat() {
    const [showBot, toggleBot] = useState(false);
    const saveMessages = (messages, HTMLString) => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    };
    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        return messages;
    };
    
    return (
        <div>
            {showBot && (
                <Chatbot
                    config = { config }
                    messageParser = { MessageParser }
                    actionProvider = { ActionProvider }
                    messageHistory = { loadMessages() }
                    saveMessages = { saveMessages }
                    headerText = 'Chat con FindBookBot'
                    placeholderText = 'Escribe aquí...'
                    // validator = {validateInput}
                    // runInitialMessagesWithHistory
                    // disableScrollToBottom
                />
            )}
            <button onClick={() => {
                toggleBot((prev) => !prev)
                console.log('showBot ', showBot)
            }
            } className = "px-4 py-1 font-medium no-underline w-72 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400">FindBookBot</button>
        </div>
    );
}

export default Chat;