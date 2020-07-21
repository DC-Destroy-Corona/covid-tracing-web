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

    _pickConfirmDatetime  = (date) => {
        const { editActions } = this.props;
        editActions.pickConfirmDatetime(date);
    }
    _registerConfirmer = () => {
        const { 
            editActions,
            confirmerInfo
        } = this.props;

        editActions.registerConfirmer({
            confirmerId : confirmerInfo.confirmerId,
            gender : confirmerInfo.gender,
            confirmDatetime : confirmerInfo.confirmerId
        })
    }
    // //캘린더 상태
    // state = {
    //     startDate: new Date()
    // };

    // handleChange = date => {
    //     this.setState({
    //         startDate: date
    //     });
    // };

    componentDidMount() {
    }

    render() {
        const {
            confirmerInfo
        } = this.props;

        const {
            confirmerId,
            gender,
            confirmDatetime
        } = confirmerInfo;

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
                        height:'10px'
                    }}> </div>
                    <InputItem
                        display={false}
                        name='확진 일자'
                        label='visit_date'
                        must={true}
                    />
                    <div className="datepicker_form">
                    <DatePicker 
                        selected={confirmDatetime}
                        onChange={this._pickConfirmDatetime}
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
                confirmDatetime: state.edit.getIn(['confirmerInfo', 'confirmDatetime']),
            }
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
        })
    )(ConfirmerInfoAdd)
)