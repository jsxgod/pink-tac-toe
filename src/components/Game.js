import React from 'react'
import { Board, Footer } from '../components'

const Game = () => {
    return (
            <div className="container">
                <div className="game">
                    <Board />
                </div>

                <Footer />
            </div>
        );
}

export default Game
