import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import {FaRegArrowAltCircleRight} from 'react-icons/fa';
import './ConfirmerInfoList.css';
import {
    VisitRootAddModal
} from 'components';

import Modal from 'react-modal';
const ListItem = ({confirmerId, gender, region, confirmDate}) => {
    return (
        <div className="listview">
                <div className="comp-body">
                    <table>
                        <thead>
                            <th>확진 번호</th>
                            <th>성별</th>
                            <th>소재지</th>
                            <th>확진 일자</th>
                            <th> </th>
                        </thead>
                        <tbody>
                            <tr>
                            {/* <td>4590</td>
                                <td>여자</td>
                                <td>2020-07-01</td> 
                                <td>대구광역시</td>    */}
                                <td>{confirmerId}</td>
                                <td>{gender}</td>
                                <td>{region}</td>
                                <td>{confirmDate}</td>
                                <td>
                                    <button className="wrap-btn">
                    <div className="btn-label">동선 보기
                    
                    <FaRegArrowAltCircleRight size={15} style={{ 
                        marginTop:'5px',
                        marginLeft :'5px'
                    }} />
                    </div>
            </button>
            </td>
                            </tr>
                            {/* <tr>
                                <td>4590</td>
                                <td>여자</td>
                                <td>2020-07-01</td>
                                <td>
                                    <button className="wrap-btn">
                    <div className="btn-label">동선 보기
                    
                    <FaRegArrowAltCircleRight size={15} style={{ 
                        marginTop:'5px',
                        marginLeft :'5px'
                    }} />
                    </div>
            </button>
            </td>
                            </tr>
                            <tr>
                                <td>4564</td>
                                <td>남자</td>
                                <td>2020-07-21</td>
                                <td>
                                    <button className="wrap-btn">
                    <div className="btn-label">동선 보기
                    
                    <FaRegArrowAltCircleRight size={15} style={{ 
                        marginTop:'5px',
                        marginLeft :'5px'
                    }} />
                    </div>
            </button>
            </td>
                            </tr>
                            <tr>
                                <td>48796</td>
                                <td>여자</td>
                                <td>2020-07-30</td>
                                <td>
                                    <button className="wrap-btn">
                    <div className="btn-label">동선 보기
                    
                    <FaRegArrowAltCircleRight size={15} style={{ 
                        marginTop:'5px',
                        marginLeft :'5px'
                    }} />
                    </div>
            </button>
            </td>
                            </tr> */}
                            
                            </tbody>
                    </table>
            </div>
            </div>
    )
}

class ConfirmerInfoList extends Component {
//     constructor () {
//         super();
//         this.state = {
//           showModal: false
//         };
//         this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

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
                <button className="reg_btn" onClick={this._setIsModalWithTrue}>
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
                        
                    </Modal>
                    <ListItem confirmerId='123'
                    gender ='남자'
                    region='대구광역시'
                    confirmDate = '2020-07-02'
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
                confirmerId: state.edit.getIn(['confirmerInfo', 'confirmerId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                confirmDate: state.edit.getIn(['confirmerInfo', 'confirmDate']),
            },
            showModal : state.edit.get('showModal'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoList)
);
