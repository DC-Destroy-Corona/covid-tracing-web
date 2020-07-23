/*global kakao*/

import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as tracingActions from 'store/modules/tracing';
import * as basicActions from 'store/modules/basic';
import TextTruncate from 'react-text-truncate';
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
    FooterBar,
    InfoTable,
    SearchTable
} from 'components';

var map = null;

var overlay = null
var markers = [];
var polyline = null

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

        var markerImage = new kakao.maps.MarkerImage(
            markerOption.imageSrc, 
            markerOption.imageSize,
            markerOption.imgOptions
        );

        var marker = new kakao.maps.Marker({
            position: pos, // 마커의 위치
            image: markerImage 
        })

        marker.setMap(map);
        markers.push(marker) //add list
        return pos
    }

    _createLine = ({linePath,map}) => {
        //if(linePath.size<=1) return

        polyline = new kakao.maps.Polyline({
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
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.TOPLEFT);
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);
    }

    _createOverlay = (moveLatLon, node, idx) => {
        //#infowindow은 common/App.css에 정의
        var content = `
            <div id="infowindow">
                <div class="infowindow-info">
                    <header>
                        ${idx}번째 방문지점 정보 상세
                        <div class="infowindow-close" onClick="(()=>{overlay.setMap(null)})()" title="닫기"></div>
                    </header>
                    <div class="infowindow-address">
                        ${node.get('location')}
                    </div>
                    <div class="infowindow-h2">
                        접촉자 ()
                    </div>
                </div>
            </div>
        ` // 오버레이

        overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: moveLatLon 
        });
    }

    _chCenter = (node, idx) => {
        const { tracingActions } = this.props;
        tracingActions.chSelect(idx);

        // var moveLatLon = new kakao.maps.LatLng(node.get('latitude'), node.get('longitude'));

        this._overlayClear();
        this._changeMapLevel()
        map.panTo(markers[idx-1].getPosition());
        this._createOverlay(markers[idx-1].getPosition(), node, idx)
    }

    //지도 정보 초기화
    _clearVisitInfo = (arg) => {
        for(let i=0; i<markers.length; i++){
            markers[i].setMap(arg)
        }
        markers = []
        if(polyline) polyline.setMap(arg)
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

    _overlayClear = () => {
        if(overlay){
            overlay.setMap(null)
            overlay = null
        }
    }

    //접촉자 선택
    _selectContacter = (id) =>{
        const { tracingActions } = this.props;
        tracingActions.getContactorInfo(id)
        this._overlayClear()
    }

    //확진자 선택
    _selectConfirmer = (id) =>{
        const { tracingActions } = this.props;
        tracingActions.getConfirmerInfo(id)
        this._overlayClear()
    }

    _chListPage = () => {
        const { tracingActions, isHide } = this.props;
        tracingActions.chList(!isHide)
    }

    componentDidMount() {

        const {
            tracingActions,
            mainPerson,
            match,
            location
        } = this.props;

        if(match.params.type===1)
            tracingActions.getConfirmerInfo(match.params.id)
        else
            tracingActions.getConfirmerInfo(match.params.id)

        //default props initialze
        tracingActions.chSelect(null);

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
            mainPerson,
            nodeSelect
        } = this.props;

        this._clearVisitInfo(null) //마커 초기화
        if(mainPerson){
            this._createVisitInfo(mainPerson, map)

            //처음 진입했을 때
            if(nodeSelect===null && mainPerson.get('movingInfo').size>=1)
                this._chCenter(mainPerson.getIn(['movingInfo','0']),1)
        }
            
    }

    render() {
        const {
            select, 
            mainPerson,
            mapOption,
            sidebarFold,
            nodeSelect,
            isHide,
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
                {/* <FooterBar 
                    globalInfo={globalInfo}
                    selectContacter={this._selectContacter}
                    selectConfirmer={this._selectConfirmer}
                /> */}
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
            isHide: state.tracing.getIn(['pageSets', 'isHide']),
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