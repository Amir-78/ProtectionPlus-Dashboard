import React from 'react'
import { getUserDetals, getBotGuilds, getGuildChannels, getGuildLogs, getGuildsArray, getGuildAdmins } from '../../../utils/api'
import './index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function LogsPage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ loading , setLoading ] = React.useState(true)
  const [ channels , setChannels ] = React.useState([])
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  const [ Data, setData ] = React.useState({
    guildID: match.params.guildID,
    userID: null,
    accessToken: null,

    BanMember_channelID: null,
    BanMember_toggle: "off",
    BanMember_embedColor: "#9e1c35",
    
    UnBanMember_channelID: null,
    UnBanMember_toggle: "off",
    UnBanMember_embedColor: "#9e1c35",
    
    ChannelCreate_channelID: null,
    ChannelCreate_toggle: "off",
    ChannelCreate_embedColor: "#9e1c35",
    
    ChannelDelete_channelID: null,
    ChannelDelete_toggle: "off",
    ChannelDelete_embedColor: "#9e1c35",
    
    ChannelUpdate_channelID: null,
    ChannelUpdate_toggle: "off",
    ChannelUpdate_embedColor: "#9e1c35",
    
    GuildUpdate_channelID: null,
    GuildUpdate_toggle: "off",
    GuildUpdate_embedColor: "#9e1c35",
    
    MemberAdd_channelID: null,
    MemberAdd_toggle: "off",
    MemberAdd_embedColor: "#9e1c35",
    
    MemberRemove_channelID: null,
    MemberRemove_toggle: "off",
    MemberRemove_embedColor: "#9e1c35",
    
    MemberUpdate_channelID: null,
    MemberUpdate_toggle: "off",
    MemberUpdate_embedColor: "#9e1c35",
    
    MessageDelete_channelID: null,
    MessageDelete_toggle: "off",
    MessageDelete_embedColor: "#9e1c35",
    
    MessageEdit_channelID: null,
    MessageEdit_toggle: "off",
    MessageEdit_embedColor: "#9e1c35",
    
    RoleCreate_channelID: null,
    RoleCreate_toggle: "off",
    RoleCreate_embedColor: "#9e1c35",
    
    RoleDelete_channelID: null,
    RoleDelete_toggle: "off",
    RoleDelete_embedColor: "#9e1c35",
    
    RoleUpdate_channelID: null,
    RoleUpdate_toggle: "off",
    RoleUpdate_embedColor: "#9e1c35",
    
    EmojiCreate_channelID: null,
    EmojiCreate_toggle: "off",
    EmojiCreate_embedColor: "#9e1c35",
    
    EmojiDelete_channelID: null,
    EmojiDelete_toggle: "off",
    EmojiDelete_embedColor: "#9e1c35",
     
    EmojiUpdate_channelID: null,
    EmojiUpdate_toggle: "off",
    EmojiUpdate_embedColor: "#9e1c35",

    JoinVoice_channelID: null,
    JoinVoice_toggle: "off",
    JoinVoice_embedColor: "#9e1c35",

    LeftVoice_channelID: null,
    LeftVoice_toggle: "off",
    LeftVoice_embedColor: "#9e1c35",

    SwitchVoice_channelID: null,
    SwitchVoice_toggle: "off",
    SwitchVoice_embedColor: "#9e1c35",
  })

  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getGuildChannels(match.params.guildID).then(({data}) => setChannels(data))
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
      getBotGuilds().then(data => setBotGuilds(data.data))
      getGuildLogs(match.params.guildID).then(logs => {
        setData({ ...Data,
          guildID: match.params.guildID,
          userID: data.id,
          accessToken: data.accessToken,
      
          BanMember_channelID: logs.data.BanMember_channelID,
          BanMember_toggle: logs.data.BanMember_toggle,
          BanMember_embedColor: logs.data.BanMember_embedColor,
          
          UnBanMember_channelID: logs.data.UnBanMember_channelID,
          UnBanMember_toggle: logs.data.UnBanMember_toggle,
          UnBanMember_embedColor: logs.data.UnBanMember_embedColor,
          
          ChannelCreate_channelID: logs.data.ChannelCreate_channelID,
          ChannelCreate_toggle: logs.data.ChannelCreate_toggle,
          ChannelCreate_embedColor: logs.data.ChannelCreate_embedColor,
          
          ChannelDelete_channelID: logs.data.ChannelDelete_channelID,
          ChannelDelete_toggle: logs.data.ChannelDelete_toggle,
          ChannelDelete_embedColor: logs.data.ChannelDelete_embedColor,
          
          ChannelUpdate_channelID: logs.data.ChannelUpdate_channelID,
          ChannelUpdate_toggle: logs.data.ChannelUpdate_toggle,
          ChannelUpdate_embedColor: logs.data.ChannelUpdate_embedColor,
          
          GuildUpdate_channelID: logs.data.GuildUpdate_channelID,
          GuildUpdate_toggle: logs.data.GuildUpdate_toggle,
          GuildUpdate_embedColor: logs.data.GuildUpdate_embedColor,
          
          MemberAdd_channelID: logs.data.MemberAdd_channelID,
          MemberAdd_toggle: logs.data.MemberAdd_toggle,
          MemberAdd_embedColor: logs.data.MemberAdd_embedColor,
          
          MemberRemove_channelID: logs.data.MemberRemove_channelID,
          MemberRemove_toggle: logs.data.MemberRemove_toggle,
          MemberRemove_embedColor: logs.data.MemberRemove_embedColor,
          
          MemberUpdate_channelID: logs.data.MemberUpdate_channelID,
          MemberUpdate_toggle: logs.data.MemberUpdate_toggle,
          MemberUpdate_embedColor: logs.data.MemberUpdate_embedColor,
          
          MessageDelete_channelID: logs.data.MessageDelete_channelID,
          MessageDelete_toggle: logs.data.MessageDelete_toggle,
          MessageDelete_embedColor: logs.data.MessageDelete_embedColor,
          
          MessageEdit_channelID: logs.data.MessageEdit_channelID,
          MessageEdit_toggle: logs.data.MessageEdit_toggle,
          MessageEdit_embedColor: logs.data.MessageEdit_embedColor,
          
          RoleCreate_channelID: logs.data.RoleCreate_channelID,
          RoleCreate_toggle: logs.data.RoleCreate_toggle,
          RoleCreate_embedColor: logs.data.RoleCreate_embedColor,
          
          RoleDelete_channelID: logs.data.RoleDelete_channelID,
          RoleDelete_toggle: logs.data.RoleDelete_toggle,
          RoleDelete_embedColor: logs.data.RoleDelete_embedColor,
          
          RoleUpdate_channelID: logs.data.RoleUpdate_channelID,
          RoleUpdate_toggle: logs.data.RoleUpdate_toggle,
          RoleUpdate_embedColor: logs.data.RoleUpdate_embedColor,
          
          EmojiCreate_channelID: logs.data.EmojiCreate_channelID,
          EmojiCreate_toggle: logs.data.EmojiCreate_toggle,
          EmojiCreate_embedColor: logs.data.EmojiCreate_embedColor,
          
          EmojiDelete_channelID: logs.data.EmojiDelete_channelID,
          EmojiDelete_toggle: logs.data.EmojiDelete_toggle,
          EmojiDelete_embedColor: logs.data.EmojiDelete_embedColor,
           
          EmojiUpdate_channelID: logs.data.EmojiUpdate_channelID,
          EmojiUpdate_toggle: logs.data.EmojiUpdate_toggle,
          EmojiUpdate_embedColor: logs.data.EmojiUpdate_embedColor,
      
          JoinVoice_channelID: logs.data.JoinVoice_channelID,
          JoinVoice_toggle: logs.data.JoinVoice_toggle,
          JoinVoice_embedColor: logs.data.JoinVoice_embedColor,
      
          LeftVoice_channelID: logs.data.LeftVoice_channelID,
          LeftVoice_toggle: logs.data.LeftVoice_toggle,
          LeftVoice_embedColor: logs.data.LeftVoice_embedColor,
      
          SwitchVoice_channelID: logs.data.SwitchVoice_channelID,
          SwitchVoice_toggle: logs.data.SwitchVoice_toggle,
          SwitchVoice_embedColor: logs.data.SwitchVoice_embedColor,
         })
      })
    } else {
      history.push("/")
    }
    }).then(() => {
setTimeout(() => {
setLoading(false)
}, 1500)
})

}, [])

  function hideAndResetSave() {
    let SaveBox = document.getElementById("SaveBox")
    SaveBox.style.opacity = "0"
    getGuildLogs(match.params.guildID).then(logs => {
      setData({ ...Data,
        guildID: match.params.guildID,
        userID: user.id,
    
        BanMember_channelID: logs.data.BanMember_channelID,
        BanMember_toggle: logs.data.BanMember_toggle,
        BanMember_embedColor: logs.data.BanMember_embedColor,
        
        UnBanMember_channelID: logs.data.UnBanMember_channelID,
        UnBanMember_toggle: logs.data.UnBanMember_toggle,
        UnBanMember_embedColor: logs.data.UnBanMember_embedColor,
        
        ChannelCreate_channelID: logs.data.ChannelCreate_channelID,
        ChannelCreate_toggle: logs.data.ChannelCreate_toggle,
        ChannelCreate_embedColor: logs.data.ChannelCreate_embedColor,
        
        ChannelDelete_channelID: logs.data.ChannelDelete_channelID,
        ChannelDelete_toggle: logs.data.ChannelDelete_toggle,
        ChannelDelete_embedColor: logs.data.ChannelDelete_embedColor,
        
        ChannelUpdate_channelID: logs.data.ChannelUpdate_channelID,
        ChannelUpdate_toggle: logs.data.ChannelUpdate_toggle,
        ChannelUpdate_embedColor: logs.data.ChannelUpdate_embedColor,
        
        GuildUpdate_channelID: logs.data.GuildUpdate_channelID,
        GuildUpdate_toggle: logs.data.GuildUpdate_toggle,
        GuildUpdate_embedColor: logs.data.GuildUpdate_embedColor,
        
        MemberAdd_channelID: logs.data.MemberAdd_channelID,
        MemberAdd_toggle: logs.data.MemberAdd_toggle,
        MemberAdd_embedColor: logs.data.MemberAdd_embedColor,
        
        MemberRemove_channelID: logs.data.MemberRemove_channelID,
        MemberRemove_toggle: logs.data.MemberRemove_toggle,
        MemberRemove_embedColor: logs.data.MemberRemove_embedColor,
        
        MemberUpdate_channelID: logs.data.MemberUpdate_channelID,
        MemberUpdate_toggle: logs.data.MemberUpdate_toggle,
        MemberUpdate_embedColor: logs.data.MemberUpdate_embedColor,
        
        MessageDelete_channelID: logs.data.MessageDelete_channelID,
        MessageDelete_toggle: logs.data.MessageDelete_toggle,
        MessageDelete_embedColor: logs.data.MessageDelete_embedColor,
        
        MessageEdit_channelID: logs.data.MessageEdit_channelID,
        MessageEdit_toggle: logs.data.MessageEdit_toggle,
        MessageEdit_embedColor: logs.data.MessageEdit_embedColor,
        
        RoleCreate_channelID: logs.data.RoleCreate_channelID,
        RoleCreate_toggle: logs.data.RoleCreate_toggle,
        RoleCreate_embedColor: logs.data.RoleCreate_embedColor,
        
        RoleDelete_channelID: logs.data.RoleDelete_channelID,
        RoleDelete_toggle: logs.data.RoleDelete_toggle,
        RoleDelete_embedColor: logs.data.RoleDelete_embedColor,
        
        RoleUpdate_channelID: logs.data.RoleUpdate_channelID,
        RoleUpdate_toggle: logs.data.RoleUpdate_toggle,
        RoleUpdate_embedColor: logs.data.RoleUpdate_embedColor,
        
        EmojiCreate_channelID: logs.data.EmojiCreate_channelID,
        EmojiCreate_toggle: logs.data.EmojiCreate_toggle,
        EmojiCreate_embedColor: logs.data.EmojiCreate_embedColor,
        
        EmojiDelete_channelID: logs.data.EmojiDelete_channelID,
        EmojiDelete_toggle: logs.data.EmojiDelete_toggle,
        EmojiDelete_embedColor: logs.data.EmojiDelete_embedColor,
         
        EmojiUpdate_channelID: logs.data.EmojiUpdate_channelID,
        EmojiUpdate_toggle: logs.data.EmojiUpdate_toggle,
        EmojiUpdate_embedColor: logs.data.EmojiUpdate_embedColor,
    
        JoinVoice_channelID: logs.data.JoinVoice_channelID,
        JoinVoice_toggle: logs.data.JoinVoice_toggle,
        JoinVoice_embedColor: logs.data.JoinVoice_embedColor,
    
        LeftVoice_channelID: logs.data.LeftVoice_channelID,
        LeftVoice_toggle: logs.data.LeftVoice_toggle,
        LeftVoice_embedColor: logs.data.LeftVoice_embedColor,
    
        SwitchVoice_channelID: logs.data.SwitchVoice_channelID,
        SwitchVoice_toggle: logs.data.SwitchVoice_toggle,
        SwitchVoice_embedColor: logs.data.SwitchVoice_embedColor,
       })
    })
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

function OnSubmit(e) {
  e.preventDefault()
  axios.put('https://api.ppbot.cc/logs', Data).then(respone => {
    console.log(respone)
  }).catch(err => {
    console.log(err)
  })
  hideSave()
}

function BanMembersToggle(e) {
  if(e.target.checked === true) {
  setData({ ...Data, BanMember_toggle: "on" })
  } else {
  setData({ ...Data, BanMember_toggle: "off" })
  }
}

function BanMembersSelect(e) {
  setData({ ...Data, BanMember_channelID: e.target.value })
}

function BanMembersColor(e) {
  setData({ ...Data, BanMember_embedColor: e.target.value })
}


function UnBanMembersToggle(e) {
  if(e.target.checked === true) {
  setData({ ...Data, UnBanMember_toggle: "on" })
  } else {
  setData({ ...Data, UnBanMember_toggle: "off" })
  }
}

function UnBanMembersSelect(e) {
  setData({ ...Data, UnBanMember_channelID: e.target.value })
}

function UnBanMembersColor(e) {
  setData({ ...Data, UnBanMember_embedColor: e.target.value })
}


function ChannelCreateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, ChannelCreate_toggle: "on" })
  } else {
    setData({ ...Data, ChannelCreate_toggle: "off" })
  }
}

function ChannelCreateSelect(e) {
  setData({ ...Data, ChannelCreate_channelID: e.target.value })
}

function ChannelCreateColor(e) {
  setData({ ...Data, ChannelCreate_embedColor: e.target.value })
}


function ChannelDeleteToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, ChannelDelete_toggle: "on" })
  } else {
    setData({ ...Data, ChannelDelete_toggle: "off" })
  }
}

function ChannelDeleteSelect(e) {
  setData({ ...Data, ChannelDelete_channelID: e.target.value })
}

function ChannelDeleteColor(e) {
  setData({ ...Data, ChannelDelete_embedColor: e.target.value })
}


function ChannelUpdateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, ChannelUpdate_toggle: "on" })
  } else {
    setData({ ...Data, ChannelUpdate_toggle: "off" })
  }
}

function ChannelUpdateSelect(e) {
  setData({ ...Data, ChannelUpdate_channelID: e.target.value })
}

function ChannelUpdateColor(e) {
  setData({ ...Data, ChannelUpdate_embedColor: e.target.value })
}


function GuildUpdateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, GuildUpdate_toggle: "on" })
  } else {
    setData({ ...Data, GuildUpdate_toggle: "off" })
  }
}

function GuildUpdateSelect(e) {
  setData({ ...Data, GuildUpdate_channelID: e.target.value })
}

function GuildUpdateColor(e) {
  setData({ ...Data, GuildUpdate_embedColor: e.target.value })
}


function MemberAddToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MemberAdd_toggle: "on" })
  } else {
    setData({ ...Data, MemberAdd_toggle: "off" })
  }
}

function MemberAddSelect(e) {
  setData({ ...Data, MemberAdd_channelID: e.target.value })
}

function MemberAddColor(e) {
  setData({ ...Data, MemberAdd_embedColor: e.target.value })
}


function MemberRemoveToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MemberRemove_toggle: "on" })
  } else {
    setData({ ...Data, MemberRemove_toggle: "off" })
  }
}

function MemberRemoveSelect(e) {
  setData({ ...Data, MemberRemove_channelID: e.target.value })
}

function MemberRemoveColor(e) {
  setData({ ...Data, MemberRemove_embedColor: e.target.value })
}


function MemberUpdateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MemberUpdate_toggle: "on" })
  } else {
    setData({ ...Data, MemberUpdate_toggle: "off" })
  }
}

function MemberUpdateSelect(e) {
  setData({ ...Data, MemberUpdate_channelID: e.target.value })
}

function MemberUpdateColor(e) {
  setData({ ...Data, MemberUpdate_embedColor: e.target.value })
}


function MessageDeleteToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MessageDelete_toggle: "on" })
  } else {
    setData({ ...Data, MessageDelete_toggle: "off" })
  }
}

function MessageDeleteSelect(e) {
  setData({ ...Data, MessageDelete_channelID: e.target.value })
}

function MessageDeleteColor(e) {
  setData({ ...Data, MessageDelete_embedColor: e.target.value })
}


function MessageEditToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MessageEdit_toggle: "on" })
  } else {
    setData({ ...Data, MessageEdit_toggle: "off" })
  }
}

function MessageEditSelect(e) {
  setData({ ...Data, MessageEdit_channelID: e.target.value })
}

function MessageEditColor(e) {
  setData({ ...Data, MessageEdit_embedColor: e.target.value })
}


function RoleCreateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, RoleCreate_toggle: "on" })
  } else {
    setData({ ...Data, RoleCreate_toggle: "off" })
  }
}

function RoleCreateSelect(e) {
  setData({ ...Data, RoleCreate_channelID: e.target.value })
}

function RoleCreateColor(e) {
  setData({ ...Data, RoleCreate_embedColor: e.target.value })
}


function RoleDeleteToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, RoleDelete_toggle: "on" })
  } else {
    setData({ ...Data, RoleDelete_toggle: "off" })
  }
}

function RoleDeleteSelect(e) {
  setData({ ...Data, RoleDelete_channelID: e.target.value })
}

function RoleDeleteColor(e) {
  setData({ ...Data, RoleDelete_embedColor: e.target.value })
}


function RoleUpdateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, RoleUpdate_toggle: "on" })
  } else {
    setData({ ...Data, RoleUpdate_toggle: "off" })
  }
}

function RoleUpdateSelect(e) {
  setData({ ...Data, RoleUpdate_channelID: e.target.value })
}

function RoleUpdateColor(e) {
  setData({ ...Data, RoleUpdate_embedColor: e.target.value })
}


function EmojiCreateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, EmojiCreate_toggle: "on" })
  } else {
    setData({ ...Data, EmojiCreate_toggle: "off" })
  }
}

function EmojiCreateSelect(e) {
  setData({ ...Data, EmojiCreate_channelID: e.target.value })
}

function EmojiCreateColor(e) {
  setData({ ...Data, EmojiCreate_embedColor: e.target.value })
}


function EmojiDeleteToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, EmojiDelete_toggle: "on" })
  } else {
    setData({ ...Data, EmojiDelete_toggle: "off" })
  }
}

function EmojiDeleteSelect(e) {
  setData({ ...Data, EmojiDelete_channelID: e.target.value })
}

function EmojiDeleteColor(e) {
  setData({ ...Data, EmojiDelete_embedColor: e.target.value })
}


function EmojiUpdateToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, EmojiUpdate_toggle: "on" })
  } else {
    setData({ ...Data, EmojiUpdate_toggle: "off" })
  }
}

function EmojiUpdateSelect(e) {
  setData({ ...Data, EmojiUpdate_channelID: e.target.value })
}

function EmojiUpdateColor(e) {
  setData({ ...Data, EmojiUpdate_embedColor: e.target.value })
}


function JoinVoiceToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, JoinVoice_toggle: "on" })
  } else {
    setData({ ...Data, JoinVoice_toggle: "off" })
  }
}

function JoinVoiceSelect(e) {
  setData({ ...Data, JoinVoice_channelID: e.target.value })
}

function JoinVoiceColor(e) {
  setData({ ...Data, JoinVoice_embedColor: e.target.value })
}


function LeftVoiceToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, LeftVoice_toggle: "on" })
  } else {
    setData({ ...Data, LeftVoice_toggle: "off" })
  }
}

function LeftVoiceSelect(e) {
  setData({ ...Data, LeftVoice_channelID: e.target.value })
}

function LeftVoiceColor(e) {
  setData({ ...Data, LeftVoice_embedColor: e.target.value })
}


function SwitchVoiceToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, SwitchVoice_toggle: "on" })
  } else {
    setData({ ...Data, SwitchVoice_toggle: "off" })
  }
  
}

function SwitchVoiceSelect(e) {
  setData({ ...Data, SwitchVoice_channelID: e.target.value })
}

function SwitchVoiceColor(e) {
  setData({ ...Data, SwitchVoice_embedColor: e.target.value })
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

<Sidebar active="logs" guildID={match.params.guildID} />
<form onSubmit={ OnSubmit }>
<div className="big-conteter">
<div className="small-conteter">

<div className="log-box">
<a>Ban member</a>

<select onChange={ BanMembersSelect }>
{ channels.map(channel => (

channel.id === Data.BanMember_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ BanMembersColor } value={ Data.BanMember_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.BanMember_toggle === "on" ? true : false } onChange={ BanMembersToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Unban member</a>

<select onChange={ UnBanMembersSelect }>
{ channels.map(channel => (

channel.id === Data.UnBanMember_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ UnBanMembersColor } value={ Data.UnBanMember_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.UnBanMember_toggle === "on" ? true : false } onChange={ UnBanMembersToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Channel create</a>

<select onChange={ ChannelCreateSelect }>
{ channels.map(channel => (

channel.id === Data.ChannelCreate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ ChannelCreateColor } value={ Data.ChannelCreate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.ChannelCreate_toggle === "on" ? true : false } onChange={ ChannelCreateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Channel delete</a>

<select onChange={ ChannelDeleteSelect }>
{ channels.map(channel => (

channel.id === Data.ChannelDelete_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ ChannelDeleteColor } value={ Data.ChannelDelete_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.ChannelDelete_toggle === "on" ? true : false } onChange={ ChannelDeleteToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Channel update</a>

<select onChange={ ChannelUpdateSelect }>
{ channels.map(channel => (

channel.id === Data.ChannelUpdate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ ChannelUpdateColor } value={ Data.ChannelUpdate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.ChannelUpdate_toggle === "on" ? true : false } onChange={ ChannelUpdateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Server update</a>

<select onChange={ GuildUpdateSelect }>
{ channels.map(channel => (

channel.id === Data.GuildUpdate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ GuildUpdateColor } value={ Data.GuildUpdate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.GuildUpdate_toggle === "on" ? true : false } onChange={ GuildUpdateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Member add</a>

<select onChange={ MemberAddSelect }>
{ channels.map(channel => (

channel.id === Data.MemberAdd_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ MemberAddColor } value={ Data.MemberAdd_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.MemberAdd_toggle === "on" ? true : false } onChange={ MemberAddToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Member remove</a>

<select onChange={ MemberRemoveSelect }>
{ channels.map(channel => (

channel.id === Data.MemberRemove_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ MemberRemoveColor } value={ Data.MemberRemove_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.MemberRemove_toggle === "on" ? true : false } onChange={ MemberRemoveToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Member update</a>

<select onChange={ MemberUpdateSelect }>
{ channels.map(channel => (

channel.id === Data.MemberUpdate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ MemberUpdateColor } value={ Data.MemberUpdate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.MemberUpdate_toggle === "on" ? true : false } onChange={ MemberUpdateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Message delete</a>

<select onChange={ MessageDeleteSelect }>
{ channels.map(channel => (

channel.id === Data.MessageDelete_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ MessageDeleteColor } value={ Data.MessageDelete_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.MessageDelete_toggle === "on" ? true : false } onChange={ MessageDeleteToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Message edit</a>

<select onChange={ MessageEditSelect }>
{ channels.map(channel => (

channel.id === Data.MessageEdit_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ MessageEditColor } value={ Data.MessageEdit_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.MessageEdit_toggle === "on" ? true : false } onChange={ MessageEditToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Role create</a>

<select onChange={ RoleCreateSelect }>
{ channels.map(channel => (

channel.id === Data.RoleCreate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ RoleCreateColor } value={ Data.RoleCreate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.RoleCreate_toggle === "on" ? true : false } onChange={ RoleCreateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Role delete</a>

<select onChange={ RoleDeleteSelect }>
{ channels.map(channel => (

channel.id === Data.RoleDelete_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ RoleDeleteColor } value={ Data.RoleDelete_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.RoleDelete_toggle === "on" ? true : false } onChange={ RoleDeleteToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Role update</a>

<select onChange={ RoleUpdateSelect }>
{ channels.map(channel => (

channel.id === Data.RoleUpdate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ RoleUpdateColor } value={ Data.RoleUpdate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.RoleUpdate_toggle === "on" ? true : false } onChange={ RoleUpdateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Emoji create</a>

<select onChange={ EmojiCreateSelect }>
{ channels.map(channel => (

channel.id === Data.EmojiCreate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ EmojiCreateColor } value={ Data.EmojiCreate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.EmojiCreate_toggle === "on" ? true : false } onChange={ EmojiCreateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Emoji delete</a>

<select onChange={ EmojiDeleteSelect }>
{ channels.map(channel => (

channel.id === Data.EmojiDelete_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ EmojiDeleteColor } value={ Data.EmojiDelete_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.EmojiDelete_toggle === "on" ? true : false } onChange={ EmojiDeleteToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Emoji update</a>

<select onChange={ EmojiUpdateSelect }>
{ channels.map(channel => (

channel.id === Data.EmojiUpdate_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ EmojiUpdateColor } value={ Data.EmojiUpdate_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.EmojiUpdate_toggle === "on" ? true : false } onChange={ EmojiUpdateToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Join voice Channel</a>

<select onChange={ JoinVoiceSelect }>
{ channels.map(channel => (

channel.id === Data.JoinVoice_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ JoinVoiceColor } value={ Data.JoinVoice_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.JoinVoice_toggle === "on" ? true : false } onChange={ JoinVoiceToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Left voice Channel</a>

<select onChange={ LeftVoiceSelect }>
{ channels.map(channel => (

channel.id === Data.LeftVoice_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ LeftVoiceColor } value={ Data.LeftVoice_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.LeftVoice_toggle === "on" ? true : false } onChange={ LeftVoiceToggle } type="checkbox" />
<span ></span>
</label>

</div>
</div>


<div className="log-box">
<a>Switch voice Channel</a>

<select onChange={ SwitchVoiceSelect }>
{ channels.map(channel => (

channel.id === Data.SwitchVoice_channelID
?
<option value={ channel.id } selected>{ channel.name }</option>
:
<option value={ channel.id } >{ channel.name }</option>

)) }
</select>

<div className="line"></div>

<div className="log-box-fotter">

<input onChange={ SwitchVoiceColor } value={ Data.SwitchVoice_embedColor } className="colorInput" type="color" />

<label>
<input className="toggle" checked={ Data.SwitchVoice_toggle === "on" ? true : false } onChange={ SwitchVoiceToggle } type="checkbox" />
<span ></span>
</label>

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