import React from 'react'
import { getUserDetals, getBotGuilds, getGuildChannels, getGuildProtection, getGuildsArray, getGuildAdmins, getGuild } from '../../../utils/api'
import './index.css'
import axios from 'axios'
import { Loader, Navbar, Sidebar } from '../../components/index'
import { Link } from 'react-router-dom'

export function ProtectionPage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ loading , setLoading ] = React.useState(true)
  const [ channels , setChannels ] = React.useState([])
  const [ active, setActive  ] = React.useState(1) 
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  const [ GuildOwner, setGuildOwner  ] = React.useState([])

  const [ Gprotection, setGprotection ] = React.useState({
guildID: match.params.guildID,
userID: match.params.guildID,
accessToken: null,

ChannelCreate_limits: "0",
ChannelCreate_timer: "30",
ChannelCreate_channelID: null,
ChannelCreate_type: "Seconds",
ChannelCreate_toggle: "off",

ChannelDelete_limits: "0",
ChannelDelete_timer: "30",
ChannelDelete_channelID: null,
ChannelDelete_type: "Seconds",
ChannelDelete_toggle: "off",

RoleCreate_limits: "0",
RoleCreate_timer: "30",
RoleCreate_channelID: null,
RoleCreate_type: "Seconds",
RoleCreate_toggle: "off",

RoleDelete_limits: "0",
RoleDelete_timer: "30",
RoleDelete_channelID: null,
RoleDelete_type: "Seconds",
RoleDelete_toggle: "off",

KickMembers_limits: "0",
KickMembers_timer: "30",
KickMembers_channelID: null,
KickMembers_type: "Seconds",
KickMembers_toggle: "off",

BanMembers_limits: "0",
BanMembers_timer: "30",
BanMembers_channelID: null,
BanMembers_type: "Seconds",
BanMembers_toggle: "off",

Anti_bots: "off",
Anti_links: "off",
Return_channel: "off",
Return_role: "off",
punishment: "removerole",

})
  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      setGprotection({ ...Gprotection, userID: data.id, accessToken: data.accessToken })
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
      getGuildChannels(match.params.guildID).then(({data}) => setChannels(data))
      getGuild(match.params.guildID).then(({data}) => setGuildOwner(data.ownerID))
      getBotGuilds().then(data => setBotGuilds(data.data))
      getGuildProtection(match.params.guildID).then(({data}) => {
        setGprotection({ 
          ...Gprotection,
          ChannelCreate_limits: data.ChannelCreate_limits,
          ChannelCreate_timer: data.ChannelCreate_timer,
          ChannelCreate_channelID: data.ChannelCreate_channelID,
          ChannelCreate_type: data.ChannelCreate_type,
          ChannelCreate_toggle: data.ChannelCreate_toggle,

          ChannelDelete_limits: data.ChannelDelete_limits,
          ChannelDelete_timer: data.ChannelDelete_timer,
          ChannelDelete_channelID: data.ChannelDelete_channelID,
          ChannelDelete_type: data.ChannelDelete_type,
          ChannelDelete_toggle: data.ChannelDelete_toggle,

          RoleCreate_limits: data.RoleCreate_limits,
          RoleCreate_timer: data.RoleCreate_timer,
          RoleCreate_channelID: data.RoleCreate_channelID,
          RoleCreate_type: data.RoleCreate_type,
          RoleCreate_toggle: data.RoleCreate_toggle,

          RoleDelete_limits: data.RoleDelete_limits,
          RoleDelete_timer: data.RoleDelete_timer,
          RoleDelete_channelID: data.RoleDelete_channelID,
          RoleDelete_type: data.RoleDelete_type,
          RoleDelete_toggle: data.RoleDelete_toggle,

          KickMembers_limits: data.KickMembers_limits,
          KickMembers_timer: data.KickMembers_timer,
          KickMembers_channelID: data.KickMembers_channelID,
          KickMembers_type: data.KickMembers_type,
          KickMembers_toggle: data.KickMembers_toggle,

          BanMembers_limits: data.BanMembers_limits,
          BanMembers_timer: data.BanMembers_timer,
          BanMembers_channelID: data.BanMembers_channelID,
          BanMembers_type: data.BanMembers_type,
          BanMembers_toggle: data.BanMembers_toggle,

          Anti_bots: data.Anti_bots,
          Anti_links: data.Anti_links,
          Return_channel: data.Return_channel,
          Return_role: data.Return_role,
          punishment: data.punishment,
        })
      })

    } else {
      history.push("/")
    }
    }).then(() => {
setTimeout(() => {
setLoading(false)
}, 1000)
})


  }, [])

  let types = [ "Days", "Hours", "Minutes", "Seconds" ]
  let punishments = [ "removerole", "ban", "kick" ]

  function hideAndResetSave() {
          getGuildProtection(match.params.guildID).then(({data}) => {
        setGprotection({ 
          ...Gprotection,
          ChannelCreate_limits: data.ChannelCreate_limits,
          ChannelCreate_timer: data.ChannelCreate_timer,
          ChannelCreate_channelID: data.ChannelCreate_channelID,
          ChannelCreate_type: data.ChannelCreate_type,
          ChannelCreate_toggle: data.ChannelCreate_toggle,

          ChannelDelete_limits: data.ChannelDelete_limits,
          ChannelDelete_timer: data.ChannelDelete_timer,
          ChannelDelete_channelID: data.ChannelDelete_channelID,
          ChannelDelete_type: data.ChannelDelete_type,
          ChannelDelete_toggle: data.ChannelDelete_toggle,

          RoleCreate_limits: data.RoleCreate_limits,
          RoleCreate_timer: data.RoleCreate_timer,
          RoleCreate_channelID: data.RoleCreate_channelID,
          RoleCreate_type: data.RoleCreate_type,
          RoleCreate_toggle: data.RoleCreate_toggle,

          RoleDelete_limits: data.RoleDelete_limits,
          RoleDelete_timer: data.RoleDelete_timer,
          RoleDelete_channelID: data.RoleDelete_channelID,
          RoleDelete_type: data.RoleDelete_type,
          RoleDelete_toggle: data.RoleDelete_toggle,

          KickMembers_limits: data.KickMembers_limits,
          KickMembers_timer: data.KickMembers_timer,
          KickMembers_channelID: data.KickMembers_channelID,
          KickMembers_type: data.KickMembers_type,
          KickMembers_toggle: data.KickMembers_toggle,

          BanMembers_limits: data.BanMembers_limits,
          BanMembers_timer: data.BanMembers_timer,
          BanMembers_channelID: data.BanMembers_channelID,
          BanMembers_type: data.BanMembers_type,
          BanMembers_toggle: data.BanMembers_toggle,

          Anti_bots: data.Anti_bots,
          Anti_links: data.Anti_links,
          Return_channel: data.Return_channel,
          Return_role: data.Return_role,
          punishment: data.punishment,
        })
      })
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
  }

  function hideSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
  }

  function showSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "1"
  }

  document.addEventListener("change", () => {
    showSave()
  })

function ChannelCreate_limits_post(e) {
  setGprotection({ ...Gprotection, ChannelCreate_limits: e.target.value })
}

function ChannelDelete_limits_post(e) {
  setGprotection({ ...Gprotection, ChannelDelete_limits: e.target.value })
}

function RoleCreate_limits_post(e) {
  setGprotection({ ...Gprotection, RoleCreate_limits: e.target.value })
}

function RoleDelete_limits_post(e) {
  setGprotection({ ...Gprotection, RoleDelete_limits: e.target.value })
}

function KickMembers_limits_post(e) {
  setGprotection({ ...Gprotection, KickMembers_limits: e.target.value })
}

function BanMembers_limits_post(e) {
  setGprotection({ ...Gprotection, BanMembers_limits: e.target.value })
}


function OnSubmit(e) {
  e.preventDefault()
  axios.put('https://api.ppbot.cc/protection', Gprotection).then(respone => {
    console.log(respone)
  }).catch(err => {
    console.log(err)
  })
  hideSave()
}


return (
<div> 
<Navbar user={user} />

{ 
loading
?
<div>
<Loader />
</div>
:

BotGuilds.includes(match.params.guildID) ? 

UserGuilds.includes(match.params.guildID) ?

GuildAdmins.includes(user.id) ?

user.id === GuildOwner ?

<div>
<form onSubmit={ OnSubmit }>
<Sidebar active="protection" guildID={ match.params.guildID } />


<div class="protection_nav">
  <div onClick={ () => setActive(1) } class={ active === 1 ? "protection_box protection_active" : "protection_box" }>
    <div class="protection_box_a">
      <a>Limits</a>
    </div>
  </div>

  <div onClick={ () => setActive(2) } class={ active === 2 ? "protection_box protection_active" : "protection_box" }>
    <div class="protection_box_a">
      <a>Timer</a>
    </div>
  </div>
  
  <div onClick={ () => setActive(3) } class={ active === 3 ? "protection_box protection_active" : "protection_box" }>
    <div class="protection_box_a">
      <a>Logs</a>
    </div>
  </div>

  <div onClick={ () => setActive(5) } class={ active === 5 ? "protection_box protection_active" : "protection_box" }>
    <div class="protection_box_a">
      <a>Punishment</a>
    </div>
  </div>

  <div onClick={ () => setActive(4) } class={ active === 4 ? "protection_box protection_active" : "protection_box" }>
    <div class="protection_box_a">
      <a>Other</a>
    </div>
  </div>

</div>


<div id="limits" class={ active === 1 ? "tabcontent tablinks" : "hidden1" }>

<div class="protection">
<div class="protection_conteter">

<div class="protection_input_box">
<a>Channel create limits</a>  
<input id="1" class="protection_input" onChange={ChannelCreate_limits_post} max="10" min="0" value={ Gprotection.ChannelCreate_limits } type="number" />
</div>

<div class="protection_input_box">
<a>Channel delete limits</a>  
<input id="2" class="protection_input" onChange={ChannelDelete_limits_post} max="10" min="0" value={ Gprotection.ChannelDelete_limits } type="number"/>
</div>

<div class="protection_input_box">
<a>Role create limits</a>  
<input id="3" class="protection_input" onChange={RoleCreate_limits_post} max="10" min="0" value={ Gprotection.RoleCreate_limits } type="number"/>
</div>

<div class="protection_input_box">
<a>Role delete limits</a>
<input id="4" class="protection_input" onChange={RoleDelete_limits_post} max="10" min="0" value={ Gprotection.RoleDelete_limits } type="number"/>
</div>

<div class="protection_input_box">
<a>Kick limits</a>
<input id="5" class="protection_input" onChange={KickMembers_limits_post} max="10" min="0" value={ Gprotection.KickMembers_limits } type="number"/>
</div>

<div class="protection_input_box">
<a>Ban limits</a>
<input id="6" class="protection_input" onChange={BanMembers_limits_post} max="10" min="0" value={ Gprotection.BanMembers_limits } type="number"/>
</div>

</div>
</div>

</div>

<div id="Timer" class={ active === 2 ? "tabcontent tablinks" : "hidden1" }>
  <div class="protection">
  <div class="protection_conteter">
  
  <div class="protection_timer_box">
  
  <a>Channel create timer</a>
  <div class="protection_timer">
    <input onChange={ (e) => setGprotection({ ...Gprotection, ChannelCreate_timer: e.target.value }) } class="protection_timer_input" min="1" value={ Gprotection.ChannelCreate_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, ChannelCreate_type: e.target.value }) } class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.ChannelCreate_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  <a>Channel delete timer</a>
  <div class="protection_timer">
    <input  onChange={ (e) => setGprotection({ ...Gprotection, ChannelDelete_timer: e.target.value }) } class="protection_timer_input" min="1" value={ Gprotection.ChannelDelete_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, ChannelDelete_type: e.target.value }) } class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.ChannelDelete_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  <a>Role create timer</a>
  <div class="protection_timer">
    <input  onChange={ (e) => setGprotection({ ...Gprotection, RoleCreate_timer: e.target.value }) } class="protection_timer_input" min="1" value={ Gprotection.RoleCreate_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, RoleCreate_type: e.target.value }) } class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.RoleCreate_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  <a>Role delete timer</a>
  <div class="protection_timer">
    <input class="protection_timer_input" onChange={ (e) => setGprotection({ ...Gprotection, RoleDelete_timer: e.target.value }) } min="1" value={ Gprotection.RoleDelete_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, RoleDelete_type: e.target.value }) } class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.RoleDelete_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  <a>Kick members timer</a>
  <div class="protection_timer">
    <input onChange={ (e) => setGprotection({ ...Gprotection, KickMembers_timer: e.target.value }) } class="protection_timer_input" min="1" value={ Gprotection.KickMembers_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, KickMembers_type: e.target.value }) }  class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.KickMembers_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  <a>Ban members timer</a>
  <div class="protection_timer">
    <input onChange={ (e) => setGprotection({ ...Gprotection, BanMembers_timer: e.target.value }) } class="protection_timer_input" min="1" value={ Gprotection.BanMembers_timer } type="number" />
    <select onChange={ (e) => setGprotection({ ...Gprotection, BanMembers_type: e.target.value }) } class="Protection_timer_select">
    {
      types.map(t => ( 
      t === Gprotection.BanMembers_type
      ?
      <option value={ t } selected>{ t }</option>
      :
      <option value={ t }>{ t }</option>
      )) 
    }
    </select>
  </div>
  
  </div>
  
  </div>
  </div>
  </div>

<div id="logs" class={ active === 3 ? "tabcontent tablinks" : "hidden1" } >
<div class="protection">
<div class="protection_conteter">


<div class="protection_input_box">
<a>Channel create</a>  
<div class="ProtectionSelect">
<select onChange={ 
  (e) => 
  e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, ChannelCreate_toggle: "off", ChannelCreate_channelID: "Don't send" }) 
  : 
  setGprotection({ ...Gprotection, ChannelCreate_channelID: e.target.value, ChannelCreate_toggle: "on" }) } class="test_select">

{
Gprotection.ChannelCreate_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.ChannelCreate_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>

<div class="protection_input_box">
<a>Channel delete</a>
<div class="ProtectionSelect">
<select onChange={ 
  (e) => e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, ChannelDelete_toggle: "off", ChannelDelete_channelID: "Don't send" }) 
  :
  setGprotection({ ...Gprotection, ChannelDelete_channelID: e.target.value, ChannelDelete_toggle: "on" }) } 
  class="test_select">

{
Gprotection.ChannelDelete_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.ChannelDelete_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>

<div class="protection_input_box">
<a>Role create</a>
<div class="ProtectionSelect">
<select onChange={ 
  (e) => e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, RoleCreate_toggle: "off", RoleCreate_channelID: "Don't send" }) 
  : 
  setGprotection({ ...Gprotection, RoleCreate_channelID: e.target.value, RoleCreate_toggle: "on" }) } 
  class="test_select">

{
Gprotection.RoleCreate_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.RoleCreate_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>

<div class="protection_input_box">
<a>Role delete</a>
<div class="ProtectionSelect">
<select onChange={ 
  (e) => e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, RoleDelete_toggle: "off", RoleDelete_channelID: "Don't send" }) 
  : 
  setGprotection({ ...Gprotection, RoleDelete_channelID: e.target.value, RoleDelete_toggle: "on" }) } 
  class="test_select">

{
Gprotection.RoleDelete_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.RoleDelete_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>
  
<div class="protection_input_box">
<a>Kick member</a>
<div class="ProtectionSelect">
<select onChange={ 
  (e) => e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, KickMembers_toggle: "off", KickMembers_channelID: "Don't send" }) 
  : 
  setGprotection({ ...Gprotection, KickMembers_channelID: e.target.value, KickMembers_toggle: "on" }) } 
  class="test_select">

{
Gprotection.KickMembers_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.KickMembers_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>
  
<div class="protection_input_box">
<a>Ban member</a>
<div class="ProtectionSelect">
<select onChange={ 
  (e) => e.target.value === "Don't send" 
  ? 
  setGprotection({ ...Gprotection, BanMembers_toggle: "off", BanMembers_channelID: "Don't send" }) 
  : 
  setGprotection({ ...Gprotection, BanMembers_channelID: e.target.value, BanMembers_toggle: "on" }) } 
  class="test_select">

{
Gprotection.BanMembers_toggle !== "on"
?
<>
<option value="Don't send" selected>Don't send</option>
{
channels.map(c => (

<option value={ c.id }>{ c.name }</option>

))
}
</>
:
<>
<option value="Don't send" >Don't send</option>
{
channels.map(c => (

c.id === Gprotection.BanMembers_channelID
?
<option value={ c.id } selected>{ c.name }</option>
:
<option value={ c.id }>{ c.name }</option>

))
}
</>

}

</select>
</div>
</div>

</div>
</div>

</div>


<div id="other" class={ active === 4 ? "tabcontent tablinks" : "hidden1" }>
<div class="protection">
<div class="protection_conteter">

<div class="protection_input_box">


<a style={{ fontSize: "20px;" }} class="Anti_bots_a">Anti bots protection <br /> <span style={{ fontSize: "11px;",  color: "gray" }}>(Only server owner can add bots)</span> </a>


      
<label class="ProtectionSwitch">
<input type="checkbox" onChange={ (e) => 
e.target.checked === true 
? 
setGprotection({ ...Gprotection, Anti_bots: "on" }) 
: 
setGprotection({ ...Gprotection, Anti_bots: "off" }) 
}
checked={ Gprotection.Anti_bots === "on" ? true : false } />
<span class="slider round"></span>
</label>




<a style={{ fontSize: "20px;" }} class="Anti_bots_a">Anti links protection <br /> <span style={{ fontSize: "11px;",  color: "gray" }}>(Only admins can send links)</span> </a>
<label class="ProtectionSwitch">
<input type="checkbox" onChange={ (e) => 
e.target.checked === true 
? 
setGprotection({ ...Gprotection, Anti_links: "on" }) 
: 
setGprotection({ ...Gprotection, Anti_links: "off" }) 
}
checked={ Gprotection.Anti_links === "on" ? true : false } />
<span class="slider round"></span>
</label>


<a style={{ fontSize: "20px;" }} class="Anti_bots_a">Return channel <br /> <span style={{ fontSize: "11px;",  color: "gray" }}>(Return channel after delete as it was)</span> </a>
<label class="ProtectionSwitch">
<input type="checkbox" onChange={ (e) => 
e.target.checked === true 
? 
setGprotection({ ...Gprotection, Return_channel: "on" }) 
: 
setGprotection({ ...Gprotection, Return_channel: "off" }) 
}
checked={ Gprotection.Return_channel === "on" ? true : false } />
<span class="slider round"></span>
</label>



<a style={{ fontSize: "20px;" }} class="Anti_bots_a">Return role <br /> <span style={{ fontSize: "11px;",  color: "gray" }}>(Return role after delete as it was)</span> </a>
<label class="ProtectionSwitch">
<input type="checkbox" onChange={ (e) => 
e.target.checked === true 
? 
setGprotection({ ...Gprotection, Return_role: "on" }) 
: 
setGprotection({ ...Gprotection, Return_role: "off" }) 
}
checked={ Gprotection.Return_role === "on" ? true : false } />
<span class="slider round"></span>
</label>





</div>

</div>
</div>

</div>

<div id="other" class={ active === 5 ? "tabcontent tablinks" : "hidden1" }>
<div class="protection">
<div class="protection_conteter">

<div class="protection_input_box">

<a style={{ fontSize: "20px", marginTop: "20px" }} class="Anti_bots_a">Protection punishment</a>
<div>
<select onChange={ (e) => setGprotection({ ...Gprotection, punishment: e.target.value }) } class="Protection_timer_select">
{
punishments.map(punishment => ( 

punishment === Gprotection.punishment
?
<option value={ punishment } selected>{ punishment }</option>
:
<option value={ punishment }>{ punishment }</option>

)) 
}
</select>
</div>

</div>

</div>
</div>
</div>

<div className="saveH"></div>

<div className="SaveConteter">
<div id="SaveBox" className="SaveBox">
<h6>You have unsaved changes!</h6>
<div className="SaveButtons">
<button type="submit" className="SaveButton1">Save</button>
<button onClick={hideAndResetSave} type="button" className="SaveButton2">Cancel</button>
</div>
</div>
</div>

</form>

</div>

:

<div className="add_bot_conteter">
  <div className="add_bot_box">
      <a className="add_bot_a">Server owner only ;-(</a>
      <Link to={ `/dashboard/${match.params.guildID}` }><a><button className="add_bot_button">Go back to dashboard</button></a></Link>
  </div>
</div>

:

<div className="add_bot_conteter">
  <div className="add_bot_box">
      <a className="add_bot_a">You don't have permissions ;-(</a>
      <Link to="/dashboard"><a><button className="add_bot_button">Go back to servers</button></a></Link>
  </div>
</div>

:

<div className="add_bot_conteter">
  <div className="add_bot_box">
      <a className="add_bot_a">You are not in this server ;-(</a>
      <Link to="/dashboard"><a><button className="add_bot_button">Go back to servers</button></a></Link>
  </div>
</div>

:
<div className="add_bot_conteter">
  <div className="add_bot_box">
      <a className="add_bot_a">This server requires setup.</a>
      <a href={`https://discord.com/oauth2/authorize?client_id=874557276692836382&permissions=8&response_type=code&scope=bot%20guilds%20guilds.join%20identify&guild_id=${match.params.guildID}`}><button className="add_bot_button">Bot invite link </button></a>
  </div>
</div>
}

</div>
  )
}