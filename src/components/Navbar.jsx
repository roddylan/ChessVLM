import './Navbar.css'

function Navbar() {
    return (
        <nav id="main-nav">
            <span id="nav-title">
                <img src="/ChessVLM/logo-white-transparent.svg" alt="logo" id='logo' />
                <h3>CHESSvLM</h3>
            </span>
            <ul>
                <li><a href="https://github.com/roddylan/ChessVLM" className='nav-btn'>Github</a></li>
                <li><a href="#" className='nav-btn'>Guide</a></li>
            </ul>
        </nav>
    )
}

export default Navbar