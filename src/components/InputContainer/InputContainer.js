import React from 'react';
import './InputContainer.css';

const InputContainer = ({ children, descriptions, title, bold }) => {
    return (
        <article className="InputContainer" style={{
            borderColor: bold ? '#666' : '#E4E4E4'
        }}>
            <header className="input-cont-header">
                <h3><strong>{title}</strong></h3>
            </header>
            {descriptions ?
                (() => {
                    let key = descriptions.lists.length;
                    return (
                    <div className="desc">
                        <strong className="desc-title">{descriptions.title}</strong>
                        <ul>
                        {descriptions.lists.map(description => {
                            return (<li key={key--}>{description}</li>)
                        })}
                        </ul>
                    </div>)
                })() : ''}
            {children}
        </article>
    );
};

export default InputContainer;