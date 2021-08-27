import React from 'react'
import { Link } from 'react-router-dom'

export function Sidebar({ guildID, active }) {

return (

<div>
    
<div id="sidebar" className="sidebar">
<ul className="sidebar-nav">
    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/`}>
        <a className={ active === "overview" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
                <i className="fad fa-eye"></i>
            </div>
            <span>Overview</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/config`}>
        <a className={ active === "config" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
                <i className="fad fa-cog"></i>
            </div>
            <span>Config</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/autorole`}>
        <a className={ active === "autorole" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-user-friends"></i>
            </div>
            <span>Autorole</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/welcomer`}>
        <a className={ active === "welcomer" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-user-plus"></i>
            </div>
            <span>Welcomer</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/logs`}>
        <a className={ active === "logs" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-clipboard-list"></i>
            </div>
            <span>Logs</span>
        </a>
      </Link>
    </li>
 
    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/suggestions`}>
        <a className={ active === "sugs" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-lightbulb"></i>
            </div>
            <span>Suggestions</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/voiceonline`}>
        <a className={ active === "vc" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-microphone"></i>
            </div>
            <span>Voice&nbsp;Online</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/${guildID}/protection`}>
        <a className={ active === "protection" ? "sidebar-nav-link tablinks active" : "sidebar-nav-link tablinks"}>
            <div>
              <i className="fad fa-shield-alt"></i>
            </div>
            <span>Protection</span>
        </a>
      </Link>
    </li>

    <li className="sidebar-nav-item">
      <Link className="sidebar-nav-item" to={`/dashboard/`}>
        <a className="sidebar-nav-link tablinks">
            <div>
              <i className="fad fa-backward"></i>
            </div>
            <span>Back&nbsp;to&nbsp;servers</span>
        </a>
      </Link>
    </li>

</ul>
</div>
</div>

)
}