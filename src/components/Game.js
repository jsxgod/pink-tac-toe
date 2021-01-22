import React from 'react'
import { Home, Board } from '../components'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Game = () => {
    return (
        <Router>
            <Route path="/" exact component={ Home } />
            <Route path="/game" component={ Board } />
        </Router>
        );
}

export default Game
