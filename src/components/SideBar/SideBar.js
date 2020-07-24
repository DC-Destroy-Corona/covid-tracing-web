import React, { Fragment } from 'react';
import './SideBar.css';
import {MdAccessTime} from 'react-icons/md'

const VisitNode = ({startTime, endTime, desc}) => {
    return (
        <button className="VisitNode">
            <div className="head">
                <div className="idx">
                    <span>1</span>
                </div>
                <div className="loc">수성구 상록로69</div>
            </div>
            <div className="body">
                <div className="elem">
                    <MdAccessTime style={{
                        marginTop: 1,
                        marginRight: 2,
                        float: 'left'
                    }}/>
                    <span className="key">최초</span>
                    <span className="val">2020-05-17 13:05</span>
                </div>
                <div className="elem">
                    <MdAccessTime style={{
                        marginTop: 1,
                        marginRight: 2,
                        float: 'left'
                    }}/>
                    <span className="key">최종</span>
                    <span className="val">2020-05-17 13:05</span>
                </div>
                <div className="elem">
                    <MdAccessTime style={{
                        marginTop: 1,
                        marginRight: 2,
                        float: 'left'
                    }}/>
                    <span className="key">누적</span>
                    <span className="val">2020-05-17 13:05</span>
                </div>
                <div className="total">
                    <div className="total-key">접촉자 수</div>
                    <div className="total-val">
                        <span id="bold">N/A</span></div>
                </div>
            </div>
        </button>
    )
}

const SideBar = ({toggle}) => {
    return (
        <div className="SideBar">
            <div id="comp-title">
                <span>동선 정보 <span id="bold">{`( 8 )`}</span></span>
            </div>
            <div className="body">
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                {/* <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/>
                <VisitNode/> */}
            </div>
        </div>
    )
}

export default SideBar;