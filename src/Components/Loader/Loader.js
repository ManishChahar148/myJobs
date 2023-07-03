import React, { Component } from 'react';
import './Loader.scss';
import ReactDOM from 'react-dom';

class Loader extends Component {
    render() {
        const {
            isLoading,
            loaderMessage,
        } = this.props;
        return (
            ReactDOM.createPortal(
            <>
            {isLoading ?
                <div className="LoaderComponent">
                    <div className='loaderWrapper'>
                        <div className='loaderContainer'>
                            <div className="loaderAnimation">Loading...</div>
                            <div className='loadingText'>
                                {loaderMessage || 'Loading please wait...'}
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
            }
            </>, document.getElementById('loaderPortal'))
        );
    }
};

export default Loader;