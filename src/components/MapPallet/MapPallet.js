/*global kakao*/
import React, { Fragment, Component } from 'react';
import './MapPallet.css';
import {SIDEBAR_OPT} from 'constants/index'

const PersonInfo = ({person})=>{
    return(
        <div className="PersonInfo">
            <header>대상 상세정보</header>
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
                    <span className="color-bold">{`${person.get('cntctPatientInfo').size}명`}</span>
                </div>
            </div> : null}
        </div>
    )
}

const MapPallet =({sidebarFold, person}) => {
    return(
        <Fragment>
        <div className="map-pallet">
            {person ? <PersonInfo person={person}/> : null}
            <div id="map" style={{
                right: (sidebarFold ? SIDEBAR_OPT.foldTrue : SIDEBAR_OPT.foldFalse)
            }}>

            </div>
        </div>
    </Fragment>
    )
}

export default MapPallet