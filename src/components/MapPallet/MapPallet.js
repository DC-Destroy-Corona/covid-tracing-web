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

const MapPallet = ({toggle}) => {
    // const mapContainer = useRef();
    // useEffect(()=>{
    //     kakao.maps.load(()=>{
    //         const el = document.getElementById('map')
    //         const mapOption = {
    //             center: new kakao.maps.Coords(523951.25, 1085073.75),
    //             level: 13
    //         }
    //         let map = new kakao.maps.Map(el, mapOption)
    //     })
    // })

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