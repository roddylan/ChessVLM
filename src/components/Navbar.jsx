import './Navbar.css'
import logoWhiteTransparent from '/ChessVLM/logo-white-transparent.svg'

function Navbar() {
    return (
        <nav id="main-nav">
            <span id="nav-title">
                <img src={ logoWhiteTransparent } alt="logo" id='logo' />
                <h3>CHESSvLM</h3>
            </span>
            <ul>
                <li><a href="#" className='nav-btn'>Source</a></li>
                <li><a href="#" className='nav-btn'>Guide</a></li>
            </ul>
        </nav>
    )
}

export default Navbar