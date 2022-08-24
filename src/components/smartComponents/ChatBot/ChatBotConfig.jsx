import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import imgs from '../../../assets/bot.png'
import Overview from "./Overview";
import MessageParser from "./MessageParser";
import ActionProviderDocs from "./ActionProviderDocs";

const botName = "FindBookBot";

const config = {
    botName: botName,
    lang: "no",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#c9af7f",
        },
        chatButton: {
            backgroundColor: "#c9af7f",
        },
    },
    initialMessages: [
        createChatBotMessage(
            `Hola, yo soy ${botName}.
            Estoy aquí para guiarte en lo que necesites.
            Por favor indícame tu nombre para iniciar`
        ),
    ],
    state: {
        gist: "",
    },
    customComponents: {
        header: () => <div className="py-3 font-medium text-center rounded-t-md bg-cream-300">Chat con {botName}</div>,
        botAvatar: () => <div className = "flex flex-wrap items-center justify-center font-medium rounded-full w-11 h-11 bg-slate-400">
        <img src={imgs} className='h-8' alt='Not found'/>
        </div>,
    },
    widgets: [
        {
            widgetName: "overview",
            widgetFunc: (props) => <Overview {...props} />,
            mapStateToProps: ["gist"],
        },
        {
            widgetName: "messageParser",
            widgetFunc: (props) => <MessageParser {...props} />,
            mapStateToProps: ["gist"],
        },
        {
            widgetName: "actionProviderDocs",
            widgetFunc: (props) => <ActionProviderDocs {...props} />,
            mapStateToProps: ["gist"],
        },
    ],
};

export default config;