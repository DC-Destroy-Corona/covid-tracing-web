/*global kakao*/

import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as tracingActions from 'store/modules/tracing';
import * as basicActions from 'store/modules/basic';
import {
    DEFAULT_MAP_OPTION,
    MAP_FOCUS_LEVEL,
    SIDEBAR_OPT,
    MARKER_OPT
} from 'constants/index'

import {
    MapPallet,
    SideBar,
    Header,
    MainSideBar,
    FooterBar
} from 'components';

var map = null;

var infowindow = null

class Tracing extends Component {

    _createVisitInfo = (mainPerson, map) => {
        let linePath = []
        mainPerson.get('movingInfo').map((elem, idx)=>{

            const longitude = elem.get('longitude')
            const latitude = elem.get('latitude')

            linePath.push(
                this._createMark({
                    longitude: longitude,
                    latitude: latitude,
                    idx: idx,
                    map: map
                })
            )
        })

        this._createLine({
            linePath: linePath,
            map: map
        })
    }

    _createMark = ({latitude,longitude, idx, map})=>{

        const pos = new kakao.maps.LatLng(latitude, longitude)

        //마커 옵션
        var markerOption = {
            imageSrc : MARKER_OPT.imageSrc,
            imageSize : new kakao.maps.Size(MARKER_OPT.imageSize.x, MARKER_OPT.imageSize.y),
            imgOptions :  {
                spriteSize : new kakao.maps.Size(MARKER_OPT.imgOptions.spriteSize.x, MARKER_OPT.imgOptions.spriteSize.y), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(MARKER_OPT.imgOptions.spriteOrigin.x, MARKER_OPT.imgOptions.spriteOrigin.y(idx)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(MARKER_OPT.imgOptions.offset.x, MARKER_OPT.imgOptions.offset.y) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
        }

        //마커 생성
        // var marker = new kakao.maps.Marker({
        //     position: pos
        // });

        var markerImage = new kakao.maps.MarkerImage(markerOption.imageSrc, markerOption.imageSize, markerOption.imgOptions),
            marker = new kakao.maps.Marker({
                position: pos, // 마커의 위치
                image: markerImage 
            }
        );

        marker.setMap(map);
        return pos
    }

    _createLine = ({linePath,map}) => {
        //if(linePath.size<=1) return

        var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#238CFA', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });

        polyline.setMap(map);  
    }

    _changeMapLevel = () => {
        const { mapOption, tracingActions } = this.props;
        if(map.getLevel()!==MAP_FOCUS_LEVEL){
            //tracingActions.chLevel(MAP_FOCUS_LEVEL)
            map.setLevel(MAP_FOCUS_LEVEL);
            //map.relayout();
        }
    }

    _createMapControl = () => {
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }

    _createInfoWindow = (moveLatLon, node) => {
        //#infowindow은 common/App.css에 정의
        var iwContent = `
            <div id="infowindow">
                <header>${node.get('location')}</header>
                <div>
                    <div class="infowindow-h2">
                        접촉자 (${node.get('cntctPatientNum')})
                    </div>
                    <div class="infowindow-table-form">
                        <table>
                            <thead>
                                <tr>
                                    <th>식별번호</th>
                                    <th>접촉자수</th>
                                    <th>방문지점수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <table>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                    </table>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ` // 인포윈도우
        var iwPosition = moveLatLon //인포윈도우 표시 위치입니다
        var iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
        infowindow = new kakao.maps.InfoWindow({
            map: map, // 인포윈도우가 표시될 지도
            position : iwPosition, 
            content : iwContent,
            removable : iwRemoveable
        });
    }

    _chCenter = (node, idx) => {
        const { tracingActions } = this.props;
        tracingActions.chSelect(idx);

        var moveLatLon = new kakao.maps.LatLng(node.get('latitude'), node.get('longitude'));

        if(infowindow) infowindow.close(); //인포 윈도우 제거
        this._changeMapLevel()
        map.panTo(moveLatLon);
        this._createInfoWindow(moveLatLon, node)
    }

    /**------------- basic page function sets------------------*/
    _sbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.sbSelect(idx);
    }

    _sbFold = () => {
        const { basicActions, sidebarFold } = this.props;
        basicActions.sbFold(!sidebarFold)
        var mapContainer = document.getElementById('map');
        const gap = SIDEBAR_OPT.foldFalse - SIDEBAR_OPT.foldTrue
        if(sidebarFold){
            //mapContainer.style.width = mapContainer.style.width + gap
        }
        else{
            //mapContainer.style.width = mapContainer.style.width - gap
        }
        map.relayout();
    }

    //접촉자 선택
    _selectContacter = (id) =>{
        const { tracingActions } = this.props;
        tracingActions.getContactorInfo(id)
    }

    //확진자 선택
    _selectConfirmer = (id) =>{
        const { tracingActions } = this.props;
        tracingActions.getConfirmerInfo(id)
    }

    componentDidMount() {

        const {
            tracingActions,
            mainPerson
        } = this.props;

        //default props initialze
        tracingActions.chSelect(null);
        tracingActions.getGlobalInfo();

        //map settings
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {
                const el = document.getElementById('map')
                const mapOption = {
                    center: new kakao.maps.Coords(DEFAULT_MAP_OPTION.center.latitude, DEFAULT_MAP_OPTION.center.longitude),
                    level: DEFAULT_MAP_OPTION.level
                }
                map = new kakao.maps.Map(el, mapOption)

                this._createMapControl()

                
            })
        }
    }

    componentDidUpdate(){
        const {
            mainPerson
        } = this.props;

        if(mainPerson)
            this._createVisitInfo(mainPerson, map)
    }

    render() {
        const {
            select, 
            mainPerson,
            mapOption,
            sidebarFold,
            nodeSelect,
            globalInfo
        } = this.props;

        return (
            <Fragment>
                <MainSideBar select={select} sbSelect={this._sbSelect}/>
                <SideBar 
                    mainPerson={mainPerson}
                    chCenter={this._chCenter}
                    sbFold={this._sbFold}
                    sidebarFold={sidebarFold}
                    nodeSelect={nodeSelect}
                />
                <MapPallet 
                    sidebarFold={sidebarFold}
                    person={mainPerson}
                />
                <Header/>
                <FooterBar 
                    globalInfo={globalInfo}
                    selectContacter={this._selectContacter}
                    selectConfirmer={this._selectConfirmer}
                />
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({
            select: state.basic.getIn(['basic', 'select']),
            sidebarFold: state.basic.getIn(['basic', 'sidebarFold']),
            nodeSelect: state.tracing.getIn(['pageSets', 'select']),
            mainPerson: state.tracing.get('person'),
            mapOption: state.tracing.get('mapOption'), 
            globalInfo: state.tracing.get('globalInfo'), 
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            tracingActions: bindActionCreators(tracingActions, dispatch),
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Tracing)
)