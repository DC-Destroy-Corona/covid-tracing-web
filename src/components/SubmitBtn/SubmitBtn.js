import React from 'react';
import './SubmitBtn.css';
import { MdDone } from 'react-icons/md';

const SubmitBtn = ({ disabled, onClick, context }) => {
    let Cursor = disabled ? 'not-allowed' : 'pointer';

    return (
        <div className="SubmitBtn" >
            <button className="inner"
            style={{
                cursor :Cursor
            }} 
            disabled= {disabled}
            onClick={onClick}>
                <div className="ico">
                    <MdDone size={14} />
                </div>
                <span>{context}</span>
            </button>
        </div>
    );
};

export default SubmitBtn;