import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from "chess.js";
// import { WebSocket } from "vite";

export default function Board(props) {
    const [game, setGame] = useState(new Chess());
    const [moveFrom, setMoveFrom] = useState("");
    // const [socket, setSocket] = useState(new WebSocket("ws://"))
    
    // const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [moveTo, setMoveTo] = useState(null);

    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});

    // function playLLM() {
    //     fen = game.fen();
        

    // }


    function safeGameMutate(modify) {
        setGame(g => {
            const update = {
                ...g
            };
            modify(update);
            return update;
        });
    }

    function getMoveOptions(square) {
        const moves = game.moves({
            square, 
            verbose: true
        });
        
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares = {};
        moves.map(move => {
            newSquares[move.to] = {
                background: game.get(move.to) && game.get(move.to).color !== game.get(square).color ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%"
            };
            return move;
        });

        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)"
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onPieceDragBegin(piece, square) {
        setRightClickedSquares({});
        

        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) {
                setMoveFrom(square);
            }
            return;
        }
    }

    function onPieceDragEnd(piece, square) {
        // setOptionSquares({});
        return;
    }
    // function makeRandomMove() {
    //     // TODO: change to get move from llm

    //     const possibleMoves = game.moves();

    //     // end if over
    //     if (game.isGameOver() || game.isStalemate() || possibleMoves.length === 0) return;

    //     const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    //     safeGameMutate(game => {
    //         game.move(possibleMoves[randomIndex]);
    //     });
    // }

    function onSquareClick(square) {
        console.log(props.apiKey)
        setRightClickedSquares({});
        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) {
                setMoveFrom(square);
            }
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true
            });
            const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

            // invalid
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setmovefrom, ow clear
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid
            setMoveTo(square);

            if (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8" || 
                foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1") {
                setShowPromotionDialog(true);
                return;
            }

            // normal move
            const gameCopy = new Chess(game.fen());

            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q"
            });

            // invalid -> setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }
            setGame(gameCopy);
            // setTimeout(() => {
            //     makeRandomMove 
            //     // TODO: replace with llm, probably separate this function
            // }, 300);
            setMoveTo(null)
            setOptionSquares({});
            return;
        }
    }
    
    function onPromotionPieceSelect(piece) {
        // no piece passed -> cancel dialog; reset
        if (piece) {
            // const gameCopy = {
            //     ...game
            // };
            const gameCopy = new Chess(game.fen());

            gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q"
            });
            setGame(gameCopy);
            // setTimeout(makeRandomMove, 300);
        }
        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    function onSquareRightClick(square) {
        const color = "rgb(0, 0, 255, 0.4)";
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]: rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === color ? undefined : {
                backgroundColor: color
            }
        });
    }

    return (
        <>
        <Chessboard id="cvl-board" 
        customSquareStyles={{
            ...moveSquares,
            ...optionSquares,
            ...rightClickedSquares
        }}
        promotionToSquare={moveTo}
        showPromotionDialog={showPromotionDialog}
        animationDuration={200}
        // arePiecesDraggable={true}
        arePiecesDraggable={false}
        position={game.fen()}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPromotionPieceSelect={onPromotionPieceSelect}
        // onSquareDrag={onSquareDrag}
        onPieceDragBegin={onPieceDragBegin}
        />
        
        </>
    )
}

