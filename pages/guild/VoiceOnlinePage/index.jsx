import React from 'react'
import { getUserDetals, getBotGuilds, getGuildsArray, getGuildAdmins } from '../../../utils/api'
import '../DashboardPage/index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function VoiceOnlinePage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ loading , setLoading ] = React.useState(true)
  const [ Data, setData ] = React.useState({ guildID: match.params.guildID, channel: "Voice online [00]", type: "voice" })
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
      getBotGuilds().then(data => setBotGuilds(data.data))
    } else {
      history.push("/")
    }
    })
.then(() => {
setTimeout(() => {
setLoading(false)
}, 1200)
})


  }, [])

  function hideAndResetSave() {
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

  function VConChange(e) {
    setData({ ...Data, channel: e.target.value })
    showSave()
  }

  function TypeOnChange(e) {
    setData({ ...Data, type: e.target.value })
    showSave()
  }

  function save(e) {
    e.preventDefault()
    axios.put('https://api.ppbot.cc/voiceonline', Data)
    hideSave()
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
<Sidebar active="vc" guildID={ match.params.guildID } />



<form onSubmit={ save }>

<div className="VC-Conteter">

<div className="VC"> 

<div className="VC-text">
<a>Voice online</a>
</div>

<div className="input">
<input value={ Data.channel } onChange={ VConChange } type="text" />
</div>

</div>

<div className="VC"> 

<div className="VC-text">
<a>Type</a>
</div>

<div className="VC-select">
<select onChange={TypeOnChange}>
  { 
  Data.type === "voice"
  ?
  <option value="voice" selected>Channel</option>
  :
  <option value="voice">Channel</option>
  }
  {
  Data.type === "category" 
  ?
  <option value="category" selected>Category</option>
  :
  <option value="category">Category</option>
  }
</select>
</div>

</div>

</div>

  <div class="main_box2">
    <div class="note_box">
      <i class="fas fa-exclamation fa-2x"></i>
      <div class="note_box_title">[00] will be replased with the voice online count</div>
    </div>
  </div>

  <div class="main_box">
    <div class="note_box">
      <i class="fas fa-exclamation fa-2x"></i>
      <div class="note_box_title">If server already have channel, just write the name and it will be changed in 5 minutes</div>
    </div>
  </div>

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