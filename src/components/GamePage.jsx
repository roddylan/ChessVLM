// import { useState } from 'react'
import './GamePage.css'
// import { Chessboard } from 'react-chessboard'
// import { Chess } from 'chess.js'
import Board from './Board'



export default function GamePage() {
    // const [api, setAPI] = useState("");
    // const APIForm = () => {
    //     const handleSubmit = (ev) => {
    //         ev.preventDefault();
    //     }
    
    //     return (
    //         <form onSubmit={handleSubmit}>
    //             <label>Enter Gemini API:
    //                 <input
    //                     type='text'
    //                     value={api}
    //                     onChange={(e) => setAPI(e.target.value)}
    //                 />
    //             </label>
    //             <input type="submit"/>
    //         </form>
    //     )
    // }
    const api = "";
    

    return (
        <div className="page">
            <main id="gamepage">
                <div id="main-content">
                    <h1 className='main-content-title'>Chess Game</h1>
                    <div id="logbox">
                        <ul id="logbox-ul">
                        </ul>
                    </div>
                    {/* <APIForm /> */}
                </div>
                <div id="cvl-board-div" className='inactive'>
                    <Board apiKey={api} />
                    {/* TODO: gray out when inactive */}
                    {/* <Chessboard id="cvl-board" /> */}
                    {/* <div className='cvl-board-overlay inactive'></div> */}
                </div>
            </main>
        </div>
    )
}