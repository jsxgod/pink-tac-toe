import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';

const Home = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <>
            <div className="container">
                <div className="login-container">
                    <div className="title-container">
                        <div className="emoji">❤️</div>
                        <div className="emoji-opposite">🎀</div>
                        <p className="title">Let's</p>
                        <p className="title">play</p>
                        <p className="title">PinkTacToe</p>
                    </div>
                    <div className="login-form">
                        <input className="login-input" placeholder="Name" type="text" maxLength="12" onChange={(event) => setName(event.target.value)} />
                        <input className="login-input mt-20" placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} />
                        
                        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/game?name=${name}&room=${room}`}>
                            <button className="login-button mt-20" type="submit">Join</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home