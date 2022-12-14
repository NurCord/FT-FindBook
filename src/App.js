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
import {getAllBooks, getGenres, getYears, userFavo, userRole} from  './redux/actions/actions'
import SearchByCategory from './components/dumbComponents/SearchByCategory/SearchByCategory';
import SearchByReleased from './components/dumbComponents/SearchByReleased/SearchByReleased';
import AdminBooK from './componentsAdmin/DumbComponents/AdminBook/AdminBooK';
import AdminHome from './componentsAdmin/DumbComponents/AdminHome/AdminHome';
import AdminUser from './componentsAdmin/DumbComponents/AdminUser/AdminUser';
import Layout from './components/dumbComponents/Layout/Layout';
import LayoutAdmin from './componentsAdmin/DumbComponents/LayoutAdmin/LayoutAdmin';
import PanelUser from './panelUser/DumbComponents/PanelUser/PanelUser'
import UserHome from './panelUser/DumbComponents/UserHome/UserHome';
import loading from './assets/loading.gif';
import Payment from './components/dumbComponents/Shop/Payment';
import NoMatch from './components/dumbComponents/NoMatch/NoMatch.jsx';
import { getButtonStatus, userCart } from './redux/actions/actionsShop';
import PaymentSuccess from './components/dumbComponents/Shop/PaymentSuccess';
import DetailBook from './panelUser/DumbComponents/CardBook/DetailBook';
import Favorites from './components/dumbComponents/Favorites/Favorites';
import OrderDetail from './panelUser/DumbComponents/UserOrders/OrderDetail';
import OrderDetailAdmin from './componentsAdmin/DumbComponents/OrdersList/OrderDetailAdmin'
import SaleDetail from './panelUser/DumbComponents/UserOrders/SaleDetail';
import About from './components/dumbComponents/About/About';
import VideoPlayer from './components/smartComponents/VideoPlayer/VideoPlayer';

function App() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getGenres())
    dispatch(getYears())
    dispatch(userRole(window.localStorage.getItem('token')))
    dispatch(userCart())
    dispatch(userFavo())
    dispatch(getButtonStatus())
  }, [dispatch])
  let role = useSelector(state=>state.root.role)
  const [HomeAdmin, SetHomeAdmin] = useState('Users')
  const [HomeUser, SetHomeUser] = useState('User')
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
          <Route path='favorites' element={<Favorites/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='postbook' element={<CreatePost/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='contacto' element={<Contact/>}/>          
          <Route path='contacto/agradecimiento' element={<ThanksPage/>}/>
          <Route path='busqueda/:name' element={<SearchByName/>}/>
          <Route path='categoria/:genre' element={<SearchByCategory/>}/>
          <Route path='released/:date' element={<SearchByReleased/>}/>          
        </Route>

        <Route>
          <Route path='video' element={<VideoPlayer/>}/>
          <Route path='payment' element={<Payment/>}/>
          <Route path='payment/success/:session_id' element={<PaymentSuccess/>} />
        </Route>
        
        {role === 'user'?<Route path='/paneluser/' element={<PanelUser SetHomeUser={SetHomeUser} />}>
          <Route path='' element={<UserHome HomeUser={HomeUser} />}/>
          <Route path='book/:id' element={<DetailBook/>}/>
          <Route path='detail/:id' element={<OrderDetail/>}/>
          <Route path='detailsale/:id/:libroid' element={<SaleDetail/>}/> 
        </Route>:<Route path='/paneluser/*' element={<div className = 'grid h-screen text-center place-content-center text-7xl'><h1 >INICIA SESION</h1><br></br><h1>PARA ACCEDER A</h1><br></br><h1>ESTE PATH</h1></div>}/>}

        {role === 'admin'?<Route path='/layoutAdmin/' element={<LayoutAdmin SetHomeAdmin={SetHomeAdmin} />}>
          <Route path='' element={<AdminHome HomeAdmin={HomeAdmin} />}/>
          <Route path='book/:id' element={<AdminBooK/>}/> 
          <Route path='user/:id' element={<AdminUser/>}/>
          <Route path='detail/:id' element={<OrderDetailAdmin/>}/> 
        </Route>:<Route path='/layoutAdmin/*' element={<div className = 'grid h-screen text-center place-content-center text-7xl'><h1 >NO TIENES PERMISOS</h1><br></br><h1>PARA ACCEDER A</h1><br></br><h1>ESTE PATH</h1></div>}/>}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
