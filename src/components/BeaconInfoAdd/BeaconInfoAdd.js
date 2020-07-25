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
import DaumPostcode from 'react-daum-postcode';
const {kakao} = window
var geocoder = null

class BeaconInfoAdd extends Component {

    _handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        const {editActions} = this.props;
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        console.log(fullAddress)
    
        this._inputBeaconStreetNameAddr(fullAddress)
        
        geocoder.addressSearch(fullAddress, (result, status) => {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                //latitude가 y
                editActions.inputBeaconLatitude(result[0].y)
                //longitude가 x
                editActions.inputBeaconLongitude(result[0].x)
            } 
        });    
    }

    _inputBeaconLogitude = (e) => {
        const {editActions} = this.props;
        editActions.inputBeaconLongitude(e.target.value)
    } 

    _inputBeaconLatitude = (e) => {
        const {editActions} = this.props;
        editActions.inputBeaconLatitude(e.target.value)
    } 

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
        editActions.inputBeaconStreetNameAddr(e);
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
        
        editActions.registerBeacon(beaconInfo);

        editActions.beaconRegInputClear();
    }

    componentDidMount() {
        // const script = document.createElement("script");
        // script.async = true;
        // document.head.appendChild(script);
        // script.onload = () => {
        //     kakao.maps.load(() => {
                
        //     })

        // }
        geocoder = new kakao.maps.services.Geocoder();
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
                        value={beaconInfo.get('beaconUuid')}
                        placeholder='beaconUuid'
                        onChange={this._inputBeaconUuid}
                    />
                    <InputItem
                        display={true}
                        name='major'
                        label='beaconMajor'
                        must={true}
                        value={beaconInfo.get('beaconMajor')}
                        placeholder='beaconMajor'
                        onChange={this._inputBeaconMajor}
                    />
                    <InputItem
                        display={true}
                        name='minor'
                        label='beaconMinor'
                        must={true}
                        value={beaconInfo.get('beaconMinor')}
                        placeholder='beaconMinor'
                        onChange={this._inputBeaconMinor}
                    />
                    <InputItem
                        display={true}
                        name='위도'
                        label='latitude'
                        must={true}
                        value={beaconInfo.get('latitude')}
                        placeholder='latitude'
                        onChange={this._inputBeaconLatitude}
                    />
                    <InputItem
                        display={true}
                        name='경도'
                        label='longitude'
                        must={true}
                        value={beaconInfo.get('longitude')}
                        placeholder='longitude'
                        onChange={this._inputBeaconLogitude}
                    />
                    <InputItem
                        display={true}
                        name='도로명 주소'
                        label='beaconStreetNameAddr'
                        must={true}
                        value={beaconInfo.get('beaconStreetNameAddr')}
                        placeholder='도로명 주소'
                        onChange={this._inputBeaconStreetNameAddr}
                    >
                        <DaumPostcode
                            onComplete={this._handleComplete}
                            width={415}
                            style={{border: '1px solid #dadada'}}
                            theme={{
                                //bgColor: "", //바탕 배경색
                                searchBgColor: "#0B65C8", //검색창 배경색
                                //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
                                //pageBgColor: "", //페이지 배경색
                                //textColor: "", //기본 글자색
                                queryTextColor: "#FFFFFF" //검색창 글자색
                                //postcodeTextColor: "", //우편번호 글자색
                                //emphTextColor: "", //강조 글자색
                                //outlineColor: "", //테두리
                             }}
                            // height={100}
                        />
                    </InputItem>
                    {/* <InputItem
                        display={true}
                        name='상세 주소 입력'
                        label='beaconStreetNameAddrDES'
                        must={true}
                        value={beaconInfo.get('beaconStreetNameAddrDES')}
                        placeholder='주소 입력'
                        onChange={this._inputText}
                    /> */}
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
            // beaconInfo : {
            //     beaconUuid :state.edit.getIn(['beaconInfo', 'beaconUuid']),
            //     beaconMajor :state.edit.getIn(['beaconInfo', 'beaconMajor']),
            //     beaconMinor :state.edit.getIn(['beaconInfo', 'beaconMinor']),
            //     beaconStreetNameAddr :state.edit.getIn(['beaconInfo', 'beaconStreetNameAddr']),
            //     beaconStreetNameAddrDES :state.edit.getIn(['beaconInfo', 'beaconStreetNameAddrDES'])
            // },
            beaconInfo: state.edit.get('beaconInfo')
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(BeaconInfoAdd)
)