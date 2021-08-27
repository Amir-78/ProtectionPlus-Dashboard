import React from 'react'
import { getUserDetals, getBotGuilds, getGuildPrefix, getGuild, getGuildsArray, getGuildAdmins } from '../../../utils/api'
import '../DashboardPage/index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';


export function ConfigPage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ Data, setData ] = React.useState({ accessToken: null, prefix: "+", guildID: match.params.guildID, userID: null })
  const [ Data2, setData2 ] = React.useState({ accessToken: null, owner: null, guild: match.params.guildID, user: null })
  const [loading , setLoading] = React.useState(true)
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))  
      getBotGuilds().then(data => setBotGuilds(data.data))
      getGuild(match.params.guildID).then(Data => {
        setData2({...Data2 , owner: Data.data.ownerID , user: data.id, accessToken: data.accessToken })
      })
      getGuildPrefix(match.params.guildID).then(data2 => {
        setData({...Data , prefix: data2.data , userID: data.id, accessToken: data.accessToken})
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
  function tst(e) {
    if (e.key === " ") {
        return false;
    }
  }

  function hideSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
    getGuildPrefix(match.params.guildID).then(data2 => {
      setData({...Data , prefix: data2.data , userID: user.id})
    })  
  }

  function showSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "1"
  }

  function ChangeConfig(e) {
    setData({...Data , prefix: e.target.value, userID: user.id})
    showSave()
  }
  
  function SubmitConfig(e) {
    e.preventDefault()
    axios.put('https://api.ppbot.cc/config', Data).then(response => {
      console.log(response)
    }).catch(err => console.log(err))
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
  }

  function SubmitResetAll(e) {
    e.preventDefault()
    axios.put('https://api.ppbot.cc/resetall/5588', Data2)
    setData({...Data , prefix: "+", userID: user.id})
  }

return (
<div> 
<Navbar user={user}/>
{ 
loading
?
<Loader />
:

BotGuilds.includes(match.params.guildID) ? 

UserGuilds.includes(match.params.guildID) ?

GuildAdmins.includes(user.id) ?

<div>
<Sidebar active="config" guildID={match.params.guildID}/>


{
Data2.owner === user.id 
?
<form onSubmit={ SubmitResetAll }>
<div className="resetall_box">
<button type="submit" className="resetall">Reset settings</button>
</div>
</form>
:
<div className="resetall_box">
<div className="tooltip">
<button className="readonly resetall" disabled>Reset settings</button>
<span className="tooltiptext">Only server owner can reset the settings</span>
</div>
</div>
}



<form onSubmit={SubmitConfig}>
<div className="configBox">
<div className="Cbox">
<div className="ConfigText"><a>Server prefix :</a></div>
<input onChange={ChangeConfig} className="ConfigTextarea" onKeyDown={tst} maxLength="10" id="Prefix" name="prefix" rows="5" value={Data.prefix} type="text" required />
</div>
</div>

<div className="SaveConteter">


<div id="SaveBox" className="SaveBox">
<h6>You have unsaved changes!</h6>
<div className="SaveButtons">
<button type="submit" className="SaveButton1">Save</button>
<button onClick={hideSave} type="button" className="SaveButton2">Cancel</button>
</div>
</div>


</div>

</form>

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