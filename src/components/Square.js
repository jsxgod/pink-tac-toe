import React from 'react'

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value ? <p>{props.value}</p>: <p> </p>}
        </button>
    );
}

export default Square
