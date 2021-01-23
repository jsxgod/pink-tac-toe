import React, { useState, useEffect } from 'react';
import { Square, Footer } from '../components'
import queryString from 'query-string';

import io from 'socket.io-client';

const Board = ( { location } ) => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(false);
    const [piece, setPiece] = useState('❤️');
    const [room, setRoom] = useState('');
    const [opponent, setOpponent] = useState([]);
    const [message, setMessage] = useState('Waiting for other player...');
    const [gameEnd, setGameEnd] = useState(false);

    let socketID = null;
    const ENDPOINT = 'http://localhost:4000';

    useEffect(() => {
        socketID = io(ENDPOINT);

        const {name, room} = queryString.parse(location.search);
        console.log(name, room);

        return () => {
            socketID.off();
        }
    }, [ENDPOINT])



    const renderSquare = (i) => {
        return (
            <Square
                value = {squares[i]}
                onClick = {() => handleClick(i)}
            />
        );
    }

    const handleClick = (i) => {
        const currentSquares = squares.slice();

        if (!turn || currentSquares[i] || calculateWinner(currentSquares)){
            return;
        }

        const previousSquares = currentSquares.slice();
        currentSquares[i] = piece;

        setSquares(currentSquares);
        setTurn(false);
    }

    return (
        <div className="container">
            <div className="game">
                <div className="game-board">
                    <div className="status">{message}</div>
                    <div className="board">
                        <div className="board-row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board-row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board-row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="reset-button"
                        disabled={true}
                        onClick={() => null}>
                        </button>
                        <p className="timer">{'0'}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;