import React from 'react';

export default function Overview() {
    return (
        <ul>
          <li>1 - Buscar libro</li>
          <li>2 - Comprar libro</li>
          <li>3 - Vender libro</li>
          <li>4 - Panel de administración</li>
          <li>5 - Otra información</li>
          <li>0 - Gracias, es todo por ahora</li>
        </ul>
    )
}



/*
widgetName: The name to which you will refer to the widget when you call createChatBotMessage
widgetFunc: A function which returns the component you want to render. It needs to take in props and spread
the props out over the given component: (props) => <Component {...props} />
props: An array of props you want to pass to the component
mapStateToProps: An list of properties from configuration state property that you want this component to receive as props.

createChatBotMessage("Ok, one moment", { 
  widget: "overview"
})
*/