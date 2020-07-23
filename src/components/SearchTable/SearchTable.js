import React, { Fragment } from 'react';
import './SearchTable.css';
import {MdDescription, MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md'
import {
    CONTACTER_LEFT_THEAD, 
    CONTACTER_RIGHT_THEAD, 
    PAGE_INDEX_STANDARD
} from 'constants/index'
import { range } from 'd3';

const PersonsList = ({
    data, 
    columns, 
    title, 
    type, 
    selectFunc,
    currentPageIndex,
    totalPageIndex,
    pageIndexList,
    totalElemCnt,
    changeIndex
}) => {
    return (
        <div className="PersonsList">
            <header>
                <span>{title} <span id="bold">{`( ${data.size} )`}</span></span>
            </header>
            <div className="list-body">
                <div className="table-thead" style={{
                    borderBottom: '1px solid #aaa'
                }}>
                    <div className="table-no">No.</div>
                    <div className="table-idx">식별번호</div>
                    {
                        columns.map((item, index)=>{
                            return(
                                <div className={`table-arg${index+1}`} key={index}>{item.header}</div>
                            )
                        })
                    }
                </div>
                <div className="table-body">
                        {data.map((elem, idx)=>{
                            return(
                                <div 
                                    className="table-row" 
                                    key={idx} 
                                    style={{
                                        backgroundColor: idx%2==0 ? '#F2F5F9' : '#fff'
                                    }}
                                    onClick={()=>{
                                    const id = type===1 ? elem.get('confPatientId') : elem.get('cntctPatientId')
                                    selectFunc({
                                        id: id,
                                        type: type
                                    })
                                }}>
                                    {
                                        type===1 ? 
                                        <Fragment>
                                            <div className="table-no">{idx+1+(PAGE_INDEX_STANDARD*(currentPageIndex-1))}</div>
                                            <div className="table-idx">{elem.get('confPatientId')}</div>
                                            <div className="table-arg1">{elem.get('gender')}</div>
                                            <div className="table-arg2">{elem.get('contactorNum')}</div>
                                            <div className="table-arg3">{elem.get('visitPointNum')}</div>
                                            <div className="table-arg4">2020/07/29</div>
                                        </Fragment> 
                                        :
                                        <Fragment>
                                            <div className="table-no">{idx+1}</div>
                                            <div className="table-idx">{elem.get('cntctPatientId')}</div>
                                            <div className="table-arg1">{elem.get('gender')}</div>
                                            <div className="table-arg2">{elem.get('confPatientId')}</div>
                                            <div className="table-arg3">{elem.get('visitPointNum')}</div>
                                            <div className="table-arg4">2020/07/29</div>
                                        </Fragment> 
                                    }
                                </div>
                            )
                        })}
                </div>
            </div>
            <footer>
                <div className="table-index">
                    {currentPageIndex}/{totalPageIndex} page
                </div>
                {totalPageIndex===0? null : <div className="table-index-btns">
                    {currentPageIndex===totalPageIndex ? null : <button onClick={()=>{changeIndex({type: type, index: totalPageIndex})}}>맨끝</button>}
                    {currentPageIndex!==totalPageIndex && (Math.floor(currentPageIndex/5)+1)*5+1 <= totalPageIndex ? <button onClick={()=>{
                        changeIndex({type: type, index: (Math.floor(currentPageIndex/5)+1)*5+1})}}>다음</button> : null}
                    {
                        // pageIndexList.map((item, idx)=>{
                        //     totalElemCnt
                        //     return(
                        //         <button key={idx} onClick={()=>{changeIndex({type: type, index: })}}>{}</button>            
                        //     )
                        // })
                        range((Math.floor(currentPageIndex/5)+1)*5,(Math.floor(currentPageIndex/5)+1)*5-5, -1).map((item)=>{
                            if(item<=totalPageIndex){
                                return(
                                    <button key={item} onClick={()=>{changeIndex({type: type, index: item})}}>{item}</button>
                                )
                            }
                        })
                        
                    }
                    {(Math.floor(currentPageIndex/5))*5-4>=1 ? <button onClick={()=>{
                        changeIndex({type: type, index: (Math.floor(currentPageIndex/5))*5-4})}}>이전</button> : null}
                    {currentPageIndex===1 ? null : <button onClick={()=>{changeIndex({type: type, index: 1})}}>처음</button>}
                </div>}
            </footer>
        </div>
    )
}


const SearchTable = ({
    chListPage,
    globalInfo, 
    selectContacter, 
    selectConfirmer,
    filter,
    changeIndex,
    clickKorea}) => 
    {
    return (
        <div className="SearchTable">
            <div className="SearchTable-wrap">
            <div className="navigation-bar">
                <div className="table-title">
                    <div>
                        <MdDescription size={19}/>
                    </div>
                    <span>확진자 및 접촉자 상세</span>
                </div>
                <div className="navi-cont">
                    <button 
                    onClick={clickKorea}
                    className="select-global-loc" 
                    disabled={filter.get('region')=='kr'}
                    >
                        전국
                    </button>
                    <div className="navi-cont-elem-small">
                        <div className="navi-cont-elem-s-box" style={{borderRight: '1px solid #eee'}}>
                            <div className="navi-cont-elem-s-box-key">확진</div>
                            <div className="navi-cont-elem-s-box-val">{globalInfo.getIn(['info','totalConfPatient'])}</div>
                        </div>
                        <div className="navi-cont-elem-s-box">
                            <div className="navi-cont-elem-s-box-key">접촉</div>
                            <div className="navi-cont-elem-s-box-val">{globalInfo.getIn(['info','totalCntctPatient'])}</div>
                        </div>
                    </div>
                    <div className="navi-cont-info">
                        <div className="navi-cont-elem" style={{height: 385}}>
                            <header>지역별 현황</header>
                            <div style={{padding: '5px 8px'}}>
                                <div className="navi-cont-elem-row" style={{borderBottom: '1px solid #eee', paddingBottom: 5}}>
                                    <div className="navi-cont-elem-tit">지역</div>
                                    <div className="navi-cont-elem-tit">확진</div>
                                </div>
                                <div className="navi-cont-elem-body">
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">서울</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">부산</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">대구</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">인천</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">광주</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">대전</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">울산</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">세종</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">경기</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">강원</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">충북</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">충남</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">전북</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">전남</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">경북</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">경남</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                <div className="navi-cont-elem-row">
                                    <div className="navi-cont-elem-tit">제주</div>
                                    <div className="navi-cont-elem-tit"></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="korea">
                    </div>
                </div>
            </div>
            <div className="table-pallet">
                <PersonsList 
                    title={'확진자 리스트'} 
                    type={1} 
                    columns={CONTACTER_LEFT_THEAD} 
                    data={globalInfo.getIn(['info', 'confPatientList'])} 
                    selectFunc={selectConfirmer}
                    globalInfo={globalInfo}
                    currentPageIndex={globalInfo.getIn(['info', 'currentConfPageIndex'])}
                    totalPageIndex={globalInfo.getIn(['info', 'totalConfPageIndex'])}
                    pageIndexList={filter.get('confPageIndexList')}
                    changeIndex={changeIndex}
                    totalElemCnt={globalInfo.getIn(['info', 'totalConfPatient'])}
                />
                <PersonsList 
                    title={'접촉자 리스트'} 
                    type={2} 
                    columns={CONTACTER_RIGHT_THEAD}
                    data={globalInfo.getIn(['info', 'cntctPatientList'])} 
                    selectFunc={selectContacter}
                    globalInfo={globalInfo}
                    totalElemCnt={globalInfo.getIn(['info', 'totalCntctPatient'])}
                    currentPageIndex={globalInfo.getIn(['info', 'currentCntctPageIndex'])}
                    totalPageIndex={globalInfo.getIn(['info', 'totalCntctPageIndex'])}
                    pageIndexList={filter.get('cntctPageIndexList')}
                    changeIndex={changeIndex}
                />
            </div>
            </div>
        </div>
    )
}

export default SearchTable;
