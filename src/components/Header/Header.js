import React, { Fragment } from 'react';
import './Header.css';
import govLogo from 'resources/img-gov-logo.png'
import {MdAccountCircle, MdAutorenew} from 'react-icons/md'

const Header = () => {

    return (
        <div className="Header">
            <div className="logo">
                <img src={govLogo} draggable="false"/>
            </div>
            <div className="title">
                <span>IDT (Infectious Diseases Tracer)</span>
            </div>
            <button>
                <MdAccountCircle size={26} style={{
                    margin: '0 auto',
                    display: 'block'
                }}/>
            </button>
        </div>
    )
}

export default Header;