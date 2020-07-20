import React, { Fragment } from 'react';
import './MainSideBar.css';
import {MdSearch, MdSettings, MdInsertChart} from 'react-icons/md'
import { Link } from 'react-router-dom';

const MainSideBarItem = ({children, isSelect, text, href, onClick}) => {
    return (
        <Link to={href}>
            <button className="MainSideBarItem" 
            id={isSelect? 'select': ''} 
            onClick={onClick}
            disabled={isSelect}>
                <div>{children}</div>
                <div>{text}</div>
            </button>
        </Link>
    )
}

const MainSideBar = ({select, sbSelect}) => {
    return (
        <div className="MainSideBar">
            <MainSideBarItem text="동선조회" href="/tracing" onClick={()=>sbSelect(1)} isSelect={select==1}>
                <MdSearch size={30}/>
            </MainSideBarItem>
            <MainSideBarItem text="관리메뉴" href="/edit" onClick={()=>sbSelect(2)} isSelect={select==2}>
                <MdSettings size={30}/>
            </MainSideBarItem>

            {/* 링크 추가해야함 */}
            {/* <MainSideBarItem text="통계" onClick={()=>sbSelect(3)} isSelect={select==3}>
                <MdInsertChart size={30}/>
            </MainSideBarItem> */}
        </div>
    )
}

export default MainSideBar;