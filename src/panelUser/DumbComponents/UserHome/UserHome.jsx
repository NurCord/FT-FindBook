import React from 'react'

function UserHome({ HomeUser }) {
  if (HomeUser === 'User') {
    return (
      <div className='w-full h-auto'>
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          <h1>Usuario</h1>
        </div>
      </div>
    )
  } else if (HomeUser === 'Books') {
    return (
      <div className='w-full h-auto'>
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          <h1>Libros</h1>
        </div>
      </div>
    )
  } else if (HomeUser === 'Historial') {
    return (
      <div className='w-full h-auto'>
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          <h1>Historial</h1>
        </div>
      </div>
    )
  }
}

export default UserHome