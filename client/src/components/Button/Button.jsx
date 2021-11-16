import React from 'react';
import './button.css';
import '../../index.css';
const Button = props => {

    return (
        <button
            className={`btn`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <span className="btn__txt">{props.children}</span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`bx-tada`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

export default Button