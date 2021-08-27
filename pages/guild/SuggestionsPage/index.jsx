import React from 'react'
import { getUserDetals, getBotGuilds, getGuildEmojies, getGuildChannels, getGuildSuggestions, getGuild, getGuildsArray, getGuildAdmins } from '../../../utils/api'
import '../DashboardPage/index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import axios from 'axios'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import { Link } from 'react-router-dom'

export function SuggestionsPage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ loading , setLoading ] = React.useState(true)
  const [ display, setDisplay ] = React.useState("none")
  const [ display2, setDisplay2 ] = React.useState("none")
  const [ Data, setData ] = React.useState({ guildID: match.params.guildID, userID: null, accessToken: null, corect: { emoji: "👍", id: "+1", custom: false, customEmoji: null }, wrong: { emoji: "👎", id: "-1", custom: false, customEmoji: null }, channelID: null, toggle: "off" })
  const [ emojies, setEmojies ] = React.useState([])
  const [ channels, setChannels ] = React.useState([])
  const [ guildName, setGuildName ] = React.useState(null)
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])

  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      setData({ ...Data, userID: data.id, accessToken: data.accessToken })
      getGuildEmojies(match.params.guildID).then(({data}) => setEmojies(data))
      getGuildSuggestions(match.params.guildID).then(({data}) => setData({ ...Data, corect: data.corectEmoji[0], wrong: data.wrongEmoji[0], toggle: data.toggle, channelID: data.channelID  }))
      getGuildChannels(match.params.guildID).then(({data}) => setChannels(data))
      getGuild(match.params.guildID).then(({data}) => setGuildName(data.name))
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
      getBotGuilds().then(data => setBotGuilds(data.data))
      setTimeout(() => {
        console.clear()
      }, 3000)
    } else {
      history.push("/")
    }
    })
    .then(() => {
    setTimeout(() => {
    setLoading(false)
    }, 1000)
    })

  }, [])

  function hideAndResetSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
    getGuildSuggestions(match.params.guildID).then(({data}) => setData({ ...Data, corect: data.corectEmoji[0], wrong: data.wrongEmoji[0], toggle: data.toggle, channelID: data.channelID  }))
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

const customEmojis = []
emojies.forEach(e => {
  let obj = { name: e.name, short_names: [`${e.name}`], text: '', emoticons: [], imageUrl: e.url, native: `${e.id}`,}
  customEmojis.push(obj)
})

  function Corect() {
    if(display === "none") {
      setDisplay("block")
      setDisplay2("none")
    } else {
      setDisplay("none")
    }
  }

  function Wrong() {
    if(display2 === "none") {
      setDisplay2("block")
      setDisplay("none")
    } else {
      setDisplay2("none")
    }
  }

function CorectOnClick(e) {
  setDisplay("none")
  if(e.custom === true) {
    setData({ ...Data, corect: { emoji: customEmojis.find(m => m.name === e.name).imageUrl, id: e.id, custom: true, customEmoji: customEmojis.find(m => m.name === e.name).native } })
  } else {
    setData({ ...Data, corect: { emoji: e.native, id: e.id, custom: false } })
  }
  showSave()
}

function WrongOnClick(e) {
  setDisplay2("none")
  if(e.custom === true) {
    setData({ ...Data, wrong: { emoji: customEmojis.find(m => m.name === e.name).imageUrl, id: e.id, custom: true, customEmoji: customEmojis.find(m => m.name === e.name).native } })
  } else {
    setData({ ...Data, wrong: { emoji: e.native, id: e.id, custom: false } })
  }
  showSave()
}

function save(e) {
  e.preventDefault()
  axios.put('https://api.ppbot.cc/suggestions', Data)
  hideSave()
}

function SelectOnchange (e) {
  setData({ ...Data, channelID: e.target.value })
}


function ToggleChange(e) {
  if(e.target.checked === true) {
    setData({ ...Data, toggle: "on" })
  } else {
    setData({ ...Data, toggle: "off" })
  }
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

<form onSubmit={save}>
<Sidebar active="sugs" guildID={ match.params.guildID } />

<div className="bit-gay">

<div className="autorole_box">

<div className="Autorole_title">

<a>Suggestions</a>
<label>
<input className="toggle" checked={ Data.toggle === "on" ? true : false } onChange={ ToggleChange } type="checkbox" />
<span ></span>
</label>

</div>

<div style={{ height: "35px" }}>
<select onChange={ SelectOnchange } className="tsts">
{ channels.map((channel) => (
channel.id === Data.channelID 
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

))}
</select>
</div>

</div>



<div className="emojis">
<div className="emojis-conteter">

<div className="emoji">
<a>Correct emoji</a>
<button className="btn234" onClick={ Corect } >
<Emoji emoji={Data.corect.custom === true ? { imageUrl: Data.corect.emoji } : { id: Data.corect.id }} size={30} set='twitter'/>
</button>

<Picker emoji=":point_up:" title="Pick your emoji…" onClick={ CorectOnClick } style={ display === "none" ? { display: "none" } : { display: "block" } } custom={ customEmojis } theme="dark" set='twitter' 

i18n={{ 
  categories: { 
    custom: guildName === null ? "Custom" : guildName
  } 
}}

include={[
  "recent", 
  "custom",
  "people", 
  "nature",
  "foods",
  "activity",
  "places",
  "objects",
  "symbols",
  "flags"]}

/>
</div>

</div>

<div className="emojis-conteter">

<div className="emoji">
<a>Wrong emoji</a>
<button className="btn234" onClick={ Wrong } >
<Emoji emoji={Data.wrong.custom === true ? { imageUrl: Data.wrong.emoji } : { id: Data.wrong.id }} size={30} set='twitter'/>
</button>

<Picker emoji=":point_up:" title="Pick your emoji…" onClick={ WrongOnClick } style={ display2 === "none" ? { display: "none" } : { display: "block" } } custom={ customEmojis } theme="dark" set='twitter' 

i18n={{ 
  categories: { 
    custom:  guildName === null ? "Custom" : guildName
  } 
}}

include={[
  "recent", 
  "custom",
  "people", 
  "nature",
  "foods",
  "activity",
  "places",
  "objects",
  "symbols",
  "flags"]}

/>
</div>

</div>
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