import './GamePage.css'
import { Chessboard } from 'react-chessboard'


export default function GamePage() {
    return (
        <div className="page">
            <main id="gamepage">
                <div id="main-content">
                    <h1 className='main-content-title'>TEST</h1>
                </div>
                <div id="cvl-board-div" className='inactive'>
                    <Chessboard id="cvl-board" />
                </div>
            </main>
        </div>
    )
}