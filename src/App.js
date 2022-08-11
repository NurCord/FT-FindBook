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
import { useDispatch } from 'react-redux';
import {getAllBooks, getGenres, getYears} from  './redux/actions/actions'
import SearchByCategory from './components/dumbComponents/SearchByCategory/SearchByCategory';
import SearchByReleased from './components/dumbComponents/SearchByReleased/SearchByReleased';
import AdminBooK from './componentsAdmin/DumbComponents/AdminBook/AdminBooK';
import AdminHome from './componentsAdmin/DumbComponents/AdminHome/AdminHome';
import AdminUser from './componentsAdmin/DumbComponents/AdminUser/AdminUser';
import Layout from './components/dumbComponents/Layout/Layout';
import LayoutAdmin from './componentsAdmin/DumbComponents/LayoutAdmin/LayoutAdmin';

function App() {
  let dispatch = useDispatch()
  useEffect(() => async()=> {
    dispatch(getAllBooks())
    dispatch(getGenres())
    dispatch(getYears())
  }, [dispatch])

  const [HomeAdmin, SetHomeAdmin] = useState('Users')

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
        <Route path='/layoutAdmin/' element={<LayoutAdmin SetHomeAdmin={SetHomeAdmin} />}>
          <Route path='' element={<AdminHome HomeAdmin={HomeAdmin} />}/>
          <Route path='book/:id' element={<AdminBooK/>}/> 
          <Route path='user/:id' element={<AdminUser/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
