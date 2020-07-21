import React, { Fragment } from 'react';
import './ConfirmerRootList.css';
import { FaMapSigns } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const VisitNode = ({}) => {
    return (
        <button className="VisitNode">
            <div className="node-row">
                <div className="elem">
                    <FaMapSigns style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }}/>
                    <span className="key">도로명 주소</span>
                    <span className="val">경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)</span>
                </div>  
                </div>
                
            <div className="node-row-date">
                <div className="elem">
                <MdDateRange style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }}/>
                    <span className="key">방문 일자</span>
                    <span className="val">2020-05-17 13:05</span>
                </div>
            </div>
        </button>
    )
}

const ConfirmerRootList = ({}) => {
    return (
        <div className="ConfirmerRootList">
            <div id="comp-title">
                <span>방문 지점 정보</span>
            </div>
            <div className="body">
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
            </div>
        </div>
    )
}

export default ConfirmerRootList;