import React from 'react'
import { getUserDetals, getBotGuilds, getGuildRoles, getGuildAutorole, getGuildsArray, getGuildAdmins } from '../../../utils/api'
import '../DashboardPage/index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import Select from 'react-select'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function AutorolePage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ roles, setRoles  ] = React.useState([])
  const [ loading , setLoading ] = React.useState(true)
  const [ loading2 , setLoading2 ] = React.useState(true)
  const [ Data, setData ] = React.useState({ guildID: match.params.guildID, userID: null, accessToken: null, toggle: "off", autoroles: [] })
  const [checkBoxv , setCheckBoxv] = React.useState(false);
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])


  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)

      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))

      getBotGuilds().then(data => setBotGuilds(data.data))
      getGuildRoles(match.params.guildID).then(({data}) => setRoles(data))

      getGuildAutorole(match.params.guildID).then(data2 => {
        if(data2.data.toggle === "on") {
          setCheckBoxv(true)
        } else {
          setCheckBoxv(false)
        }
        setData({ ...Data, accessToken: data.accessToken, userID: data.id , toggle: data2.data.toggle, autoroles: data2.data.autoroles})
        setLoading2(false)
      }).then(() => {
setTimeout(() => {
setLoading(false)
}, 1000)
})

    } else {
      history.push("/")
    }
    })

  }, [])

  function hideAndResetSave() {
    getGuildAutorole(match.params.guildID).then(data2 => {
      if(data2.data.toggle === "on") {
        setCheckBoxv(true)
      } else {
        setCheckBoxv(false)
      }
      setData({ ...Data, toggle: data2.data.toggle, autoroles: data2.data.autoroles})
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

function onChange(e) {
  
const array = []
for(var i = 0; i < e.length; i++) {
  array.push(e[i].value)
}
setData({ ...Data, autoroles: e })
showSave()

}

function checkBox(e) {
  setCheckBoxv(e.target.checked)
  if(e.target.checked === true) {
    setData({ ...Data, toggle: "on" })
  } else {
    setData({ ...Data, toggle: "off" })
  }
  showSave()
}

function SubmitConfig(e) {
  e.preventDefault()
  axios.put('https://api.ppbot.cc/autorole', Data).then(response => {
    console.log(response)
  }).catch(err => console.log(err))
  hideSave()
}

return (
<div> 
<Navbar user={user}/>
{ 
loading2
?
<Loader />
:
loading
?
<Loader />
:

BotGuilds.includes(match.params.guildID) ? 

UserGuilds.includes(match.params.guildID) ?

GuildAdmins.includes(user.id) ?

<div>

<form onSubmit={SubmitConfig}>

<Sidebar active="autorole" guildID={match.params.guildID} />

<div className="autorole">
<div className="autorole_box">

<div className="Autorole_title">

<a>Autorole</a>
<label>
<input className="toggle" type="checkbox" checked={checkBoxv} onChange={checkBox}   />
<span ></span>
</label>

</div>
<Select className="tsts" options={roles} onChange={onChange} value={Data.autoroles} isMulti />

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