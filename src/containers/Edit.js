import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as editActions from "store/modules/edit";
import * as basicActions from "store/modules/basic";
import {
  Header,
  MainSideBar,
  ConfirmerInfoAdd,
  ConfirmerInfoList,
  BeaconInfoAdd,
  BeaconInfoList,
  ConfirmerRootList,
} from "components";
import VisitRootAddModal from "../components/VisitRootAddModal/VisitRootAddModal";

class Edit extends Component {
  _sbSelect = (idx) => {
    const { basicActions } = this.props;
    basicActions.sbSelect(idx);
  };

  componentDidMount() {
    const { editActions } = this.props;
    const confPageIndex = 1;
    const beaconPageIndex = 1;
    editActions.getConfPatientAndBeaconList(confPageIndex, beaconPageIndex);
  }

  render() {
    const { select, beaconInfoList } = this.props;
    return (
      <Fragment>
        <MainSideBar select={select} sbSelect={this._sbSelect} />
        <Header />

        <div
          className="SearchTable"
          style={{
              paddingTop: 10,

            // top: 10,
          }}
        >
          <div className="SearchTable-wrap" style={{
              width: 1250
          }}>
            <div style={{
                width: 1250,
                display:'flex',
                justifyContent: 'space-between'
            }}>
                {/* 확진자 정보 등록 */}
                <ConfirmerInfoAdd>
                    <ConfirmerRootList />
                </ConfirmerInfoAdd>

                {/* 확진자 목록 */}
                {/* <ConfirmerInfoList /> */}

                {/* 방문 지점 정보 */}
                {/*  */}

                {/* 비콘 정보 등록 */}
                <BeaconInfoAdd />
            </div>
            <BeaconInfoList beaconInfoList={beaconInfoList} />
            {/* <PersonsList
              title={"확진자 리스트"}
            /> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    // props 로 넣어줄 스토어 상태값
    (state) => ({
      select: state.basic.getIn(["basic", "select"]),

      confirmerInfo: {
        confPatientId: state.edit.getIn(["confirmerInfo", "confPatientId"]),
        gender: state.edit.getIn(["confirmerInfo", "gender"]),
        region: state.edit.getIn(["confirmerInfo", "region"]),
        confDatetime: state.edit.getIn(["confirmerInfo", "confDatetime"]),
      },
      beaconInfoList: state.edit.getIn(["globalInfo", "beaconList"]),
    }),
    // props 로 넣어줄 액션 생성함수
    (dispatch) => ({
      editActions: bindActionCreators(editActions, dispatch),
      basicActions: bindActionCreators(basicActions, dispatch),
    })
  )(Edit)
);
