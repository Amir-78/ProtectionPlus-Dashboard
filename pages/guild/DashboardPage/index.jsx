import React from 'react'
import { getUserDetals, getGuildInfo, getBotGuilds, getGuildsArray, getGuildAdmins } from '../../../utils/api.js'
import './index.css'
import { Loader, Navbar, Sidebar } from '../../components/index'
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom'


export function DashboardPage({ history, match }) {

  const [ user, setUser ] = React.useState({})
  const [ guildInfo, setGuildInfo  ] = React.useState([])
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  const [loading , setLoading] = React.useState(true)

  React.useEffect(() => {

    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getGuildsArray().then(({data}) => setUserGuilds(data))
      getGuildInfo(match.params.guildID).then(data => setGuildInfo(data.data))
    	getBotGuilds().then(data => setBotGuilds(data.data))
      getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
    } else {
      history.push("/")
    }
    }).then(() => {
    setTimeout(() => {
		setLoading(false)
    }, 1000)
	  })


}, [])


const data = {
	labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	datasets: [{
	  fill: true,
	  label: 'Joins',
	  borderColor: "#6ab04c",
	  data: guildInfo.joins,
	  borderWidth: 2,
  }, {
	  fill: true,
	  label: 'Leaves',
	  borderColor: '#eb4d4b',
	  data: guildInfo.leaves,
	  borderWidth: 2,
  }]
  };
  const data2 = {
	labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	datasets: [{
	  fill: true,
	  label: 'Messages',
	  borderColor: "#6ab04c",
	  data: guildInfo.messages2,
	  borderWidth: 2,
  }]
  };
  
  const options = {
	scales: {
	  yAxes: [
		{
		  ticks: {
			beginAtZero: true,
		  },
		},
	  ],
	},
  };

return (
<div> 
<Navbar user={user}/>

{
loading === true
?
<Loader />
:

BotGuilds.includes(match.params.guildID) ? 

UserGuilds.includes(match.params.guildID) ?

GuildAdmins.includes(user.id) ?

<div id="Overview" className="tabcontent tablinks">
<Sidebar active="overview" guildID={match.params.guildID}/>

	<div className="wrapper">
		<div className="row">
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-primary">
					<p>
						<i className="fad fa-users fa-2x hhh"></i>
					</p>
					<h3>{ guildInfo.allMembers }</h3>
					<p>Total Members</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-warning">
					<p>
						<i className="fad fa-user fa-2x hhh"></i>
					</p>
					<h3>{ guildInfo.onlineMembers }</h3>
					<p>Online Members</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-success">
					<p>
						<i className="fad fa-user-friends fa-2x hhh"></i>
					</p>
					<h3>+ { guildInfo.newMembers }&nbsp;&nbsp;&nbsp;-&nbsp;{ guildInfo.oldMembers } </h3>
					<p>Members joined/left last 24h</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-danger">
					<p>
						<i className="fad fa-comment-dots fa-2x hhh"></i>
					</p>
					<h3>{ guildInfo.messages }</h3>
					<p>New messages last 24h</p>
				</div>
			</div>
		</div>
    
    
		<div className="row">
			<div className="col-12 col-m-12 col-sm-12">
				<div className="card">
					<div className="card-header">
						<h3>
							Joins & Leaves
						</h3>
					</div>
					<div className="card-content">
					<Line data={data} options={options} /> 
					</div>
				</div>
			</div>
		</div>
    		<div className="row">
			<div className="col-12 col-m-12 col-sm-12">
				<div className="card">
					<div className="card-header">
						<h3>
							Messages
						</h3>
					</div>
					<div className="card-content">
					<Line data={data2} options={options} /> 
					</div>
				</div>
			</div>
		</div>
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