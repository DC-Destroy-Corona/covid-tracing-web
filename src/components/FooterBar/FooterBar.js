import React, { Fragment } from 'react';
import './FooterBar.css';
import {MdDescription} from 'react-icons/md'
import {CONTACTER_LEFT_THEAD, CONTACTER_RIGHT_THEAD} from 'constants/index'
import {MdExpandLess, MdExpandMore} from 'react-icons/md'

const SelectTable = ({
    data, 
    columns, 
    title, 
    style, 
    type, 
    selectFunc
}) => {
    return (
        <div className="SelectTable" style={style}>
                <div id="comp-title">
                    <span>{title} <span id="bold">{`( ${data.size} )`}</span></span>
                    <button id="export-btn">
                        <MdDescription style={{
                            marginTop: 1,
                            marginRight: 2,
                            float: 'left'
                        }}/>
                        <span>export csv</span>
                    </button>
                </div>
                <div className="comp-body">
                    <table>
                        <thead>
                            <tr>{
                                columns.map((item, index)=>{
                                    return(
                                        <th id={item.accessor} key={index}>{item.header}</th>
                                    )
                                })
                            }</tr>
                        </thead>
                        <tbody>
                            {data.map((elem, idx)=>{
                                return(
                                    <tr key={idx} onClick={()=>{
                                        const id = type===1 ? elem.get('confPatientId') : elem.get('cntctPatientId')
                                        selectFunc(id)
                                    }}>
                                        {
                                            type===1 ? 
                                            <Fragment>
                                                <td>{elem.get('confPatientId')}</td>
                                                <td>{elem.get('gender')}</td>
                                                <td>{elem.get('cntctPatientNum')}</td>
                                                <td>{elem.get('visitPointNum')}</td>
                                            </Fragment> 
                                            :
                                            <Fragment>
                                                <td>{elem.get('cntctPatientId')}</td>
                                                <td>{elem.get('gender')}</td>
                                                <td>{elem.get('confPatientId')}</td>
                                                <td>{elem.get('visitPointNum')}</td>
                                            </Fragment> 
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

const FooterBar = ({globalInfo, selectContacter, selectConfirmer}) => {
    return (
        <div className="FooterBar">
            {/* <div className="toggle">
                <button className="resizabl mne"><MdExpandLess/>확대</button>
                <button className="resizable-minus"><MdExpandMore/>축소</button>
            </div> */}
            <div className="filter">
                <div className="date-info">
                    <div className="date-info-sync">
                        <span>2020-05-19일 17:00의 정보</span>
                    </div>
                    <div className="date-info-box">
                        <div className="date-info-row">
                            <div className="date-info-key">확진</div>
                            <div className="date-info-val">{globalInfo.getIn(['info','totalConfPatient'])}명</div>
                        </div>
                        <div className="date-info-row">
                            <div className="date-info-key">접촉</div>
                            <div className="date-info-val">{globalInfo.getIn(['info','totalCntctPatient'])}명</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-body">
                <SelectTable 
                    type={1} 
                    data={globalInfo.getIn(['info', 'confPatientList'])} 
                    title="확진자 리스트" 
                    columns={CONTACTER_LEFT_THEAD} 
                    selectFunc={selectConfirmer}
                    style={{
                        borderRight: '1px solid #dadada',
                    }}/>
                <SelectTable 
                    type={2} 
                    data={globalInfo.getIn(['info', 'cntctPatientList'])} 
                    title="접촉자 리스트" 
                    columns={CONTACTER_RIGHT_THEAD}
                    selectFunc={selectContacter}
                />
            </div>
        </div>
    )
}

export default FooterBar;