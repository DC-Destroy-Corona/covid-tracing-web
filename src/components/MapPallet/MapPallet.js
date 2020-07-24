/*global kakao*/
import React, { Fragment, Component } from 'react';
import './MapPallet.css';
import {SIDEBAR_OPT} from 'constants/index'
import { Link } from 'react-router-dom';
import { range } from 'd3';

const HidePallet = ({sidebarFold, select, type, selectTarget}) => {
    return(
        <div className="HidePallet" style={{
            right: sidebarFold ? SIDEBAR_OPT.foldTrue : SIDEBAR_OPT.foldFalse
        }}>
            {
                select ? select.get('contactorInfo').map((item, idx)=>{
                    return(
                        <div className="hide-pallet-node" key={idx} onClick={()=>{selectTarget(item.get('id'), type==1 ? 2 : 1)}}>
                            <span>{item.get('id')}번</span> {type==1? '접촉자' : '확진자'}
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

const PersonInfo = ({person, select})=>{
    return(
        <div className="PersonInfo">
            <header>대상 요약정보</header>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">분류</div>
                <div className="PersonInfo-val">
                    <span className="color-bold">{
                        person.get('type')===1 ? '확진자' : '접촉자'
                    }</span>
                </div>
            </div>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">식별번호</div>
                <div className="PersonInfo-val">
                    <span className="color-bold">{`${person.get('id')}번`}</span>
                </div>
            </div>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">방문지점수</div>
                <div className="PersonInfo-val">
                    <span className="color-bold">{`${person.get('movingInfo').size}개`}</span>
                </div>
            </div>
            {person.get('type')===1 ? <div className="PersonInfo-row">
                <div className="PersonInfo-key">접촉자수</div>
                <div className="PersonInfo-val">
                    {/* <span className="color-bold">{`${person.get('contac').size}명`}</span> */}
                </div>
            </div> : null}
        </div>
    )
}

const MapPallet =({sidebarFold, person, nodeSelect, selectTarget, clicked, targetPerson, chTargetCenter}) => {
    console.log(nodeSelect)
    return(
        <Fragment>
        <div className="map-pallet">
            <button className="map-pallet-back">
                <Link to={'/'}>뒤로</Link>
            </button>
            {person ? <PersonInfo person={person}/> : null}
            <div id="map" style={{
                right: (sidebarFold ? SIDEBAR_OPT.foldTrue : SIDEBAR_OPT.foldFalse)
            }}>

            </div>
            {clicked ? <div class="hide-btn-ls" style={{
                right: sidebarFold ? SIDEBAR_OPT.foldTrue+105 : SIDEBAR_OPT.foldFalse+105
            }}>
                {targetPerson? targetPerson.get('movingInfo').map((item, idx)=>{return(
                <div key={idx} className="hide-btn-ls-idx" onClick={()=>chTargetCenter(item, idx+1)}>
                    {idx+1}
                </div>)}): null}
            </div> : null}
            {person? <HidePallet 
            sidebarFold={sidebarFold} 
            selectTarget={selectTarget}
            select={person && nodeSelect ? person.getIn(['movingInfo', nodeSelect-1]) : null}
            type={person.get('type')}
            /> : null}
        </div>
    </Fragment>
    )
}

export default MapPallet