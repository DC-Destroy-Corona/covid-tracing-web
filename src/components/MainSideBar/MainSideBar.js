import React, { Fragment } from 'react';
import './MainSideBar.css';
import {MdSearch, MdSettings, MdInsertChart} from 'react-icons/md'

const MainSideBarItem = ({children, isSelect, text}) => {
    return (
        <button className="MainSideBarItem">
            <div>{children}</div>
            <div>{text}</div>
        </button>
    )
}

const MainSideBar = ({}) => {
    return (
        <div className="MainSideBar">
            <MainSideBarItem text="동선조회">
                <MdSearch size={30}/>
            </MainSideBarItem>
            <MainSideBarItem text="관리메뉴">
                <MdSettings size={30}/>
            </MainSideBarItem>
            <MainSideBarItem text="통계">
                <MdInsertChart size={30}/>
            </MainSideBarItem>
        </div>
    )
}

export default MainSideBar;