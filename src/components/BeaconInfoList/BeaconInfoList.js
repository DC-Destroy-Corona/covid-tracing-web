import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import * as basicActions from 'store/modules/basic';
import {
    InputContainer,
    InputItem,
    SubmitBtn
} from 'components';
import './BeaconInfoList.css';
class BeaconInfoList extends Component {

    componentDidMount() {
    }

    render() {
        
        return (
            <div className="BeaconInfoList">
                
            </div>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            confirmerId: state.edit.getIn(['confirmerInfo', 'confirmerId']),
            gender: state.edit.getIn(['confirmerInfo', 'gender']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(BeaconInfoList)
)