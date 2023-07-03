import React, { Component } from 'react';
import APP_ROUTES from '../../Routes/appRoutes';
import './TextInput.scss';

export class TextInput extends Component {
    
    render() {

        const {
            label,
            placeholder,
            errorMessage,
            type,
            autoFocus,
            questionAlongLabel,
            history,
            textarea,
            onChange,
            shouldHideErrorMessage,
            value,
            isMandatory,
        } = this.props;

        return (
            <div className='textInputComponent'>
                <div className='textInputLabel'>
                    <div>{label}{isMandatory && <span className='redAsterisk'>*</span>}</div>
                    <div
                        className='rightSideOptionTextInput'
                        onClick={() => {history && history.push(APP_ROUTES.PUBLIC.ROUTES.FORGOT_PASSWORD)}}
                    >

                        {questionAlongLabel}
                    </div>
                </div>
                {textarea ?
                    <textarea
                        value={value}
                        className='textInputField'
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        style={{
                            borderColor: errorMessage ? '#FF333380' : ''
                        }}
                        rows={4}
                        onChange={onChange}
                    ></textarea>
                    :
                    <input
                        value={value}
                        className='textInputField'
                        type={type || 'text'}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        onChange={onChange}
                        style={{
                            borderColor: errorMessage ? '#FF333380' : ''
                        }}
                    ></input>
                }
                {!shouldHideErrorMessage && <div className='textInputError'>{errorMessage}</div>}
            </div>
        )
    }
}

export default TextInput;
