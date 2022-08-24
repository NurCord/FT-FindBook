import React, { useState } from 'react';
import { createClientMessage } from "react-chatbot-kit";
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
   const [showBot, toggleBot] = useState(true);
   const handleHello = async (m) => {
      const botMessage = await createChatBotMessage(`Hola ${m}. Es un placer atenderte.`);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botMessage],
      }));
      const questionMessage = await createChatBotMessage(`Por favor digita el número de la opción de cuya temática deseas asesoría`,
         {
            withAvatar: false,
            delay: 500,
            widget: "overview",
         }
      );

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, questionMessage],
      }));
   };

   const handleQuestionFalse = async () => {
      const botMessage = await createChatBotMessage('No has seleccionado ninguna opción válida');
         
         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
         }));

         const questionMessage = await createChatBotMessage(`Te dejo estas opciones que pueden ser de tu interés`,
            {
               withAvatar: false,
               delay: 500,
               widget: "overview",
            }
         )

         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, questionMessage],
         }));
   }

   const handleQuestion = async (m) => {
      const botquestion = await createClientMessage(m);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botquestion],
      }));

      let answerMessage = '';
      switch (m) {
         case '¿Cómo busco un libro?': //Buscar libro
            answerMessage = 'Seleccionaste "Buscar libro". Para ésto, puedes utilizar nuestra barra de búsqueda ubicada en la parte superior de la página';
            break;
         case '¿Cómo puedo comprar un libro?': //Comprar libro
            answerMessage = 'Seleccionaste "Comprar libro". Para comprar debes iniciar sesión, agregar al carrito el libro deseado y diligenciar la información requerida durante el proceso de pago';
            break;
         case '¿Cómo puedo vender un libro?': //Vender libro
            answerMessage = 'Seleccionaste "Vender libro". Para vender un libro debes iniciar sesión, ingresar al apartado "publicar" diligenciando la información solicitada y publicar tu libro';
            break;
         case '¿Qué puedo hacer en mi panel de administración?': //Panel de usuario
            answerMessage = 'Seleccionaste "Panel de administración". Puedes acceder a la información de tus compras / ventas / opciones en tu panel de usuario';
            break;
         case 'Necesito otro tipo de información': //Otra información
            answerMessage = 'Seleccionaste "Otra información". Para información más específica y detallada puedes contactar a un administrador en el apartado "Contacto" ubicado en la parte inferior de la página';
            break;
         default:
            answerMessage = 'No has seleccionado ninguna opción válida';
         } 
         const botMessage = await createChatBotMessage(answerMessage);
         
         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
         }));

         const questionMessage = await createChatBotMessage(`Te dejo estas opciones que pueden ser de tu interés`,
            {
               withAvatar: false,
               delay: 500,
               widget: "overview",
            }
         )

         await setState((prev) => ({
            ...prev,
            messages: [...prev.messages, questionMessage],
         }));
   };


   const handleGoodBye = async () => {
      const botMessage = await createChatBotMessage(`Gracias por utilizar nuestra app. Recuerda que siempre es un placer atenderte`);

      await setState((prev) => ({
         ...prev,
         messages: [...prev.messages, botMessage],
      }));
      setTimeout((() => toggleBot(false)), 2500); 
   };

  // Put the handleHello function in the actions object to pass to the MessageParser
   return (
      <div>
         {showBot && React.Children.map(children, (child) => {
            return React.cloneElement(child, {
               actions: {
                  handleHello,
                  handleQuestion,
                  handleGoodBye,
                  handleQuestionFalse
               },
            });
         })}
      </div>
   );
};

export default ActionProvider;