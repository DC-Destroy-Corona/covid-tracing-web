import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as tracingActions from 'store/modules/tracing';
import * as basicActions from 'store/modules/basic';
import {
    MapPallet,
    SideBar,
    Header,
    MainSideBar,
    FooterBar
} from 'components';


class Tracing extends Component {

    _sbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.sbSelect(idx);
    }

    componentDidMount() {
    }

    render() {
        const {select} = this.props;

        return (
            <Fragment>
                <MainSideBar select={select} sbSelect={this._sbSelect}/>
                <SideBar/>
                <MapPallet/>
                <Header/>
                <FooterBar>
                </FooterBar>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            select: state.basic.getIn(['basic', 'select']),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            tracingActions: bindActionCreators(tracingActions, dispatch),
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Tracing)
)