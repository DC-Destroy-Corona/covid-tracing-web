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
const ConfirmerInfoListContent = ({confPatientId,gender,region,confDatetime}) => {
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