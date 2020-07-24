import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import './ConfirmerRootList.css';
import { AiFillAppstore } from "react-icons/ai";
import { FaMapSigns, FaMap } from "react-icons/fa";
import { MdDateRange, MdCheck } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import {
    VisitRootAddModal
} from 'components';
import Modal from 'react-modal';

const VisitNode = ({ streetNameAddr, startDateTime, endDateTime,type,province }) => {
    return (
        <button className="VisitNode">
            <div className="node-row">
                <div className="elem">
                    <FaMapSigns style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }} />
                    <span className="key">도로명 주소</span>
                    <span className="val">{streetNameAddr}</span>
                    {/* <span className="val">경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)</span> */}
                </div>
            </div>

            <div className="node-row-date">
                <div className="elem">
                    <MdDateRange style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }} />
                    <span className="key">노출 일자</span>
                    <span className="val">{startDateTime}</span>
                    <span className="val mark"> ~ </span>
                    <span className="val">{endDateTime}</span>
                    {/* <span className="val">2020-05-17 13:05</span> */}
                </div>
            </div>
            <div className="node-row-type">
                <div className="elem">
                    <AiFillAppstore style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }} />
                    <span className="key">유형(type)</span>
                    <span className="val">{type}</span>
                    {/* <span className="val">경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)</span> */}
                </div>
            </div>
            <div className="node-row-province">
                <div className="elem">
                    <FaMap style={{
                        marginTop: 2,
                        marginRight: 3,
                        float: 'left'
                    }} />
                    <span className="key">지역 구분</span>
                    <span className="val">{province}</span>
                    {/* <span className="val">경상북도 경산시 하양읍 하양로 13-13(대구가톨릭대학교 공학관 526호)</span> */}
                </div>
            </div>
        </button>
    )
}

class ConfirmerRootList extends Component {
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
    
    render() {
        const { showModal } = this.props;
        return (
            <div className="ConfirmerRootList">
                <div id="comp-title">
                    <span><strong>방문 지점 정보</strong></span>
                </div>
                <div className="body">
                    <button className="register-btn"
                        onClick={this._setIsModalWithTrue}>
                        <BsPlus style={{ paddingTop:'3px', marginRight:'3px'}} />
                        등록하기
                    </button>
                    <Modal
                        isOpen={showModal}
                        style={{
                            overlay: {
                                zIndex: 9999,
                                backgroundColor: 'rgba(33,33,33,0.2)'
                            },
                            content: {
                                padding: 0,
                                borderRadius: '2px',
                                border: '1px solid #dadce0',
                                backgroundColor: '#fff',
                                top: '0',
                                left: '0',
                                right: '0',
                                bottom: '0',
                                // left: '70px',
                                // right: '70px',
                                margin: 'auto',
                                height: '440px',
                                maxWidth: '500px',
                                overflow: 'hidden'
                                // bottom: '85px',
                            }
                        }}
                    >
                        <VisitRootAddModal />

                    </Modal>
                    <button className="save-btn"
                        onClick={onclick}>
                            <MdCheck style={{ paddingTop:'3px', marginRight:'3px'}} />
                            저장하기
                    </button>
                    <VisitNode
                        streetNameAddr='경상북도 경산시 하양읍 하양로 13-13 (대구가톨릭대학교 공학관 526호)dfsfsdfsdfsdsfsfsdsd'
                        startDateTime='2020-05-17'
                        endDateTime ='2020-05-20'
                        type ='school'
                        province = 'Busan'
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
            confirmerInfo: {
                confPatientId: state.edit.getIn(['confirmerInfo', 'confPatientId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                confDatetime: state.edit.getIn(['confirmerInfo', 'confDatetime']),
            },
            visitPointInfo: {
                streetNameAddr: state.edit.getIn(['visitPointInfo', 'streetNameAddr']),
                firstDateTime: state.edit.getIn(['visitPointInfo', 'firstDateTime']),
            },

            showModal: state.edit.get('showModal'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerRootList)
);
