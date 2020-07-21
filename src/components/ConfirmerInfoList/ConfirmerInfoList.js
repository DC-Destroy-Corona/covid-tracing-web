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
const ListItem = ({confirmerInfo}) => {
    return (
        <div className="listview">
                <div className="comp-body">
                    <table>
                        <thead>
                            <th>확진 번호</th>
                            <th>성별</th>
                            <th>확진 일자</th>
                            <th> </th>
                        </thead>
                        <tbody>
                            <tr>
                            <td>4590</td>
                                <td>여자</td>
                                <td>2020-07-01</td>  
    {/* <td>{confirmerInfo.confirmerId}</td>
    <td>{confirmerInfo.gender}</td>
    <td>{confirmerInfo.confirmDatetime}</td> */}
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
    render(){
        return (
            <div className="ConfirmerInfoList" >
                <div className="infoList">
                <div id="comp-title">
                    <span><strong>확진자 목록</strong></span>
                    {/* <VisitRootAddModal
                        createVisitRoot={this._createVisitRoot}
                    /> */}
                </div>
                <div className="body">
                <button className="reg_btn">
                    + 방문 지점 등록
                    </button>
                    <ListItem 
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
                confirmDatetime: state.edit.getIn(['confirmerInfo', 'confirmDatetime']),
            }
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoList)
);
