import React, { Fragment } from 'react';
import './SideBar.css';
import {
    MdAccessTime,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md'

const VisitNodeFold = ({idx,chCenter, node, nodeSelect}) => {
    return(
        <button className="VisitNodeFold" onClick={
            ()=>{
                chCenter(node, idx)
            }   
        }
        style={
            nodeSelect===idx ? {
                backgroundColor: '#238CFA',
                color: '#fff',
                border: '1px solid #fff'
            }
            :
            {}
        }>
            <span>{idx}</span>
        </button>
    )
}

const VisitNode = ({node, type, idx,chCenter, sidebarFold, nodeSelect}) => {
    //const back = nodeSelect===idx ? '#238CFA' : ''
    return (
        <button className="VisitNode" onClick={
            ()=>{
                chCenter(node, idx)
            }
        }
        style={sidebarFold ? {
            width: 44,
            height: 50,
            //backgroundColor: back
        } : {
            width: 275,
            height: 100,
            //backgroundColor: back
        }}>
            <div className="head">
                <div className="idx">
                    <span>{idx}</span>
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

const SideBar = ({mainPerson, chCenter, sidebarFold, sbFold, nodeSelect}) => {
    return (
        <div className="SideBar" id={sidebarFold ? 'SideBar-fold' : ''}>
            <div id="comp-title">
                <button className="fold" onClick={sbFold}>{
                    sidebarFold ? <MdKeyboardArrowLeft/> : <MdKeyboardArrowRight/>
                }</button>
                {
                    sidebarFold ? null : <span>동선 정보 <span id="bold">( {mainPerson ? mainPerson.get('movingInfo').size : null} )</span></span>
                }
            </div>
            <div className="body">
                {mainPerson ? mainPerson.get('movingInfo').map((elem,idx)=>{
                    idx+=1;
                    return(
                        sidebarFold ? 
                        <VisitNodeFold 
                            idx={idx} 
                            key={idx}
                            chCenter={chCenter}
                            node={elem}
                            nodeSelect={nodeSelect}
                        /> 
                        :
                        <VisitNode 
                            key={idx} 
                            node={elem} 
                            type={mainPerson.get('type')} 
                            idx={idx}
                            chCenter={chCenter}
                            sidebarFold={sidebarFold}
                            nodeSelect={nodeSelect}
                        />
                    )
                }) : null}
            </div>
        </div>
    )
}

export default SideBar;