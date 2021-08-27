import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar({ user }) {

const body = document.getElementsByTagName('body')[0]

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}




return (

<div className="navbar">
<ul className="navbar-nav">
    <li className="nav-item">
        <a className="nav-link">
            <i className="fas fa-bars" onClick={collapseSidebar}></i>
        </a>
    </li>
    <li  className="nav-item">
    <Link to="/"> <img src="https://i.ibb.co/z6kY5ng/AT-pro-white.png" alt="Protection+" className="logo logo-dark"/> </Link>
    </li>
</ul>

<ul className="navbar-nav nav-right">

    <li className="nav-iteme avt-wrapper">
        <div className="avt dropdown">
{user.avatar ? <img className="dropdown-toggle" data-toggle="user-menu" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/> : <img className="dropdown-toggle" data-toggle="user-menu" src="https://i.ibb.co/Gc5wGFc/Untitled-1.png"/>}
<ul id="user-menu" className="dropdown-menu">
                <li  className="dropdown-menu-item">
                    <a href="/profile/<%= user.id %>" className="dropdown-menu-link">
                        <div>
                            <i className="fas fa-user-tie"></i>
                        </div>
                        <span>Profile</span>
                    </a>
                </li>


                <li  className="dropdown-menu-item">
                    <a href="/logout" className="dropdown-menu-link">
                        <div>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </li>
</ul>
</div>
)
}