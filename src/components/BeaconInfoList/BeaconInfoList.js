import React, { Fragment } from 'react';
import './BeaconInfoList.css';
    
const BeaconInfoList = ({
        beaconInfoList
    }) => {
        return (
            <div className="BeaconInfoList">
                <div className="infoList">
                <div id="comp-title">
                    <span><strong>비콘 목록</strong></span>
                </div>
                
                <div className="list-body">
                    <div className="table-thead" style={{
                        borderBottom: '1px solid #aaa'
                    }}>
                        <div className="table-major" style={{width: 83}}>No.</div>
                        <div className="table-uuid"><strong>Beacon uuid</strong></div>
                        <div className="table-major"><strong>major</strong></div>
                        <div className="table-minor"><strong>minor</strong></div>
                        <div className="table-streetNameAddr"><strong>도로명 주소</strong></div>
                        <div className="table-major"><strong>major</strong></div>
                        <div className="table-major"><strong>major</strong></div>
                    </div>
                    <div className="table-body">
                        {
                            beaconInfoList.map((item, idx)=>{
                                return(
                                    <Fragment key={idx}>
                                        <div className="table-major" style={{width: 83}}>{idx+1}</div>
                                        <div className="table-uuid">{item.get('uuid')}</div>
                                        <div className="table-major">{item.get('major')}</div>
                                        <div className="table-minor">{item.get('minor')}</div>
                                        <div className="table-streetNameAddr">{item.get('streetNameAddr')}</div>
                                        {/* <div className="table-streetNameAddrDES content">{item.get('streetNameAddrDesc')}</div> */}
                                        <div className="table-major">{item.get('major')}</div>
                                        <div className="table-minor">{item.get('minor')}</div>
                                    </Fragment>
                                )
                            })
                        }
                        {/* <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">경북 경산시 하양읍 하양로 13-13 (대구가톨릭대학교)</div>
                            <div className="table-streetNameAddrDES content">공학관 D2-526호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">경북 경산시 하양읍 하양로 13-13 (대구가톨릭대학교)</div>
                            <div className="table-streetNameAddrDES content">공학관 D2-526호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">경북 경산시 하양읍 하양로 13-13 (대구가톨릭대학교)</div>
                            <div className="table-streetNameAddrDES content">공학관 D2-526호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">경북 경산시 하양읍 하양로 13-13 (대구가톨릭대학교)</div>
                            <div className="table-streetNameAddrDES content">공학관 D2-526호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">경북 경산시 하양읍 하양로 13-13 (대구가톨릭대학교)</div>
                            <div className="table-streetNameAddrDES content">공학관 D2-526호</div>
                        </Fragment>
                        <Fragment>
                            <div className="table-uuid">74278bda-b644-4520-8f0c-720eaf059935</div>
                            <div className="table-major">65504</div>
                            <div className="table-minor">65505</div>
                            <div className="table-streetNameAddr">대구광역시 달성군 현풍읍 테크노북로4길 11(대구테크노폴리스남해오네뜨1차)</div>
                            <div className="table-streetNameAddrDES content">107동 1801호</div>
                        </Fragment> */}
                        {/* {data.map((elem, idx)=>{
                            return(
                                <div 
                                    className="table-row" 
                                    key={idx} 
                                    style={{
                                        backgroundColor: idx%2==0 ? '#F2F5F9' : '#fff'
                                    }}
                                    onClick={()=>{
                                    const id = elem.get('uuid')
                                }}>
                                        <Fragment>
                                            <div className="table-no">{idx+1}</div>
                                            <div className="table-uuid">{elem.get('beaconUuid')}</div>
                                            <div className="table-major">{elem.get('beaconMajor')}</div>
                                            <div className="table-minor">{elem.get('beaconMinor')}</div>
                                            <div className="table-streetNameAddr">{elem.get('beaconStreetNameAddr')}</div>
                                            <div className="table-streetNameAddrDES content">{elem.get('beaconStreetNameAddrDES')}</div>
                                        </Fragment> 
                                </div>
                            )
                        })} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeaconInfoList;