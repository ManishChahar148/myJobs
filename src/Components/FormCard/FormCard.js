import React, { Component } from 'react';
import './FormCard.scss';
import { motion } from "framer-motion"

class FormCard extends Component {
    render() {
        const {
            children,
            heading,
        } = this.props;
        return (
            <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className='formCardComponent'>
                <div className='formCardHeading'>
                    {heading}
                </div>
                {children}
            </motion.div>
        )
    }
}

export default FormCard;
