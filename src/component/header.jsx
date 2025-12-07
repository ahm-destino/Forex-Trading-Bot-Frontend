import menuIcon from '../assets/images/menu.png'

export default function Header({toggleMenu}) {
    return (
        <header>
            <img src={menuIcon} alt="" onClick={toggleMenu}/>
        </header>
    )
    
}
