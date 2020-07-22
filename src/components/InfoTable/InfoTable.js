import React, { Fragment } from 'react';
import './InfoTable.css';
import {MdDescription, MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md'

const InfoTable = ({
    chListPage,
    isHide,
}) => 
    {
    return (
        <div className="InfoTable">
            <header>
                <button onClick={chListPage}>
                    <MdKeyboardArrowUp size={25}/>
                </button>
                <span>12번 확진자 상세 정보</span>
            </header>
            <div className="InfoTable-body">
                <div>

                </div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default InfoTable;
