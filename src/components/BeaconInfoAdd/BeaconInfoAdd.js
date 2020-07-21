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
import './BeaconInfoAdd.css';
class BeaconInfoAdd extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <div className="BeaconInfoAdd">
                <InputContainer title="비콘 정보 등록" bold={true}>
                    <InputItem
                        display={true}
                        name='---'
                        // label='confirmer_id'
                        must={true}
                        // value={confirmerId}
                        placeholder='---'
                    // onChange={this._inputText}
                    />
                    <InputItem
                        display={true}
                        name='---'
                        // label='confirmer_id'
                        must={true}
                        // value={confirmerId}
                        placeholder='---'
                    // onChange={this._inputText}
                    />
                    <InputItem
                        display={true}
                        name='---'
                        // label='confirmer_id'
                        must={true}
                        // value={confirmerId}
                        placeholder='---'
                    // onChange={this._inputText}
                    />
                    <InputItem
                        display={true}
                        name='---'
                        // label='confirmer_id'
                        must={true}
                        // value={confirmerId}
                        placeholder='---'
                    // onChange={this._inputText}
                    />
                    <InputItem
                        display={true}
                        name='---'
                        // label='confirmer_id'
                        must={true}
                        // value={confirmerId}
                        placeholder='---'
                    // onChange={this._inputText}
                    />
                </InputContainer>
                <SubmitBtn onClick={this._changeInputText} context='저장' />
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
    )(BeaconInfoAdd)
)