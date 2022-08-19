import React from 'react';

const MessageParser = ({ children, actions }) => {
   const parse = (message) => {
      if (message === '0') return actions.handleGoodBye();  
      if (message.length > 1) return actions.handleHello(message);
      return actions.handleQuestion(message.split(' ')[0]);
   }

   return (
      <div>
         {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
               parse: parse,
               actions,
            });
         })}
      </div>
   );
};

export default MessageParser;