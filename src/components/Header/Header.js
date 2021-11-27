import React from 'react'
import './Header.css'

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

import HeaderOption from '../HeaderOption/HeaderOption';

function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <img className="logo" src="https://www.svgrepo.com/show/9911/linkedin.svg" alt="" />

                <div className="header__search">
                    <SearchIcon />
                    <input className="search" type="text" />
                </div>
            </div>
            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                <HeaderOption avatar="https://i.pravatar.cc/" title="You" />
            </div>
        </div>
    )
}

export default Header
