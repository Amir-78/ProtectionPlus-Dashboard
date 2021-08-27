import React from 'react'
import './index.css'
import { getUserDetals, getProfile, getData, getUserBackground } from '../../../utils/api'
import { Loader, Navbar, UserSidebar } from '../../components/index'
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2/src/sweetalert2.js'
import '@sweetalert2/theme-dark/dark.css'
import axios from 'axios';

export function BackgroundPage({ history }) {

  const [ user, setUser ] = React.useState(null)
  const [ loading, setLoading  ] = React.useState(true) 
  const [ loading2, setLoading2  ] = React.useState(true) 
  const [ ProfileLoading, setProfileLoading  ] = React.useState(true) 
  const [ hidden, setHidden  ] = React.useState(true) 
  const [ src, setSrc  ] = React.useState(null) 
  const [ Data, setData ] = React.useState({ userID: null, imageUrl: null })
  const [ Used, setUsed ] = React.useState(null)
  const [ coins, setCoins ] = React.useState(0)

  React.useEffect(() => {
    getUserDetals().then(({data}) => {
    if(data) {
      setUser(data)
      setData({ ...Data, userID: data.id })
      setLoading(false)
      getData(data.id).then(({data}) => setCoins(data.coins))
      getUserBackground(data.id).then(({data}) => setUsed(data)).then(() => {
        setLoading2(false)
      })
    } else {
      history.push("/")
      setLoading(false)
    }
    
    })


  }, [])


function Save() {

  if(coins < 5000) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: `You don't have enough coins`
  })
} else {
setCoins(coins - 5000)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Saved successfully'
  })

  axios.put("https://api.ppbot.cc/background", Data)
  setUsed(Data.imageUrl)
}
HideThis()
}



function ShowThis(e) {
  if(e.target.src !== Used) {
  setData({ ...Data, userID: user.id, imageUrl: e.target.src })

  const id = e.target.src.split("/")[3]
  const name = e.target.src.split("/")[4]
  const userID = user.id

  getProfile(userID, id, name).then(data => {
    setSrc(data.data)
  }).then(() => {
    setProfileLoading(false)
  })
  setHidden(false)
  let tabcontent = document.getElementsByClassName("bxe");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let tabcontent2 = document.getElementsByClassName("bxe2");
  for (var i = 0; i < tabcontent2.length; i++) {
    tabcontent2[i].style.display = "none";
  }
} else {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: `You are already using this background`
  })
}
}

function HideThis() {
  setHidden(true)
  setProfileLoading(true)
  let tabcontent = document.getElementsByClassName("bxe");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "block";
  }
  let tabcontent2 = document.getElementsByClassName("bxe2");
  for (var i = 0; i < tabcontent2.length; i++) {
    tabcontent2[i].style.display = "block";
  }
}
  


  return (


<div>

{

loading2 ?
<div>
<Loader />
</div>
:

loading ?
<div>
<Loader />
</div>
:

<div>
<Navbar user={user}/>
<UserSidebar active="background" />


<div  className={ hidden ? "opticaG hidden" : "opticaG"}>
<div className="pop">
<div className="pop-box">

<div className="navBar">
    <a>Background</a>
    <button onClick={ HideThis }><i class="fas fa-times fa-2x"></i></button>
</div>

{ 
ProfileLoading 
? 

<div className="ProfileLoading">
<ReactLoading type="spin" />
</div>

:

<img id="image" className={ ProfileLoading === true ? "hidden" : "" } src={ src } />  

}

<div className="fotter">
    <a>Price : 5000 coins</a>
    <button onClick={Save}>Buy & Use</button>
</div>

</div>
</div>
</div>

<div className="boxe">
    <div className="boxe_conteter">

<div className="box_image">
{
"https://i.ibb.co/0VFNxTW/profile1.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="1" onClick={ ShowThis } src="https://i.ibb.co/0VFNxTW/profile1.png" />  
</div>

<div className="box_image">

{
"https://i.ibb.co/ccYhsnP/profile2.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="2" onClick={ ShowThis } src="https://i.ibb.co/ccYhsnP/profile2.png" /> 

</div>

<div className="box_image">
{
"https://i.ibb.co/Dfyk7vm/profile3.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="3" onClick={ ShowThis } src="https://i.ibb.co/Dfyk7vm/profile3.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/M54jZkw/profile4.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="4" onClick={ ShowThis } src="https://i.ibb.co/M54jZkw/profile4.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/y0XcNdS/profile5.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="5" onClick={ ShowThis } src="https://i.ibb.co/y0XcNdS/profile5.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/Y3YXhs9/profile6.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="6" onClick={ ShowThis } src="https://i.ibb.co/Y3YXhs9/profile6.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/s6t3Pwr/profile7.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="7" onClick={ ShowThis } src="https://i.ibb.co/s6t3Pwr/profile7.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/grnp0wz/profile8.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="8" onClick={ ShowThis } src="https://i.ibb.co/grnp0wz/profile8.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/RvMssNH/profile9.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="9" onClick={ ShowThis } src="https://i.ibb.co/RvMssNH/profile9.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/Yt0vYsw/profile10.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="10" onClick={ ShowThis } src="https://i.ibb.co/Yt0vYsw/profile10.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/NLF0zd7/profile11.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="11" onClick={ ShowThis } src="https://i.ibb.co/NLF0zd7/profile11.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/Q6kXWWs/profile12.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="12" onClick={ ShowThis } src="https://i.ibb.co/Q6kXWWs/profile12.png" />  
</div>

<div className="box_image">
{
"https://i.ibb.co/fFPn3fv/profile13.png" === Used
?
<div className="bxe2">
<a><i class="fas fa-check fa-lg"></i></a>
</div>
:
<div className="bxe">
<a>5000</a>
</div>
}
<img id="13" onClick={ ShowThis } src="https://i.ibb.co/fFPn3fv/profile13.png" />  
</div>

    </div>
</div>

</div>
}
</div>

  )
}