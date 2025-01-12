import React from 'react';
import '../style/Navbar.css';
import mapuplogo from '../assets/mapup-logo.png'

const Navbar = () => {
  return (
    <div className='Parent-nav'>
         <img src={mapuplogo} className='logo' alt='logo'/>
    </div>
  )
}

export default Navbar