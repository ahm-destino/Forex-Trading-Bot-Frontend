import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import SideBar from '../component/side-bar';
import Header from '../component/header';
import '../assets/css/dashboard.css'


export default function InnerLayout(){

    const[menuToggle, setMenuToggle] = useState(false)


    function toggleMenu(){
        setMenuToggle(!menuToggle)
    }
    function closeMenu() {
        setMenuToggle(false)
    }


    return(
        <div className='innerlayout'>
            <Header toggleMenu={toggleMenu} />
            <SideBar  openMenu={menuToggle} closeMenu={closeMenu} />
            <Outlet />
        </div>
        

    )
}