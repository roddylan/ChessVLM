import { useState } from 'react'
import './GamePage.css'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import Board from './Board'
export default function GamePage() {
    return (
        <div className="page">
            <main id="gamepage">
                <div id="main-content">
                    <h1 className='main-content-title'>Chess Game</h1>
                </div>
                <div id="cvl-board-div" className='inactive'>
                    <Board />
                    {/* TODO: gray out when inactive */}
                    {/* <Chessboard id="cvl-board" /> */}
                    {/* <div className='cvl-board-overlay inactive'></div> */}
                </div>
            </main>
        </div>
    )
}