import React from 'react';
import './SubmitBtn.css';
import { MdDone } from 'react-icons/md';

const SubmitBtn = ({ onClick, context }) => {
    return (
        <div className="SubmitBtn">
            <button className="inner" onClick={onClick}>
                <div className="ico">
                    <MdDone size={14} />
                </div>
                <span>{context}</span>
            </button>
        </div>
    );
};

export default SubmitBtn;