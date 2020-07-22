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
import * as d3 from "d3";
import * as topojson from "topojson-client";

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

class Welcome extends Component {

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
                    <div class="infowindow-grp">
                        <div class="infowindow-key">식별번호</div>
                        <div class="infowindow-key">방문지점수</div>
                    <div>
                    <div class="infowindow-tb">
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
                        <div class="infowindow-tb-row">
                            <div class="infowindow-tb-val">11</div>
                            <div class="infowindow-tb-val">11</div>
                        <div>
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
            mainPerson
        } = this.props;

        //default props initialze
        tracingActions.getGlobalInfo('kr','0000-00-00', 1,1);

        //map settings
        const script = document.createElement("script");
        script.async = true;
        script.src = null
        document.head.appendChild(script);
        script.onload = () => {

            var SPECIAL_CITIES = ['서울특별시', '인천광역시', '대전광역시', '대구광역시', '부산광역시', '울산광역시', '광주광역시', '세종특별자치시', '제주특별자치도'];
            var HEIGHT = 600, WIDTH = 600
            var projection, path, svg,
                geoJson, features, bounds, center,
                m, places;

            //svg 생성
            svg = d3.select('#korea').append('svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT);

            //map 및 place 생성
            m = svg.append("g").attr("id", "m");
            places = svg.append("g").attr("id", "places");

            //지도 투영-메르카토르 투영법 사용
            projection = d3.geoMercator().translate( [WIDTH / 2, HEIGHT / 2]);
            path = d3.geoPath().projection(projection);

            //topjson파일 read
            const TOPO_URL = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo-simple.json'
            d3.json(TOPO_URL).then((data)=>{
                geoJson = topojson.feature( data, data.objects['skorea_provinces_2018_geo']);
                features = geoJson.features;
                bounds = d3.geoBounds(geoJson);
                center = d3.geoCentroid(geoJson);
 
                var distance = d3.geoDistance( bounds[0],bounds[1]);
                var scale = HEIGHT / distance / Math.sqrt(2) * 1.2;
 
                projection.scale(3300).center(center);

                console.log('center', center);
                console.log('scale', scale);
     
                m.selectAll("path")
                    .data( features)
                    .enter().append( "path")
                    .attr( "class", function(d) { console.log(d);
                        return "municipality c " + d.properties.code;})
                    .attr( "d", path)
                    //.on("click", province_clicked_event);
            })
        }
    }

    componentDidUpdate(){
        const {
            mainPerson
        } = this.props;

        this._clearVisitInfo(null) //마커 초기화
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
            isHide,
            globalInfo
        } = this.props;

        return (
            <Fragment>
                <MainSideBar select={select} sbSelect={this._sbSelect}/>
                <Header/>
                <SearchTable
                    isHide={isHide}
                    chListPage={this._chListPage}
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
    )(Welcome)
)