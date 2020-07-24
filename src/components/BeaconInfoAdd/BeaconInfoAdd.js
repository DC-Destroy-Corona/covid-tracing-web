import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import {
    InputContainer,
    InputItem,
    SubmitBtn
} from 'components';
import './BeaconInfoAdd.css';
class BeaconInfoAdd extends Component {
    _inputBeaconUuid =(e) => {
        const {editActions} = this.props;
            editActions.inputBeaconUuid(e.target.value);
    }
    _inputBeaconMajor =(e) => {
        const {editActions, regexp} = this.props;
        if(e.target.value === '' || regexp.test(e.target.value)){
            editActions.inputBeaconMajor(e.target.value);
        }
    }
    _inputBeaconMinor =(e) => {
        const {editActions, regexp} = this.props;
        if(e.target.value === '' || regexp.test(e.target.value)){
            editActions.inputBeaconMinor(e.target.value);
        }
    }
    _inputBeaconStreetNameAddr  = (e) => {
        const { editActions } = this.props;
        editActions.inputBeaconStreetNameAddr(e.target.value);
    }
    _inputbeaconStreetNameAddrDES  = (e) => {
        const { editActions } = this.props;
        editActions.inputbeaconStreetNameAddrDES(e.target.value);
    }
    _registerBeacon =() => {
        
        const { 
            editActions,
            beaconInfo
        } = this.props;
        
        editActions.registerBeacon({
            beaconUuid : beaconInfo.beaconUuid,
            beaconMajor : beaconInfo.beaconMajor,
            beaconMinor : beaconInfo.beaconMinor,
            beaconStreetNameAddr : beaconInfo.beaconStreetNameAddr,
            beaconStreetNameAddrDES : beaconInfo.beaconStreetNameAddrDES
        });

        editActions.beaconRegInputClear();
    }

    componentDidMount() {
    }

    render() {
        const {
            beaconInfo
        } = this.props;

        const {
            beaconUuid,
            beaconMajor,
            beaconMinor,
            beaconStreetNameAddr,
            beaconStreetNameAddrDES
        } = beaconInfo;
        return (
            <div className="BeaconInfoAdd">
                <InputContainer title="비콘 정보 등록" bold={true}>
                    <InputItem
                        display={true}
                        name='uuid(위치 식별자)'
                        label='beaconUuid'
                        must={true}
                        value={beaconUuid}
                        placeholder='beaconUuid'
                        onChange={this._inputBeaconUuid}
                    />
                    <InputItem
                        display={true}
                        name='major'
                        label='beaconMajor'
                        must={true}
                        value={beaconMajor}
                        placeholder='beaconMajor'
                        onChange={this._inputBeaconMajor}
                    />
                    <InputItem
                        display={true}
                        name='minor'
                        label='beaconMinor'
                        must={true}
                        value={beaconMinor}
                        placeholder='beaconMinor'
                        onChange={this._inputBeaconMinor}
                    />
                    <InputItem
                        display={true}
                        name='도로명 주소'
                        label='beaconStreetNameAddr'
                        must={true}
                        value={beaconStreetNameAddr}
                        placeholder='도로명 주소'
                        onChange={this._inputBeaconStreetNameAddr}
                    />
                    <InputItem
                        display={true}
                        name='상세 주소 입력'
                        label='beaconStreetNameAddrDES'
                        must={true}
                        value={beaconStreetNameAddrDES}
                        placeholder='주소 입력'
                        onChange={this._inputText}
                    />
                </InputContainer>
                <SubmitBtn 
                    disabled ={
                        beaconUuid==''|| beaconMajor=='' || beaconMinor=='' || beaconStreetNameAddr=='' ?
                        true : false}
                    onClick={this._registerBeacon} 
                    context='등록' />
            </div>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            regexp : /^[0-9\b]+$/,
            beaconInfo : {
                beaconUuid :state.edit.getIn(['beaconInfo', 'beaconUuid']),
                beaconMajor :state.edit.getIn(['beaconInfo', 'beaconMajor']),
                beaconMinor :state.edit.getIn(['beaconInfo', 'beaconMinor']),
                beaconStreetNameAddr :state.edit.getIn(['beaconInfo', 'beaconStreetNameAddr']),
                beaconStreetNameAddrDES :state.edit.getIn(['beaconInfo', 'beaconStreetNameAddrDES'])
            },
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(BeaconInfoAdd)
)