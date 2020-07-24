import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as editActions from 'store/modules/edit';
import * as basicActions from 'store/modules/basic';
import {
    Header,
    MainSideBar,
    ConfirmerInfoAdd,
    ConfirmerInfoList,
    BeaconInfoAdd,
    BeaconInfoList,
    ConfirmerRootList
} from 'components';
import VisitRootAddModal from '../components/VisitRootAddModal/VisitRootAddModal';

class Edit extends Component {
    _sbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.sbSelect(idx);
    }
    componentDidMount() {

    }

    render() {
        const { 
            select
        } = this.props;
        return (
            <Fragment>
                <MainSideBar select={select} sbSelect={this._sbSelect} />
                <Header />
                <ConfirmerInfoAdd />
                <ConfirmerInfoList />
                <ConfirmerRootList />
                <BeaconInfoAdd />
                <BeaconInfoList />
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            select: state.basic.getIn(['basic', 'select']),
            confirmerInfo : {
                confPatientId: state.edit.getIn(['confirmerInfo', 'confPatientId']),
                gender: state.edit.getIn(['confirmerInfo', 'gender']),
                region:state.edit.getIn(['confirmerInfo', 'region']),
                confDatetime: state.edit.getIn(['confirmerInfo', 'confDatetime']),
            },
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            editActions: bindActionCreators(editActions, dispatch),
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Edit)
)