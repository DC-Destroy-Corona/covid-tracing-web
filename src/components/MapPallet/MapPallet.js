/*global kakao*/
import React, { Fragment, Component } from 'react';
import './MapPallet.css';
import {SIDEBAR_OPT} from 'constants/index'

const PersonInfo = ({})=>{
    return(
        <div className="PersonInfo">
            <header>대상 상세정보</header>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">분류</div>
                <div className="PersonInfo-val"></div>
            </div>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">식별번호</div>
                <div className="PersonInfo-val"></div>
            </div>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">방문지점수</div>
                <div className="PersonInfo-val"></div>
            </div>
            <div className="PersonInfo-row">
                <div className="PersonInfo-key">접촉자수</div>
                <div className="PersonInfo-val"></div>
            </div>
        </div>
    )
}

const MapPallet =({sidebarFold}) => {
    return(
        <Fragment>
        <div className="map-pallet">
            <PersonInfo/>
            <div id="map" style={{
                right: (sidebarFold ? SIDEBAR_OPT.foldTrue : SIDEBAR_OPT.foldFalse)
            }}>

            </div>
        </div>
    </Fragment>
    )
}

export default MapPallet