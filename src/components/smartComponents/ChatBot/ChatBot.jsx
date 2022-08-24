import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import messageParser from '../../smartComponents/ChatBot/MessageParser';
import ActionProvider from '../../smartComponents/ChatBot/ActionProviderDocs';
import config from '../../smartComponents/ChatBot/ChatBotConfig';
import 'react-chatbot-kit/build/main.css';
import imgs from '../../../assets/bot.png'
function Chat() {
    const [showBot, toggleBot] = useState(false);
    const saveMessages = (messages, HTMLString) => {
        window.localStorage.setItem('chat_messages', JSON.stringify(messages));
        console.log(messages)
    };
    const loadMessages = () => {
        const messages = JSON.parse(window.localStorage.getItem('chat_messages'));
        return messages;
    };
    const validateInput = ()=>{
       return true
    }
    return (
        <div className = 'fixed z-50 bottom-10 left-10'>
            {showBot && (
                <Chatbot
                    config = { config }
                    actionProvider = { ActionProvider }
                    messageParser = { messageParser }
                    saveMessages = { saveMessages }
                    messageHistory = { loadMessages() }
                    headerText = 'Chat con FindBookBot'
                    placeholderText = 'Escribe aquí...'
                    validator = {validateInput}
                    //runInitialMessagesWithHistory
                    disableScrollToBottom
                />
            )}
            <button onClick={() => {
                    toggleBot((prev) => !prev)
                }} className = "flex flex-wrap items-center justify-center py-1 mt-2 font-medium no-underline duration-500 rounded-full w-14 h-14 bg-slate-400 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-cream-200">
                <img src={imgs} className='h-10' alt='Not found'/>
            </button>
        </div>
    );
}

export default Chat;