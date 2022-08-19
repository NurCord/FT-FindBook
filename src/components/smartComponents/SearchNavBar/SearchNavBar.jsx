import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBookByName } from '../../../redux/actions/actions';
import clsx from 'clsx'
export default function SearchNavBar() {
  const [name, setName] = useState('');
  const nameSearch = useSelector((s) => s.root.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <>
      <form onSubmit={handleOnSubmit} className={clsx(
        'mobile:flex mobile:rounded-full mobile:bg-cream-300',
        'desktop:flex desktop:rounded-full')}>
        <input type="text" value={name} onChange={(e) => handleOnchange(e)} className={clsx(
          'mobile:w-72 mobile:h-10 mobile:rounded-full mobile:self-center',
          'rounded-full'
          )} />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" className={clsx('mobile:mx-2 mobile:rounded-full',"w-6 h-6 mx-3 rounded-full")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </>
  )
}
