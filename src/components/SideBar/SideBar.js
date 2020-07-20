import React, { Fragment } from 'react';
import './SideBar.css';
import {MdAccessTime} from 'react-icons/md'

const VisitNode = ({node, type, idx}) => {
    return (
        <button className="VisitNode">
            <div className="head">
                <div className="idx">
                    <span>{idx+1}</span>
                </div>
                <div className="loc">{node.get('location')}</div>
            </div>
            <div className="body">
                {
                    type===2 ?
                    <Fragment>
                        <div className="elem">
                            <MdAccessTime style={{
                                marginTop: 1,
                                marginRight: 2,
                                float: 'left'
                            }}/>
                            <span className="key">최초</span>
                            <span className="val">{node.get('firstDateTime')}</span>
                        </div>
                        <div className="elem">
                            <MdAccessTime style={{
                                marginTop: 1,
                                marginRight: 2,
                                float: 'left'
                            }}/>
                            <span className="key">최종</span>
                            <span className="val">{node.get('lastDateTime')}</span>
                        </div>
                        <div className="elem">
                            <MdAccessTime style={{
                                marginTop: 1,
                                marginRight: 2,
                                float: 'left'
                            }}/>
                            <span className="key">누적</span>
                            <span className="val">{}</span>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="elem">
                            <MdAccessTime style={{
                                marginTop: 1,
                                marginRight: 2,
                                float: 'left'
                            }}/>
                            <span className="key">최초</span>
                            <span className="val">{node.get('dateTime')}</span>
                        </div>
                    </Fragment>
                }
                <div className="total">
                    <div className="total-key">접촉자 수</div>
                    <div className="total-val">
                    <span id="bold">{node.get('cntctPatientNum')}</span></div>
                </div>
            </div>
        </button>
    )
}

const SideBar = ({mainPerson}) => {
    let movingInfo = mainPerson.get('movingInfo')
    return (
        <div className="SideBar">
            <div id="comp-title">
                <span>동선 정보 <span id="bold">( {movingInfo.size} )</span></span>
            </div>
            <div className="body">
                {movingInfo.map((elem,idx)=>{
                    console.log(elem)
                    return(<VisitNode key={idx} node={elem} type={mainPerson.get('type')} idx={idx}/>)
                })}
            </div>
        </div>
    )
}

export default SideBar;