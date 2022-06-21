import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { StyledNavBar } from './styles/NavBar.styled';
import logo from '../photos/logo.png'

const NavBar = () => {
  return (
    <StyledNavBar>
      <ul>
        <li>
        <NavLink to='/' exact={true} className='logo'><img alt='logo' src={logo} /></NavLink>
        </li>
        <li>
          <NavLink to='/employees/new' exact={true}>New Employee</NavLink>
        </li>
        <li>
          <NavLink to='/schedules/new' exact={true}>New Schedule</NavLink>
        </li>
        {/* <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton />
        </li> */}
      </ul>
    </StyledNavBar>
  );
}

export default NavBar;
