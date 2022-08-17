import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Detail from './components/dumbComponents/Detail/Detail';
import Shop from './components/dumbComponents/Shop/Shop';
import Login from './components/smartComponents/Login/Login';
import Contact from './components/smartComponents/Contact/Contact';
import ThanksPage from './components/dumbComponents/ThanksPage/ThanksPage';
import SearchByName from './components/dumbComponents/SearchByName/SearchByName';
import Home from './components/dumbComponents/Home/Home';
import CreatePost from './components/smartComponents/CreatePost/CreatePost';
import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {getAllBooks, getGenres, getYears, userRole} from  './redux/actions/actions'
import SearchByCategory from './components/dumbComponents/SearchByCategory/SearchByCategory';
import SearchByReleased from './components/dumbComponents/SearchByReleased/SearchByReleased';
import AdminBooK from './componentsAdmin/DumbComponents/AdminBook/AdminBooK';
import AdminHome from './componentsAdmin/DumbComponents/AdminHome/AdminHome';
import AdminUser from './componentsAdmin/DumbComponents/AdminUser/AdminUser';
import Layout from './components/dumbComponents/Layout/Layout';
import LayoutAdmin from './componentsAdmin/DumbComponents/LayoutAdmin/LayoutAdmin';
import loading from './assets/loading.gif';
import Payment from './components/dumbComponents/Shop/Payment';
import NoMatch from './components/dumbComponents/NoMatch/NoMatch.jsx';
import { userCart } from './redux/actions/actionsShop';
import PaymentSuccess from './components/dumbComponents/Shop/PaymentSuccess';

function App() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getGenres())
    dispatch(getYears())
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(userCart())
  }, [dispatch])
  let role = useSelector(state=>state.root.role)
  const [HomeAdmin, SetHomeAdmin] = useState('Users')
  if(role === 'loading'){
    return(<div className='grid h-screen place-content-center'><img className='rounded-lg' src={loading} alt='Cargando' /></div>)
  }
  return (
    <div className='w-full h-full bg-greyBlack-100'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}/>
          <Route path='detail/:id' element={<Detail/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='postbook' element={<CreatePost/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='contacto' element={<Contact/>}/>
          <Route path='contacto/agradecimiento' element={<ThanksPage/>}/>
          <Route path='busqueda/:name' element={<SearchByName/>}/>
          <Route path='categoria/:genre' element={<SearchByCategory/>}/>
          <Route path='released/:date' element={<SearchByReleased/>}/>          
        </Route>
        <Route>
          <Route path='payment' element={<Payment/>}/>
          <Route path='payment/success/:session_id' element={<PaymentSuccess/>} />
        </Route>
        {role === 'admin'?<Route path='/layoutAdmin/' element={<LayoutAdmin SetHomeAdmin={SetHomeAdmin} />}>
          <Route path='' element={<AdminHome HomeAdmin={HomeAdmin} />}/>
          <Route path='book/:id' element={<AdminBooK/>}/> 
          <Route path='user/:id' element={<AdminUser/>}/>
        </Route>:<Route path='/layoutAdmin/*' element={<div className = 'grid h-screen place-content-center text-7xl text-center'><h1 >NO TIENES PERMISOS</h1><br></br><h1>PARA ACCEDER A</h1><br></br><h1>ESTE PATH</h1></div>}/>}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
