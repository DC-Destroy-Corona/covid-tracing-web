import React, { Fragment } from 'react';
import './FooterBar.css';
import {MdDescription} from 'react-icons/md'
import {CONTACTER_THEAD} from 'constants/index'

const SelectTable = ({data, columns, title, style}) => {
    return (
        <div className="SelectTable" style={style}>
                <div id="comp-title">
                    <span>{title} <span id="bold">{`( ${data.length} )`}</span></span>
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
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>12590</td>
                                <td>남</td>
                                <td>12</td>
                                <td>47</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

const FooterBar = () => {
    return (
        <div className="FooterBar">
            {/* <button className="resizable"></button> */}
            <div className="filter">
            </div>
            <div className="table-body">
                <SelectTable data={[]} title="확진자 리스트" columns={CONTACTER_THEAD} style={{
                    borderRight: '1px solid #dadada',
                }}/>
                <SelectTable data={[]} title="접촉자 리스트" columns={CONTACTER_THEAD}/>
            </div>
        </div>
    )
}

export default FooterBar;