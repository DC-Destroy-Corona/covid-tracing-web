import React, { Component, Fragment } from 'react';
import { MdClose } from 'react-icons/md'
import './VisitRootAddModal.css';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";

const VisitRootAddModal = ({
    dataModal,
    _handleIsModal,
    createVisitRoot
}) => {

    return (
        <Modal
            isOpen={dataModal}
            style={{
                overlay: {
                    zIndex: 9999,
                    backgroundColor: 'rgba(33,33,33,0.2)'
                },
                content: {
                    padding: 0,
                    borderRadius: '2px',
                    border: '1px solid #555',
                    backgroundColor: '#fff',
                    top: '70px',
                    left: '100px',
                    right: '100px',
                    bottom: '70px',
                    // left: '70px',
                    // right: '70px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    //height: 175,
                    //maxWidth: '550px',
                    overflow: 'hidden'
                    // bottom: '85px',
                }
            }}>
            <div id="VisitRootAddModal">
            <header>
                    <span>방문 지점 등록</span>
                    <button onClick={_handleIsModal}>
                        <MdClose/>
                    </button>
            </header>
            <div className="wrap">
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>도로명 주소</span>
                        </div>
                        <div className="input-item">
                            <input
                                className="input"
                                name="devName"
                                type="text" >
                            </input>
                        </div>
                    </div>
                    <div className="wrap-item">
                        <div className="input-title must">
                            <span>방문 일자</span>
                        </div>
                        <div className="input-item">
                        <div className="datepicker_form">
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            timeInputLabel="Time:"
                            dateFormat="yyyy-MM-dd  hh:mm aa"
                            showTimeInput
                        />
                        <div className="calender_icon">
                            <FcCalendar size={20} />
                        </div>
                    </div>
                        </div>
                    </div>
                    <div className="center">
                        <button onClick={_handleIsModal}>취소</button>
                        <button style={{ marginRight: 0 }} onClick={createVisitRoot}>등록</button>
                    </div>
            </div>
            </div>
        </Modal>
    )
}

export default VisitRootAddModal;