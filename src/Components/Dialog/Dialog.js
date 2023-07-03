import React, { Component } from 'react';
import './Dialog.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Dialog extends Component {
    render() {
        const {
            dialogTitle,
            children,
            isOpen,
            closeDialog,
        } = this.props
        return (
            <>
            {isOpen ?
                <div className='dialogComponent'>
                    <div className='dialogContainer'>
                        <div className='dialogHeader'>
                            <div className='dialogTitle'>{dialogTitle}</div>
                            <div className='dialogCloseBtn' onClick={closeDialog}>
                                <FontAwesomeIcon icon={faTimes} className='fa-lg'/>
                            </div>
                        </div>
                        <hr/>
                        {children}
                    </div>
                </div>
                : 
                null
            }
            </>
        )
    }
}

export default Dialog;
