import React from 'react'
import './index.css'
import { getUserDetals, getGuilds } from '../../../utils/api'
import { Link } from 'react-router-dom'
import { Loader, Navbar, UserSidebar } from '../../components/index'

export function ServersPage({ history }) {

  const [ user, setUser ] = React.useState(null)
  const [ loading, setLoading  ] = React.useState(true) 
  const [ guilds, setGuilds  ] = React.useState([])

  React.useEffect(() => {
    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getGuilds().then(data => {
        setGuilds(data.data)
        setLoading(false)
      })
      
    } else {
      history.push("/")
      setLoading(false)
    }


    
    })


  }, [])
function nameSubstr(guildName) {
  if(guildName.length > 14) {
    return guildName.substr(0,14) +".."
  } else {
    return guildName
  }
}



  return (


<div>

{loading ?
<div>
<Loader />
</div>
:

<div>
<Navbar user={user}/>
<UserSidebar active="servers" />
<center>
{user.avatar ? <img className="user_avatar" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}/> : <img className="user_avatar" src="https://i.ibb.co/Gc5wGFc/Untitled-1.png"/>}
<h1>{user.username}</h1>
</center>


<div className="main_one">
<div className="small_one">
{ 
guilds.map(guild => (
  
<div className="containere">  
<div className="imge">
{guild.icon ? <img width="150" height="150" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}/> : <img width="150" height="150" src="https://i.ibb.co/Gc5wGFc/Untitled-1.png"/>}
</div>
<div className="info">
<h3>{ nameSubstr(guild.name) }</h3>
<Link to={`/dashboard/${guild.id}`}><a type="button" className="btn">Manage</a></Link>
</div>
</div>

))
}
</div>
</div>


</div>
}
</div>

  )
}