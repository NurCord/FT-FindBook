import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

export default function SearchBar() {
  const [name, setName] = useState('');
  //const nameSearch = useSelector();
  //const dispatch = useDispatch();


  function handleOnSubmit(e) {
    e.preventDefault();
    if (name === '') return;
    console.log(name);
    setName('');
  }

  function handleOnchange(e) {
    setName(e.target.value);
  }
  //prettier-ignore
  
  return (
    <form onSubmit={handleOnSubmit} className='flex w-64 rounded-full bg-cream-300'>
      <input type="text" value={name} onChange={(e) => handleOnchange(e)} className='rounded-full' />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}