
import { Avatar, Dropdown, Navbar,DarkThemeToggle,NavbarLink } from 'flowbite-react';
import { useEffect, useState,useContext } from 'react';
import LoginComponent from './LoginComponent';
import AuthContext from '../context/AuthContext';
import {Link} from "react-router-dom"
import ShowAlert from './Alert';
import { apiurl } from './apiurl';



export default function CustomNavbar(props) {
    const authContext = useContext(AuthContext)

    useEffect(()=>{
      window.addEventListener("beforeunload",()=>{
        const sessionBasedLogin = localStorage.getItem("sessionBasedLogin")
        if (sessionBasedLogin == null || sessionBasedLogin=='1'){
          logout()
        }
      })
    },[])
    useEffect(()=>{
      const token = localStorage.getItem("token") 
        if (token){
          fetch(apiurl+"/login/validatelogin",{
            method:"GET",
            headers:{Authorization:"Bearer "+token}
          })
          .then(resp=>resp.json())
          .then(data=>{
            if (data.status == "ok"){
              authContext.setIsLoggedIn(true)
              localStorage.setItem("data",JSON.stringify(data.data))
            }
          })
          .catch(err=>console.log("error: Invalid login token",err))
        }
    },[])



    const logout = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("data")
      localStorage.removeItem("sessionBasedLogin")
      authContext.setIsLoggedIn(false)
    } 

  return (
    <>
    <Navbar fluid className='dark:bg-black border-b-[1px] border-solid'>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Awesome Ticket Booker</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!authContext.isLoggedIn ? 
          <LoginComponent /> :
        
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://cdn-icons-png.flaticon.com/512/149/149071.png" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{authContext.userData.username }</span>
            <span className="block truncate text-sm font-medium">{authContext.userData.email}</span>
          </Dropdown.Header>
          {authContext.userData && authContext.userData.usertype == "admin"?
          <Dropdown.Item as={Link} to="/admin-panel">
            Dashboard
          </Dropdown.Item>:""
          }
          <Dropdown.Item as={Link} to="/tickets">
            My tickets
          </Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item><DarkThemeToggle /> Toggle Theme</Dropdown.Item>
          
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavbarLink>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/about">About Us</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/about">Contact Us</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/about">Profile</Link>
        </NavbarLink>
      </Navbar.Collapse>
    </Navbar>
    <ShowAlert/>
    </>
  );
}
