import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetailPanel, getAllUsers, userRole, booksPanel } from '../../../redux/actions/actions'
import CardUser from '../CardUser/CardUser'
import CardBooks from '../CardBooks/CardBooks'
import NavHome from '../NavHome/NavHome'
import HomeAdmins from '../../SmartComponents/HomeAdmin/HomeAdmin'

function AdminHome({ HomeAdmin }) {
  const dispatch = useDispatch();
  const Books = useSelector(s => s.user.books)
  const users = useSelector(s => s.admin.allUsers)
  useEffect(() => {
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(getAllUsers(window.localStorage.getItem('token')))
    dispatch(booksPanel())
    dispatch(userDetailPanel())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(HomeAdmin === 'User'){
    return <HomeAdmins/>
  }
  else if(HomeAdmin === 'Users') {
    return (
      <div className='w-full h-auto'>
        <NavHome />
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          {
            users ? users.map((e, i) => <CardUser key={i} data={e} />) : <h2>No Hay Usuarios</h2>
          }
        </div>
      </div>
    )
  } else if (HomeAdmin === 'Books') {
    return (
      <div className='w-full h-auto'>
        <NavHome />
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          {
            Books?.map((b, i) => <CardBooks key={i} data={b} />)
          }
        </div>
      </div>
    )
  } else if (HomeAdmin === 'Cupones') {
    return (
      <div className='w-full h-full'>
        <NavHome />
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          <h1>Cupones</h1>
        </div>
      </div>
    )
  }else{
    return (
      <div className='w-full h-full'>
        <NavHome />
        <div className='grid grid-cols-4 gap-4 justify-items-center '>
          <h1>Historial</h1>
        </div>
      </div>
    )
  }
}

export default AdminHome