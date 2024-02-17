import React,{useState,useContext} from 'react'
import { ListGroup } from 'flowbite-react';
import NavContext from '../../context/NavContext';


function SideNav() {
    const navContext = useContext(NavContext)
    const [activeKey, setActiveKey] = useState('addmovie');
    const handleSideNavClick = (section) => {
        setActiveKey(section);
        navContext.setCurrentSection(section)
    };

  return (
    <>
    <div className="">
      <ListGroup className="md:w-48 w-full dark:bg-transparent dark:text-slate-500">
        <ListGroup.Item
        href="#addmovie"
        active={activeKey == "addmovie"}
        onClick={()=>handleSideNavClick("addmovie")}
        >
          Add Movie
        </ListGroup.Item>
        
        <ListGroup.Item
        href="#movietimings"
        active={activeKey == "addtimings"}
        onClick={()=>handleSideNavClick("addtimings")}
        >
          Movie Timings
        </ListGroup.Item>

        <ListGroup.Item
        href="#addhall"
        active={activeKey == "addhall"}
        onClick={()=>handleSideNavClick("addhall")}
        >
            Add Halls
        </ListGroup.Item>
        <ListGroup.Item
        href="#addbranch"
        active={activeKey == "addbranch"}
        onClick={()=>handleSideNavClick("addbranch")}
        >
            Add Branches
        </ListGroup.Item>
        <ListGroup.Item href="#">Tickets</ListGroup.Item>
      </ListGroup>
    </div>
    </>
  )
}

export default SideNav