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
import './ConfirmerInfoAdd.css';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
class ConfirmerInfoAdd extends Component {

    _inputConfirmerid =(e) => {
        const {editActions} = this.props;
        editActions.inputConfirmerid(e.target.value);
    }

    _selectGender = (e) => {
        const { editActions } = this.props;
        editActions.selectGender(e.target.value);
    }

    _selectRegion = (option) => {
        const { editActions } = this.props;
        editActions.selectRegion(option.value);
    }

    _pickConfirmDate  = (date) => {
        const { editActions } = this.props;
        editActions.pickConfirmDate(date);
    }
    _registerConfirmer = () => {
        const { 
            editActions,
            confirmerInfo
        } = this.props;

        editActions.registerConfirmer({
            confirmerId : confirmerInfo.confirmerId,
            gender : confirmerInfo.gender,
            region : confirmerInfo.region,
            confirmDate : confirmerInfo.confirmDate
        })
    }
    componentDidMount() {
    }

    render() {
        const {
            confirmerInfo
        } = this.props;

        const {
            confirmerId,
            gender,
            region,
            confirmDate
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
                        label='confirmerId'
                        must={true}
                        value={confirmerId}
                        placeholder='확진 번호'
                        onChange={this._inputConfirmerid}
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
                        name='소재지'
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
                        selected={confirmDate}
                        onChange={this._pickConfirmDate}
                        dateFormat="yyyy-MM-dd"
                    />
                        <div className="calender_icon">
                            <FcCalendar size={20} />
                        </div>
                    </div>
                </InputContainer>
                <hr style={{
                    width:'700px',
                    marginTop:'5px',
                    marginLeft:'10px',
                    marginBottom:'0'
                }} />
                <SubmitBtn onClick={this._registerConfirmer} context='등록' />
            </div>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            confirmerInfo : {
                confirmerId: state.edit.getIn(['confirmerInfo', 'confirmerId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                region: state.edit.getIn(['confirmerInfo', 'region']),
                confirmDate: state.edit.getIn(['confirmerInfo', 'confirmDate']),
            },
            visitPointInfo : {
                roadNameAddr : state.edit.getIn(['visitPointInfo', 'roadNameAddr']),
                visitDatetime : state.edit.getIn(['visitPointInfo', 'visitDatetime']),
            }
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoAdd)
)