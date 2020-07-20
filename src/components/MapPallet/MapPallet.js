import React, { Fragment, useEffect, useRef } from 'react';
import './MapPallet.css';

const {kakao} = window;

const MapNavi = ({}) => {
    return (
        <div className="MapNavi">
            <div>
                <span>지역</span>
            </div>
            <div>
                <span>일자</span>
            </div>
            <div>
                <span>확진자</span>
            </div>
            <div>
                <span>접촉자</span>
            </div>
        </div>
    )
}

const MapPallet = ({mainPerson, mapOption}) => {

    const center = mapOption.get('center')
    const level = mapOption.get('level')

    const mapContainer = useRef();
    useEffect(()=>{
        kakao.maps.load(()=>{
            const el = document.getElementById('map')
            const mapOption = {
                center: new kakao.maps.Coords(center.get('latitude'), center.get('longitude')),
                level: level
            }
            let map = new kakao.maps.Map(el, mapOption)
            var mapTypeControl = new kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            _createVisitInfo(mainPerson, map)
        })
    })

    const _createVisitInfo = (mainPerson, map) => {
        let linePath = []
        mainPerson.get('movingInfo').map((elem)=>{

            const longitude = elem.get('longitude')
            const latitude = elem.get('latitude')

            linePath.push(
                _createMark({
                    longitude: longitude,
                    latitude: latitude,
                    map: map
                })
            )
        })

        _createLine({
            linePath: linePath,
            map: map
        })
    }

    const _createMark = ({latitude,longitude, map})=>{

        const pos = new kakao.maps.LatLng(latitude, longitude)
        //마커 생성
        var marker = new kakao.maps.Marker({
            position: pos
        });

        marker.setMap(map);
        return pos
    }

    const _createLine = ({linePath,map}) => {
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

    return (
        <Fragment>
            {/* <MapNavi></MapNavi> */}
            <div className="map-pallet">
                <div id="map">

                </div>
            </div>
        </Fragment>
        
    )
}

export default MapPallet;