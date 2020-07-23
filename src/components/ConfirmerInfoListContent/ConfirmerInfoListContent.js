import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import {FaRegArrowAltCircleRight} from 'react-icons/fa';
import {FiPlusCircle} from 'react-icons/fi';
import './ConfirmerInfoListContent.css';
import {
    VisitRootAddModal
} from 'components';

import Modal from 'react-modal';
import { get } from 'immutable';

// class ConfirmerInfoListContent extends Component {
    
//     _setIsModalWithTrue = () => {
//     // this.setState({ showModal: true });
//     const { editActions, showModal
//         } = this.props;   
//     editActions.setIsModalWithTrue(!showModal);
//     }

//     _setIsModalWithFalse = () => {
//     // this.setState({ showModal: false });
//     const { editActions, showModal
//     } = this.props;   
//     editActions.setIsModalWithFalse(!showModal);
//     }
    
//     componentDidMount () {
//     }

//     render(){
//         const {showModal} = this.props;
const ConfirmerInfoListContent = ({confPatientId,gender,region,confDatetime,_setIsModalWithTrue,showModal}) => {
    return (
        <div className="listview">
                <div className="comp-body">
                    <table>
                        <thead>
                            <th>확진 번호</th>
                            <th>성별</th>
                            <th>소재지</th>
                            <th>확진 일자</th>
                            <th>방문 지점</th>
                        </thead>
                        <tbody>
                            {/* <td>4590</td>
                                <td>여자</td>
                                <td>대구광역시</td>   
                                <td>2020-07-01</td>  */}
                            <tr>
                                

                                <td>{confPatientId}</td>
                                <td>{gender}</td>
                                <td>{region}</td>
                                <td>{confDatetime}</td>
                                <td>
                                    <button className="register-btn"
                                    onClick={_setIsModalWithTrue}>
                                        <div className="btn-label">
                                            등록하기
                                            <FiPlusCircle size={15} style={{ 
                                                marginTop:'5px',
                                                marginLeft :'5px'
                                            }} /> 
                                        </div>
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
                        
                    </Modal>
                                    <button className="wrap-btn">
                                        <div className="btn-label">정보보기
                                        
                                            <FaRegArrowAltCircleRight size={15} style={{ 
                                                marginTop:'5px',
                                                marginLeft :'5px'
                                            }} />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                            
                    </tbody>
                </table>
            </div>
            </div>
    )
}

export default ConfirmerInfoListContent;