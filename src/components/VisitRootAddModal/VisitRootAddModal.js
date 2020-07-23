import React, { Component, Fragment } from 'react';
import { MdClose } from 'react-icons/md'
import './VisitRootAddModal.css';
import { bindActionCreators } from 'redux';
import {
    SubmitBtn
} from 'components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc"; 

class VisitRootAddModal extends Component {
    
    _inputRoadNameAddr = (e) => {
        const { editActions } = this.props;
        editActions.inputRoadNameAddr(e.target.value);
    }
    _pickVisitDatetime  = (date) => {
        const { editActions } = this.props;
        editActions.pickVisitDatetime(date);
    }
    _inputLatitude  = (e) => {
        const { editActions } = this.props;
        editActions.inputLatitude(e.target.value);
    }
    _inputLongitude  = (e) => {
        const { editActions } = this.props;
        editActions.inputLongitude(e.target.value);
    }
    _inputType = (e) => {
        const { editActions } = this.props;
        editActions.inputType(e.target.value);
    }
    _inputProvince  = (e) => {
        const { editActions } = this.props;
        editActions.inputProvince(e.target.value);
    }

    _setIsModalWithTrue = () => {
        // this.setState({ showModal: true });
        const { editActions, showModal
            } = this.props;   
        editActions.setIsModalWithTrue(!showModal);
        }
    
        _setIsModalWithFalse = () => {
        // this.setState({ showModal: false });
        const { editActions, showModal
        } = this.props;   
        editActions.setIsModalWithFalse(!showModal);
        editActions.visitPointRegInputClear();
        }

        _registerVisitPoint =() => {
            const { 
                editActions,
                visitPointInfo,
                showModal
            } = this.props;
    
            editActions.registerVisitPoint({
                roadNameAddr : visitPointInfo.roadNameAddr,
                visitDatetime : visitPointInfo.visitDatetime,
                latitude : visitPointInfo.latitude,
                longitude : visitPointInfo.longitude,
                type : visitPointInfo.type,
                province: visitPointInfo.province,
            });

            editActions.visitPointRegInputClear();
            editActions.setIsModalWithFalse(!showModal);
        }
    componentDidMount() {
    }

    render(){
        const {
            visitPointInfo,
            showModal
        } = this.props;

        const {
            roadNameAddr,
            visitDatetime,
            latitude,
            longitude,
            type,
            province
        } = visitPointInfo;
        
    return (
        <div id="VisitRootAddModal">
            <header>
                    <span>방문 지점 등록</span>
                    <button id="close_btn" onClick={this._setIsModalWithFalse}>
                        <MdClose size={20}/>
                    </button>
            </header>
            <div className="wrap">
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>도로명 주소</span>
                        </div>
                        <div className="input-item">
                            <input
                                name="roadNameAddr"
                                type="text"
                                value={roadNameAddr}
                                placeholder='주소'
                                onChange={this._inputRoadNameAddr}>
                            </input>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>방문 일자</span>
                        </div>
                        <div className="input-item">
                        <div className="datepicker_form">
                        <DatePicker 
                        selected={visitDatetime}
                        onChange={this._pickVisitDatetime}
                        dateFormat="yyyy-MM-dd"
                        />
                        <div className="calender_icon">
                            <FcCalendar size={20} />
                        </div>
                    </div>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>latitude(위도)</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="latitude"
                                type="text"
                                value={latitude}
                                placeholder='latitude(위도)'
                                onChange={this._inputLatitude}>
                            </input>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>longitude(경도)</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="longitude"
                                type="text"
                                value={longitude}
                                placeholder='longitude(경도)'
                                onChange={this._inputLongitude}>
                            </input>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>type</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="type"
                                type="text"
                                value={type}
                                placeholder='type'
                                onChange={this._inputType}>
                            </input>
                        </div>
                    </div>
                    
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>province</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="province"
                                type="text"
                                value={province}
                                placeholder='province'
                                onChange={this._inputProvince}>
                            </input>
                        </div>
                    </div>
                    <div className="center">
                    <button 
                    disabled ={false}
                    style={{cursor:'pointer'}}
                    onClick={this._setIsModalWithFalse}>
                    취소</button>
                    
                    <button 
                    id="reg_btn"
                    disabled ={
                        roadNameAddr ==''|| visitDatetime==''||latitude==''|| 
                        longitude=='' || type=='' || province=='' ?
                        true : false
                    }
                    onClick={this._registerVisitPoint}>
                    등록
                    </button>
                    </div>
            </div>
        </div>
    )
}
}
export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            confirmerInfo : {
                confPatientId: state.edit.getIn(['confirmerInfo', 'confPatientId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                confDatetime: state.edit.getIn(['confirmerInfo', 'confDatetime']),
            },
            visitPointInfo : {
                roadNameAddr : state.edit.getIn(['visitPointInfo', 'roadNameAddr']),
                visitDatetime : state.edit.getIn(['visitPointInfo', 'visitDatetime']),
                latitude : state.edit.getIn(['visitPointInfo', 'latitude']),
                longitude : state.edit.getIn(['visitPointInfo', 'longitude']),
                type : state.edit.getIn(['visitPointInfo', 'type']),
                province : state.edit.getIn(['visitPointInfo', 'province']),
            },
            
            showModal : state.edit.get('showModal'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(VisitRootAddModal)
)