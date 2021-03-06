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
import './ConfirmerInfoAdd.css';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import { color } from 'd3';
import moment from 'moment';

class ConfirmerInfoAdd extends Component {

    _inputConfPatientId =(e) => {
        const {editActions, regexp} = this.props;
        if(e.target.value === '' || regexp.test(e.target.value)){
            editActions.inputConfPatientId(e.target.value);
        }
    }

    _selectGender = (e) => {
        const { editActions } = this.props;
        editActions.selectGender(e.target.value);
    }

    _selectRegion = (option) => {
        const { editActions } = this.props;
        editActions.selectRegion(option.value);
    }

    _pickConfDateTime  = (date) => {
        const { editActions } = this.props;
        editActions.pickConfDateTime(date);
    }
    _registerConfirmer = () => {
        const { 
            editActions,
            confirmerInfo,
        } = this.props;

        console.log(confirmerInfo.confPatientId)

        editActions.registerConfirmer({
            confPatient: {
                confPatientId : confirmerInfo.confPatientId,
                gender : confirmerInfo.gender,
                region : confirmerInfo.region,
                confDatetime : moment(confirmerInfo.confDatetime).format('YYYY-MM-DD').toString(),
                movingInfoList: confirmerInfo.movingInfoList.map((item)=>{return {
                    confPatientMovingInfoId: item.get('confPatientMovingInfoId'),
                    streetNameAddr: item.get('streetNameAddr'),
                    firstDatetime:moment(item.get('firstDatetime')).format('YYYY-MM-DD').toString(),
                    lastDatetime: moment(item.get('lastDatetime')).format('YYYY-MM-DD').toString(),
                    latitude: item.get('latitude'),
                    longitude: item.get('longitude'),
                    type: item.get('type'),
                    province: item.get('province')
                }})
            }
        });
        editActions.confirmerRegInputClear();
    }
    componentDidMount() {
        
    }

    render() {
        const {
            confirmerInfo,
            children
        } = this.props;

        
        const {
            confPatientId,
            gender,
            region,
            confDatetime
        } = confirmerInfo;
        
        const options = [
            '서울특별시','부산광역시','대구광역시', 
            '인천광역시', '광주광역시','대전광역시',
            '울산광역시','경기도','강원도','충청북도',
            '충청남도','전라북도','전라남도','경상북도',
            '경상남도','제주특별자치도','세종특별자치시'
        ]          
        const defaultOption = region;
        return (
            <div className="confirmerInfoAdd">
                <InputContainer title="확진자 정보 등록" bold={true}>
                    <InputItem
                        display={true}
                        name='확진자 번호'
                        label='confPatientId'
                        must={true}
                        value={confPatientId}
                        placeholder='확진 번호'
                        onChange={this._inputConfPatientId}
                    />
                    <InputItem
                        display={false}
                        name='성별'
                        label='confirmer_gender'
                        must={true}
                    />
                    <div className="radioButton_gender">
                        <label>
                            <input
                                type="radio"
                                value="male"
                                checked={gender === "male"}
                                onChange={this._selectGender}
                            />
                            <span>남자</span>
                        </label>
                        <label id="femaleRd">
                            <input
                                type="radio"
                                value="female"
                                checked={gender === "female"}
                                onChange={this._selectGender}
                            />
                            <span>여자</span>
                        </label>
                    </div>
                    <div style={{
                        height:'15px'
                    }}> </div>
                    <InputItem
                        display={false}
                        name='거주지'
                        label='region'
                        must={true}
                    />
                    <Dropdown 
                        options={options} 
                        onChange={this._selectRegion} 
                        value={region}
                        placeholder="시/도 선택" 
                    />
                    <div style={{
                        height:'5px'
                    }}> </div>
                    <InputItem
                        display={false}
                        name='확진 일자'
                        label='confirm_date'
                        must={true}
                    />
                    <div className="datepicker_form">
                    <DatePicker 
                        selected={confDatetime}
                        onChange={this._pickConfDateTime}
                        dateFormat="yyyy-MM-dd"
                    />
                        <div className="calender_icon">
                            <FcCalendar size={20} />
                        </div>
                    </div>
                </InputContainer>
                <hr style={{
                    width:'580px',
                    marginTop:'5px',
                    marginLeft:'10px',
                    marginBottom: 10,
                    border: 0, 
                    borderTop: '1px solid #ccc',
                    color: '#eee'
                }} />
                <div className="conf-add-ls">
                    <div className="conf-add-ls-item">

                    </div>
                    {children}
                </div>
                <SubmitBtn 
                    disabled ={
                        confPatientId==''|| gender=='' || region=='' || confDatetime=='' ?
                        true : false}
                    onClick={this._registerConfirmer} 
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
            confirmerInfo : {
                confPatientId: state.edit.getIn(['confirmerInfo', 'confPatientId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                region: state.edit.getIn(['confirmerInfo', 'region']),
                confDatetime: state.edit.getIn(['confirmerInfo', 'confDatetime']),
                movingInfoList: state.edit.getIn(['confirmerInfo', 'movingInfoList']),
            },
            visitPointInfo : {
                streetNameAddr : state.edit.getIn(['visitPointInfo', 'streetNameAddr']),
                firstDateTime : state.edit.getIn(['visitPointInfo', 'firstDateTime']),
            }
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoAdd)
)