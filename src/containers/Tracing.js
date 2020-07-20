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

    _chCenter = (center) => {
        const { tracingActions } = this.props;
        tracingActions.chCenter(center);
    }

    componentDidMount() {
    }

    render() {
        const {
            select, 
            mainPerson,
            mapOption
        } = this.props;

        return (
            <Fragment>
                <MainSideBar select={select} sbSelect={this._sbSelect}/>
                <SideBar 
                    mainPerson={mainPerson}
                    chCenter={this._chCenter}
                />
                <MapPallet 
                    mainPerson={mainPerson} 
                    mapOption={mapOption}
                />
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
            mainPerson: state.tracing.get('person'),
            mapOption: state.tracing.get('mapOption'), 
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            tracingActions: bindActionCreators(tracingActions, dispatch),
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Tracing)
)