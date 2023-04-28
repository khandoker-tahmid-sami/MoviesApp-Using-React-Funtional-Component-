import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='customNavbar'>
        <NavLink to="/" className='navLink'>Home</NavLink>
        <NavLink to="/customers" className='navLink'>Customers</NavLink>
        <NavLink to="/login" className='navLink'>Login</NavLink>
        <NavLink to="/registration" className='navLink'>Registration</NavLink>
    </nav>
  )
}

export default Navbar