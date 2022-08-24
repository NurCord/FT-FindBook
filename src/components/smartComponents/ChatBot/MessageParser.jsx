import React from 'react';

const messageParser = ({ children, actions}) => {
   let count = children.props.state.messages.filter(e => e.type !== 'bot')
   let mess = count[count.length-4]?.message
   console.log(mess);
   const parse = (message) => {
      if (count.length === 0) return actions.handleHello(message);
      return actions.handleQuestionFalse()
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

export default messageParser;