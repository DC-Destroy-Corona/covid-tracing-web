/*global kakao*/

import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router';
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
import {SPECIAL_LOC} from 'constants/index'

var map = null;
var projection, path, svg,geoJson, features, bounds, center, m, places;
const HEIGHT = 600, WIDTH = 600

class Welcome extends Component {

    /**------------- basic page function sets------------------*/
    _sbSelect = (idx) => {
        const { basicActions } = this.props;
        basicActions.sbSelect(idx);
    }

    //접촉자 선택
    _selectContacter = ({id,type}) =>{
        const { tracingActions, history } = this.props;
        // tracingActions.getContactorInfo(id)
        history.push(`/tracing/${id}/${type}`);
    }

    //확진자 선택
    _selectConfirmer = ({id,type}) =>{
        const { tracingActions, history } = this.props;
        // tracingActions.getConfirmerInfo(id)
        history.push(`/tracing/${id}/${type}`);
    }

    _chListPage = () => {
        const { tracingActions, isHide } = this.props;
        tracingActions.chList(!isHide)
    }

    _proviceClick = (d) => {
        const { tracingActions,filter } = this.props;
        tracingActions.filterRegion(SPECIAL_LOC[d.properties.name]);
        tracingActions.getGlobalInfo({
            region: SPECIAL_LOC[d.properties.name],
            date: filter.get('date'),
            confPageIndex: 1,
            cntctPageIndex: 1
        })
        var x, y, zoomLevel, CENTERED;
 
        // if( d && CENTERED != d){
        //     var centroid = path.centroid( d);
        //     x = centroid[0];
        //     y = centroid[1];
        //     if( d.properties.name == '제주특별자치도' || d.properties.name == '인천광역시')
        //         zoomLevel = 10;
        //     else if( SPECIAL_CITIES.indexOf( d.properties.name) != -1)
        //         zoomLevel = 15;
        //     else
        //         zoomLevel = 3;
        //     CENTERED = d;
        //     console.log('centered', CENTERED);
        // } else {
        //     x = WIDTH / 2;
        //     y = HEIGHT / 2;
        //     zoomLevel = 1;
        //     CENTERED = null;
        // }

        if( d && CENTERED != d){
            var centroid = path.centroid( d);
            x = centroid[0];
            y = centroid[1];
            CENTERED = d;
        }
        
 
        m.selectAll( "path")
            .classed( "active", CENTERED && function(d) { return d === CENTERED;});
 
        // m.transition()
        //     .duration( 750)
        //     .attr( "transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")scale(" + zoomLevel + ")translate(" + -x + "," + -y + ")")
        //     .style( "stroke-width", 1.5 / zoomLevel + "px");
    }

    _clickKorea = () => {
        const {
            tracingActions,
            filter
        } = this.props;

        tracingActions.filterRegion('kr');
        tracingActions.getGlobalInfo({
            region: 'kr',
            date: filter.get('date'),
            confPageIndex: 1,
            cntctPageIndex: 1
        })
    }

    _changeIndex = ({type, index}) =>{
        const {
            tracingActions,
            filter
        } = this.props;

        if(type===1){
            tracingActions.getGlobalInfo({
                region: filter.get('region'),
                date: filter.get('date'),
                confPageIndex: index,
                cntctPageIndex: filter.get('cntctPageIndex')
            })
        }
        else{
            tracingActions.getGlobalInfo({
                region: filter.get('region'),
                date: filter.get('date'),
                confPageIndex: filter.get('confPageIndex'),
                cntctPageIndex: index
            })
        }
    }

    componentDidMount() {

        const {
            tracingActions,
            mainPerson,
            filter
        } = this.props;

        this._clickKorea()

        //map settings
        const script = document.createElement("script");
        script.async = true;
        script.src = null
        document.head.appendChild(script);
        script.onload = () => {

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
                    .on("click", this._proviceClick);
            })
        }
    }

    componentDidUpdate(){
    }

    render() {
        const {
            select, 
            mainPerson,
            mapOption,
            sidebarFold,
            nodeSelect,
            isHide,
            filter,
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
                    filter={filter}
                    clickKorea={this._clickKorea}
                    changeIndex={this._changeIndex}
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
            filter: state.tracing.get('filter'),
        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            tracingActions: bindActionCreators(tracingActions, dispatch),
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Welcome)
)