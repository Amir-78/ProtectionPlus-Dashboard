import React from 'react'
import { Link } from 'react-router-dom'

export function UserSidebar({ active }) {

return (

<div>
    
<div id="sidebar" className="sidebar">
<ul className="sidebar-nav">
    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard`}>
        <a className={ active === "servers" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
                <i className="fad fa-server"></i>
            </div>
            <span>Servers</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/profile`}>
        <a className={ active === "profile" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
                <i className="fad fa-user"></i>
            </div>
            <span>Profile</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/background`}>
        <a className={ active === "background" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
                <i className="fad fa-address-card"></i>
            </div>
            <span>Profile&nbsp;Background</span>
        </a>
      </Link>
    </li>

</ul>
</div>
</div>

)
}