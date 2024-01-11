
import { Avatar, Dropdown, Navbar,DarkThemeToggle } from 'flowbite-react';
import { useEffect, useState,useContext } from 'react';
import LoginComponent from './LoginComponent';
import AuthContext from '../context/AuthContext';
import {Link} from "react-router-dom"

function CustomLink(props){
  return (
    <Link to={props.href} className='block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white'>{props.children}</Link>

  )

}

export default function CustomNavbar(props) {
    // const [isLoggedIn,setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")))
    const authContext = useContext(AuthContext)

    useEffect(()=>{
        if (localStorage.getItem("token")){
          authContext.setIsLoggedIn(true)
        }
    },[])



    const logout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("data")
      authContext.setIsLoggedIn(false)
    }

  return (
    <Navbar fluid>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Awesome Ticket Booker</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!authContext.isLoggedIn ? 
          <LoginComponent /> :
        
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{authContext.userData.username }</span>
            <span className="block truncate text-sm font-medium">{authContext.userData.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>My Tickets</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
          <Dropdown.Item><DarkThemeToggle /> Toggle Theme</Dropdown.Item>
          
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <CustomLink href="/" >Home</CustomLink>
        <CustomLink href="/about">About Us</CustomLink>
        <CustomLink href="/contact" >Contact</CustomLink>
        <CustomLink href="/profile" >Profile</CustomLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
