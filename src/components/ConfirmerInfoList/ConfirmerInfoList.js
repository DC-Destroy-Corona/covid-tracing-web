import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import './ConfirmerInfoList.css';
import {
    ConfirmerInfoListContent
} from 'components';
import Modal from 'react-modal';
import { get } from 'immutable';

class ConfirmerInfoList extends Component {
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
        
    componentDidMount () {
    }

    render(){
        const {showModal} = this.props;

        return (
            <div className="ConfirmerInfoList" >
                <div className="infoList">
                <div id="comp-title">
                    <span><strong>확진자 목록</strong></span>
                </div>
                <div className="body">
                {/* <button className="reg_btn" onClick={this._setIsModalWithTrue}>
                    + 방문 지점 등록
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
                            height: '400px',
                            maxWidth: '500px',
                            overflow: 'hidden'
                            // bottom: '85px',
                        }
                    }}
                    >
                        <VisitRootAddModal />
                        
                    </Modal> */}
                    <ConfirmerInfoListContent 
                    confPatientId='123'
                    gender ='남자'
                    region='대구광역시'
                    confDatetime = '2020-07-02'
                    _setIsModalWithTrue ={this._setIsModalWithTrue}
                    showModal ={showModal}
                    />
                </div>
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
            showModal : state.edit.get('showModal'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoList)
);
