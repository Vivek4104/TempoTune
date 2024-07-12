import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album"); // Use "includes" instead of "include"
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgcolor = isAlbum ? albumsData[Number(albumId)].bgColor : null; // Add a check for isAlbum to prevent error when accessing bgColor
  useEffect(() => {
    if (bgcolor) { // Add a check for whether the bgcolor is available
      displayRef.current.style.background = `linear-gradient(${bgcolor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [bgcolor]); // Specify bgcolor as a dependency for the useEffect hook
  return (
    <div ref={displayRef} className='w-[100%] m-2 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
