import React, { Component, Fragment } from 'react';
import { MdClose } from 'react-icons/md'
import './VisitRootAddModal.css';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";

// const VisitRootAddModal = ({
//     _handleIsModal,
//     createVisitRoot
// }) => {
class VisitRootAddModal extends Component {
    
    _pickVisitDatetime  = (date) => {
        const { editActions } = this.props;
        editActions.pickVisitDatetime(date);
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
        }

        _registerVisitPoint =() => {
            const { 
                editActions,
                visitPointInfo
            } = this.props;
    
            editActions.registerVisitPoint({
                roadNameAddr : visitPointInfo.roadNameAddr,
                visitDatetime : visitPointInfo.visitDatetime
            })
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
            visitDatetime
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
                                className="input"
                                name="devName"
                                type="text">
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
                    <div className="center">
                    <button onClick={this._setIsModalWithFalse}>취소</button>
                    <button onClick={this._registerVisitPoint}>등록</button>
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
                confirmerId: state.edit.getIn(['confirmerInfo', 'confirmerId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                confirmDate: state.edit.getIn(['confirmerInfo', 'confirmDate']),
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
    )(VisitRootAddModal)
)