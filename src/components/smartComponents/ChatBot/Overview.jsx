import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
export default function Overview({actions}) {
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    border: '1px solid #c7c7c7',
    borderRadius:'10px',
  };
  
  const handleOnClick = (m)=>{
    switch (m) {
      case 'Buscar Libro':
        return actions.handleQuestion('¿Cómo busco un libro?')
        //break;
      case 'Comprar libro':
        return actions.handleQuestion('¿Cómo puedo comprar un libro?')
        //break;
      case 'Vender libro':
        return actions.handleQuestion('¿Cómo puedo vender un libro?')
        //break;
      case 'Panel de administración':
        return actions.handleQuestion('¿Qué puedo hacer en mi panel de administración?')
        //break;
        case 'Otra información':
          return actions.handleQuestion('Necesito otro tipo de información')
        //break;
      default:
        return actions.handleGoodBye()
    }
  }

  return (
    <List sx={style}  component="nav">
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Buscar Libro')}>
        <h1 className='text-sm font-semibold'>Buscar Libro</h1>
      </ListItem>
      <Divider />
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Comprar libro')}>
        <h1 className='text-sm font-semibold'>Comprar libro</h1>
      </ListItem>
      <Divider />
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Vender libro')}>
        <h1 className='text-sm font-semibold'>Vender libro</h1>
      </ListItem>
      <Divider />
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Panel de administración')}>
        <h1 className='text-sm font-semibold'>Panel de administración</h1>
      </ListItem>
      <Divider />
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Otra información')}>
        <h1 className='text-sm font-semibold'>Otra información</h1>
      </ListItem>
      <Divider />
      <ListItem button sx={{fontSize: 12}} onClick={()=>handleOnClick('Gracias, es todo por ahora')}>
        <h1 className='text-sm font-semibold'>Gracias, es todo por ahora</h1>
      </ListItem>
    </List>
  );
}