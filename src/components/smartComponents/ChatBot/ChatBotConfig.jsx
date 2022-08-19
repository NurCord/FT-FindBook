import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Overview from "./Overview";
import MessageParser from "./MessageParser";
import ActionProviderDocs from "./ActionProviderDocs";

// const config = {
//     initialMessages: [createChatBotMessage(`Hello world`)],
// };

// export default config;

const botName = "FindBookBot";

const config = {
    botName: botName,
    lang: "no",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    initialMessages: [
        createChatBotMessage(
            `Hola, yo soy ${botName}.
            Estoy aquí para guiarte en lo que necesites.
            Por favor indícame tu nombre para iniciar`
        ),
        // createChatBotMessage(
        //     "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
        //     {
        //         withAvatar: false,
        //         delay: 500,
        //         widget: "overview",
        //     }
        // ),
    ],
    state: {
        gist: "",
    },
    customComponents: {},
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