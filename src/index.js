import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            previousSquares: Array(9).fill(null),
            xIsNext: true,
            allowResetMove: false,
            resetMoveSecondsLeft: 3,
            numOfMoves: 0,
            intervalId: null,
        };
    }

    renderSquare(i) {
        return (
            <Square
                value = {this.state.squares[i]}
                onClick = {() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (squares[i] || calculateWinner(squares)){
            return;
        }

        this.stopTimer();
        const previousSquares = squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            previousSquares: previousSquares,
            xIsNext: !this.state.xIsNext,
            allowResetMove: true,
            resetMoveSecondsLeft: 3,
            numOfMoves: this.state.numOfMoves + 1,
        });

        this.startTimer();
    }

    handleResetMove() {
        this.stopTimer();
        this.setState({
            squares: this.state.previousSquares,
            xIsNext: !this.state.xIsNext,
            allowResetMove: false,
            resetMoveSecondsLeft: 0,
            numOfMoves: this.state.numOfMoves - 1,
        })
    }

    startTimer() {
        let intervalId = setInterval(() => {
            if(this.state.resetMoveSecondsLeft > 1){
                this.setState({resetMoveSecondsLeft: this.state.resetMoveSecondsLeft - 1})
            }  else {
                this.stopTimer();
            }
        }, 1000)

        this.setState({intervalId: intervalId});
    }

    stopTimer() {
        clearInterval(this.state.intervalId)
        this.setState({intervalId: null})
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render () {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            this.state.intervalId = null;
            this.state.allowResetMove = false;
            clearInterval(this.state.intervalId)
        } else {
            if (this.state.numOfMoves !== 9){
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            } else {
                this.state.intervalId = null;
                this.state.allowResetMove = false;
                clearInterval(this.state.intervalId)
                status = 'Draw.';
            }
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>

                <div>
                    <button
                        disabled={!this.state.allowResetMove || this.state.resetMoveSecondsLeft === 0}
                        onClick={() => {this.handleResetMove()}}>
                        RESET MOVE
                    </button>
                    {this.state.intervalId ? this.state.resetMoveSecondsLeft : ''}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render () {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* STATUS */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
            }
}


ReactDOM.render(
    <Game />,
  document.getElementById('root')
);

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
