import React from 'react'
import './index.css'
import { getUserDetals, getData } from '../../../utils/api'
import { Loader, Navbar, UserSidebar } from '../../components/index'

export function ProfilePage({ history }) {

  const [ user, setUser ] = React.useState(null)
  const [ loading, setLoading  ] = React.useState(true) 
  const [ UserData, setUserData  ] = React.useState([]) 

  React.useEffect(() => {
    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      getData(data.id).then(({data}) => setUserData(data)).then(() => setLoading(false))
    } else {
      history.push("/")
      setLoading(false)
    }
    
    })


  }, [])


  return (


<div>

{
loading ?
<div>
<Loader />
</div>
:

<div>
<Navbar user={user}/>
<UserSidebar active="profile" />


<div id="Overview" className="tabcontent tablinks">
	<div className="wrapper">
		<div className="row">
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-primary">
					<p>
						<i className="fal fa-coins fa-2x"></i>
					</p>
					<h3>{ UserData.coins }</h3>
					<p>Coins</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-warning">
					<p>
						<i className="fal fa-star fa-2x"></i>
					</p>
					<h3>{ UserData.level }</h3>
					<p>Level</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-success">
					<p>
						<i className="fal fa-award fa-2x"></i>
					</p>
					<h3>{ UserData.rank }</h3>
					<p>Rank</p>
				</div>
			</div>
			<div className="col-3 col-m-6 col-sm-6 zoom">
				<div className="counter bg-danger">
					<p>
						<i className="fal fa-thumbs-up fa-2x"></i>
					</p>
					<h3>{ UserData.rep }</h3>
					<p>Reps</p>
				</div>
			</div>
		</div>
	</div>
</div>  


</div>
}
</div>

  )
}