import closeIcon from '../assets/images/icons8-close-window-50.png'
import logoutIcon from '../assets/images/icons8-logout-rounded-50.png'
import { useState } from 'react'


export default function SideBar({openMenu, closeMenu}) {

    const [isMenuClose, setIsMenuClose] = useState(true)
    
    function toggleVisibility(){
        if (openMenu && isMenuClose){
            return {display: 'block'}
        }
        else{
            return {display: 'none'}
        }
    }
  return (
    
    <div className="side-bar"  style={toggleVisibility()}>
        <img className="close-icon" src={closeIcon} onClick={closeMenu} />
            <ul>
                <li>Home </li>
                <li>   Profile </li>
                <li> Logout <img src={logoutIcon} alt=""/> </li>
            </ul>
    </div>
    )
}