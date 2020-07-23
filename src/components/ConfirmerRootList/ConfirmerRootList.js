import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import './ConfirmerRootList.css';
import { FaMapSigns } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const VisitNode = ({roadNameAddr,visitDatetime}) => {
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
                <span className="val">{roadNameAddr}</span>
                    {/* <span className="val">경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)</span> */}
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
                <span className="val">{visitDatetime}</span>
                    {/* <span className="val">2020-05-17 13:05</span> */}
                </div>
            </div>
        </button>
    )
}

class ConfirmerRootList extends Component {
    render(){
        return (
            <div className="ConfirmerRootList">
                <div id="comp-title">
                    <span><strong>방문 지점 정보</strong></span>
                </div>
                <div className="body">
                    <VisitNode 
                    roadNameAddr='경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)'
                    visitDatetime='2020-05-17'
                    />
                    <VisitNode 
                    roadNameAddr='경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)'
                    visitDatetime='2020-05-17'
                    /><VisitNode 
                    roadNameAddr='경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)'
                    visitDatetime='2020-05-17'
                    /><VisitNode 
                    roadNameAddr='경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)'
                    visitDatetime='2020-05-17'
                    /><VisitNode 
                    roadNameAddr='경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)'
                    visitDatetime='2020-05-17'
                    />
                </div>
            </div>
        )
    }
    
}
export default withRouter(
    //subscribe redux store
    connect(
        state => ({
            confirmerInfo : {
                confPatientId: state.edit.getIn(['confirmerInfo', 'confPatientId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                confDatetime: state.edit.getIn(['confirmerInfo', 'confDatetime']),
            },
            visitPointInfo : {
                roadNameAddr : state.edit.getIn(['visitPointInfo', 'roadNameAddr']),
                visitDatetime : state.edit.getIn(['visitPointInfo', 'visitDatetime']),
            },
            
            showModal : state.edit.get('showModal'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerRootList)
);
