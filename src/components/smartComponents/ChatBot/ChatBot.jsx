import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import messageParser from '../../smartComponents/ChatBot/MessageParser';
import ActionProvider from '../../smartComponents/ChatBot/ActionProviderDocs';
import config from '../../smartComponents/ChatBot/ChatBotConfig';
import 'react-chatbot-kit/build/main.css';

function Chat() {
    const [showBot, toggleBot] = useState(false);
    const saveMessages = (messages, HTMLString) => {
        console.log(messages);
        window.localStorage.setItem('chat_messages', JSON.stringify(messages));
    };
    const loadMessages = () => {
        const messages = JSON.parse(window.localStorage.getItem('chat_messages'));
        return messages;
    };
    
    return (
        <div className = 'fixed bottom-10 left-10 z-10'>
            {showBot && (
                <Chatbot
                    config = { config }
                    actionProvider = { ActionProvider }
                    messageHistory = { loadMessages() }
                    messageParser = { messageParser }
                    saveMessages = { saveMessages }
                    headerText = 'Chat con FindBookBot'
                    placeholderText = 'Escribe aquí...'
                    // validator = {validateInput}
                    runInitialMessagesWithHistory
                    disableScrollToBottom
                />
            )}
            <button onClick={() => {
                    toggleBot((prev) => !prev)
                }} className = "py-1 flex flex-wrap items-center justify-center font-medium no-underline w-15 text-neutral-900 rounded-2xl bg-stone-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" /*class="appChatbotButtonIcon_Lq7z"*/ className="mx-3 rounded-full w-6 h-6">
                    <path d="M192 408h64v-48h-64zm384-216h-32a96 96 0 00-96-96H344V24a24 24 0 00-48 0v72H192a96 96 0 00-96 96H64a48 48 0 00-48 48v128a48 48 0 0048 48h32a96 96 0 0096 96h256a96 96 0 0096-96h32a48 48 0 0048-48V240a48 48 0 00-48-48zM96 368H64V240h32zm400 48a48.14 48.14 0 01-48 48H192a48.14 48.14 0 01-48-48V192a48 48 0 0148-48h256a48 48 0 0148 48zm80-48h-32V240h32zM240 208a48 48 0 1048 48 47.996 47.996 0 00-48-48zm160 0a48 48 0 1048 48 47.996 47.996 0 00-48-48zm-16 200h64v-48h-64zm-96 0h64v-48h-64z"></path>
                </svg>
            </button>
        </div>
    );
}

export default Chat;