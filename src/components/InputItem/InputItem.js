import React from 'react';
import './InputItem.css';
import {input} from 'react-inputs-validation';

const InputItem = ({ children, display, name, label, must, placeholder, disabled, value, onChange }) => {
    const inputItemClass='InputItem'
    let inputItem = must ? `${inputItemClass} must` : inputItemClass;
    let color = disabled ? '#EDEDED' : 'white';
    let displaytype = display ? 'block' : 'none';
    return (
        <div className={inputItem}>
            <strong className="input-title">
                <label htmlFor={label}>
                    {name}
                </label>
            </strong>
            <div className="input-element" style={{display:displaytype}} >
                {children? children : <input 
                    id={label} 
                    placeholder={placeholder} 
                    disabled={disabled} 
                    style={{
                        backgroundColor: color
                    }}
                    value={value}
                    name={label}
                    onChange={onChange}
                />}
            </div>
        </div>
    );
};

export default InputItem;