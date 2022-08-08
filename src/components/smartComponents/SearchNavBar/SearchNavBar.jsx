import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookByName } from '../../../redux/actions/actions';

export default function SearchNavBar() {
  const [name, setName] = useState('');
  const nameSearch = useSelector((s) => s.root.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBookByName(nameSearch))
  // }, [dispatch, nameSearch])

  function handleOnSubmit(e) {
    e.preventDefault();
    if (name === '') return;
    dispatch(getBookByName(name));
    navigate(`/busqueda/${name ? name : nameSearch}`);
    setName('');
  }

  function handleOnchange(e) {
    setName(e.target.value);
  }
  //prettier-ignore
  return (
    <form onSubmit={handleOnSubmit} className='flex rounded-full bg-cream-300'>
      <input type="text" value={name} onChange={(e) => handleOnchange(e)} className='rounded-full' />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
