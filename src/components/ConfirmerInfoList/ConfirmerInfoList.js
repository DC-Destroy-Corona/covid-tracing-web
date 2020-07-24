import React, { Fragment } from 'react';
import './ConfirmerInfoList.css';

import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { get } from 'immutable';

const ConfirmerInfoList = ({
    data
}) => {
    return (
        <div className="ConfirmerInfoList" >
            <div className="infoList">
                <div id="comp-title">
                    <span><strong>확진자 목록</strong></span>
                </div>
                <div className="list-body">
                    <div className="table-thead" style={{
                        borderBottom: '1px solid #aaa'
                    }}>
                        <div className="table-confId"><strong>확진 번호</strong></div>
                        <div className="table-gender"><strong>성별</strong></div>
                        <div className="table-region"><strong>거주지</strong></div>
                        <div className="table-confDate"><strong>확진 일자</strong></div>
                        <div className="table-visit"><strong>방문 지점</strong></div>
                    </div>
                    <div className="table-body">
                        <Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment>
                        <Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment><Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment>
                        <Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment>
                        <Fragment>
                            <div className="table-confId">123456</div>
                            <div className="table-gender">여자</div>
                            <div className="table-region">대구광역시</div>
                            <div className="table-confDate">2020-04-02</div>
                            <div className="table-visit content" onClick={onclick}>
                                        정보보기
                                        <div className="ico">
                                            <FaRegArrowAltCircleRight size={14}/>
                                    </div>
                            </div>
                            
                        </Fragment>
                        {/* {data.map((elem, idx)=>{
                            return(
                                <div 
                                    className="table-row" 
                                    key={idx} 
                                    style={{
                                        backgroundColor: idx%2==0 ? '#F2F5F9' : '#fff'
                                    }}
                                    onClick={()=>{
                                    const id = elem.get('confPatientId')
                                }}>
                                        <Fragment>
                                            <div className="table-no">{idx+1}</div>
                                            <div className="table-confId">{elem.get('confPatientId')}</div>
                                            <div className="table-gender">{elem.get('gender')}</div>
                                            <div className="table-region">{elem.get('region')}</div>
                                            <div className="table-confDate">{elem.get('confDate')}</div>
                                            <div className="table-visit content">*/}
                        {/* {elem.get('visit')} */}
                        {/*<button className="wrap-btn">
                                                    정보보기
                                                    <FaRegArrowAltCircleRight size={15} style={{ 
                                                        marginTop:'5px',
                                                        marginLeft :'5px'
                                                    }} />
                                                </button>
                                            </div>
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

export default ConfirmerInfoList;
