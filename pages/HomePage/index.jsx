import React from 'react'
import { getUserDetals, getDetals } from '../../utils/api'
import { Link } from 'react-router-dom' 
import './index.css'
import Typewriter from 'typewriter-effect';
import { Loader } from '../components/index'
import $ from 'jquery'

export function HomePage( { history } ) {

const [ user, setUser ] = React.useState(null)
const [ loading, setLoading  ] = React.useState(true)
const [ detals, setDetals  ] = React.useState({})

React.useEffect(() => {
  setInterval(() => {
	  getUserDetals().then(({data}) => {
    
	  setUser(data)
    getDetals().then(({data}) => setDetals(data))

    setLoading(false)
	  })
    }, 2000)

  }, [])



const logout = () => window.location.href = "https://api.ppbot.cc/logout"
const support = () => window.location.href = "https://discord.gg/YE4JEphRAW"

function openAddbot() {
window.open(`https://discord.com/oauth2/authorize?client_id=874557276692836382&permissions=8&response_type=code&scope=bot%20guilds%20guilds.join%20identify`, "Addbot", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=450, height=600, top=${(window.screen.height / 2) - (600 / 2)}, right=${(window.screen.width / 2) - (450 / 2)}`)
}

function openLogin() {
let win = window.open(`https://api.ppbot.cc/login`, "Login", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=450, height=600, top=${(window.screen.height / 2) - (600 / 2)}, right=${(window.screen.width / 2) - (450 / 2)}`)


document.addEventListener('message', function(message) {
        console.log(message)
});

}

  return (
<div>

{loading 
?
<Loader />
:
 
<div>

   <div class="nav-contiter">
    <div class="nav">
      <img src="https://i.ibb.co/z6kY5ng/AT-pro-white.png" />
      <div class="nav-buttons">
        <button class="unactive-button">Terms</button>
        <button onClick={ support } class="unactive-button">Support</button>
        {
          user
          ?
        <button onClick={ logout } class="active-button">Logout</button>
          :
        <button onClick={ openLogin } class="active-button">Login</button>
        }
      </div>
    </div>
   </div>

<div className="main_conteter">

<div className="main_text">
<a>Make a protected Discord server</a>
</div>

<div className="buttons">
  <button className="buttonn" onClick={ openAddbot } >Add bot</button>
  {user ? <Link to="/dashboard"><button className="buttonn2">Dashboard</button></Link> : <button onClick={ openLogin } className="buttonn2">Login</button>}
</div>
</div>

<div className="contener">
<img className="img" src="https://i.ibb.co/0qknkRj/Untitled-1.png" />
<div className="box">

<div className="box_title">
<a id="title_1">
<Typewriter options={{ strings: ['Why protection plus ?'], autoStart: true, loop: true, }}
/>
</a>
</div>
<div className="box_description">
<a>
Protection plus is a multiple discord bot that can help you to create the best discord server so try him now.
</a>
</div>

</div>
</div>


<div className="footer">

<div className="footer-title">
  <Typewriter options={{ strings: ['What are you waiting for?', 'Try me now !'], autoStart: true, loop: true, }} />
  <div className="split42"></div>
</div>

<div className="footer-box">

  <div className="small-box">
    <i className="fade fad fa-server fa-3x"></i>
    <a className="text2">Total&nbsp;servers</a>
	<a className="number">{ detals.guilds }</a>
  </div>

  <div className="small-box">
    <i className="fade fad fa-users fa-3x"></i>
    <a className="text2">Total&nbsp;users</a>
	<a className="number">{ detals.users }</a>
  </div>

  <div className="small-box">
    <i className="fade fad fa-hashtag fa-3x"></i>
    <a className="text2">Total&nbsp;channels</a>
	<a className="number">{ detals.channels }</a>
  </div>

  <div className="small-box">
    <i className="fade fad fa-terminal fa-3x"></i>
    <a className="text2">Total&nbsp;commands</a>
	<a className="number">{ detals.commands }</a>
  </div>

</div>

</div>

<div style={{ height: "40px" }}></div>

</div>

} 
</div>
  )

}