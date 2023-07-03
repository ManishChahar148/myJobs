import React, { Component } from 'react';
import './Button.scss';
import { motion } from 'framer-motion';

class Button extends Component {
    render() {

        const {
            label,
            cursor,
            onClick,
            type,
            style,
        } = this.props;

        return (
            <motion.button
            whileTap={{
                scale: 0.8,
                // rotate: -90,
                // borderRadius: "100÷%"
              }}
                className='buttonComponent'
                style={{
                    ...style,
                    cursor: cursor,
                }}
                onClick={onClick}
                type={type}
            >
                {label}
            </motion.button>
        )
    }
}

export default Button;
