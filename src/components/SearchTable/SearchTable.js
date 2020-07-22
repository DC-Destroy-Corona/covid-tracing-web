import React, { Fragment } from 'react';
import './SearchTable.css';
import {MdDescription, MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md'
import {CONTACTER_LEFT_THEAD, CONTACTER_RIGHT_THEAD} from 'constants/index'

const PersonsList = ({
    data, 
    columns, 
    title, 
    type, 
    selectFunc
}) => {
    return (
        <div className="PersonsList">
            <header>
                <span>{title} <span id="bold">{`( ${data.size} )`}</span></span>
            </header>
            <div className="list-body">
                <div className="table-thead">
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
                                <div className="table-row" key={idx} onClick={()=>{
                                    const id = type===1 ? elem.get('confPatientId') : elem.get('cntctPatientId')
                                    selectFunc(id)
                                }}>
                                    {
                                        type===1 ? 
                                        <Fragment>
                                            <div className="table-no">{idx+1}</div>
                                            <div className="table-idx">{elem.get('confPatientId')}</div>
                                            <div className="table-arg1">{elem.get('gender')}</div>
                                            <div className="table-arg2">{elem.get('contactorNum')}</div>
                                            <div className="table-arg3">{elem.get('visitPointNum')}</div>
                                        </Fragment> 
                                        :
                                        <Fragment>
                                            <div className="table-no">{idx+1}</div>
                                            <div className="table-idx">{elem.get('cntctPatientId')}</div>
                                            <div className="table-arg1">{elem.get('gender')}</div>
                                            <div className="table-arg2">{elem.get('confPatientId')}</div>
                                            <div className="table-arg3">{elem.get('visitPointNum')}</div>
                                        </Fragment> 
                                    }
                                </div>
                            )
                        })}
                </div>
            </div>
            <footer>
                <div className="table-index">
                    1/100 page
                </div>
                <div className="table-index-btns">
                    <button>맨끝</button>
                    <button>다음</button>
                    <button>5</button>
                    <button>4</button>
                    <button>3</button>
                    <button>2</button>
                    <button>1</button>
                    <button>이전</button>
                    <button>처음</button>
                </div>
            </footer>
        </div>
    )
}


const SearchTable = ({
    chListPage,
    globalInfo, 
    selectContacter, 
    selectConfirmer}) => 
    {
    return (
        <div className="SearchTable">
            <div className="navigation-bar">
                <div className="table-title">
                    <div>
                        <MdDescription size={19}/>
                    </div>
                    <span>확진자 및 접촉자 상세</span>
                </div>
                <div className="navi-cont">
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
                />
                <PersonsList 
                    title={'접촉자 리스트'} 
                    type={2} 
                    columns={CONTACTER_RIGHT_THEAD}
                    data={globalInfo.getIn(['info', 'cntctPatientList'])} 
                    selectFunc={selectContacter}
                />
            </div>
        </div>
    )
}

export default SearchTable;
