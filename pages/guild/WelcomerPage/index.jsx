import React from 'react'
import { Stage, Layer, Image,Text } from "react-konva";
import {Transformer}from "react-konva"
import './index.css'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { Navbar, Loader, Sidebar } from '../../components'
import { getUserDetals, getGuildChannels, getGuildWelcomer, getGuildsArray, getGuildAdmins, getBotGuilds } from '../../../utils/api'
import axios from 'axios'



class TransformerComponent extends React.Component { 
    componentDidMount() {
      this.checkNode();
    }
    componentDidUpdate() {
      this.checkNode();
    }
    checkNode() {
      const stage = this.transformer.getStage();
      const { selectedShapeName } = this.props;
      const selectedNode = stage.findOne("." + selectedShapeName);
      if (selectedNode === this.transformer.node()) {
        return;
      }
      if (selectedNode) {
        this.transformer.attachTo(selectedNode);
      } else {
        this.transformer.detach();
      }
      this.transformer.getLayer().batchDraw();
    }
    render() {
      return (
        <Transformer
          ref={(node) => {
            this.transformer = node;
          }}
          rotateEnabled={false}
        />
      );
    }
  }

export function WelcomerPage({ history, match }) {
  const [Tab, setTab] = React.useState(1);
  const [Tab2, setTab2] = React.useState(1);
  const [ user, setUser ] = React.useState({})
  const [ OnOff, setOnOff ] = React.useState({ message: "off", image: "off" })
  const [ loading, setLoading ] = React.useState(true)
  const [ loader, setLoader ] = React.useState(true)
  const [ channels, setChannels ] = React.useState([])
  const [ BotGuilds, setBotGuilds  ] = React.useState([])
  const [ UserGuilds, setUserGuilds  ] = React.useState([])
  const [ GuildAdmins, setGuildAdmins  ] = React.useState([])
  const [ Data, setData  ] = React.useState({
    guildID: match.params.guildID,
    userID: null,
    accessToken: null,
    MessageChannel: null,
    PhotoChannel: null,
    MessageToggle: "off",
    PhotoToggle: "off",
    imagex: 18,
    imagey: 61,
    imagesx: 34.5,
    imagesy: 34.5,
    textx: 208,
    texty: 170,
    textsx: 68,
    textsy: 86,
    texts: 20,
    imageurl: "https://i.ibb.co/XsG2NqX/Untitled.png",
    stagewidth: 500,
    stageheight: 300,
    icontype: "circle",
    textarea: "Welcome to our server [user] \ninvited by [inviter]",
    textcolor: "#fff",
    textalign: "center",
    selected:"",
    circle: new window.Image(),
    square: new window.Image(),
    background: new window.Image(),
})

  React.useEffect(()=>{






getUserDetals().then(({data}) => {
  if(data) {
    setData({ ...Data, userID: data.id, accessToken: data.accessToken })
    setUser(data)
    getGuildChannels(match.params.guildID).then(({data}) => setChannels(data))
    getGuildsArray().then(({data}) => setUserGuilds(data))
    getGuildAdmins(match.params.guildID).then(({data}) => setGuildAdmins(data))
    getBotGuilds(match.params.guildID).then(({data}) => setBotGuilds(data))
    getGuildWelcomer(match.params.guildID).then(({data}) => {
      
      if(data.MessageToggle === "on" && data.PhotoToggle === "on") {
        setOnOff({ ...OnOff, message: "on", image: "on" })
      } else if(data.MessageToggle === "on" && data.PhotoToggle === "off") {
        setOnOff({ ...OnOff, message: "on", image: "off" })      
      } else if(data.MessageToggle === "off" && data.PhotoToggle === "on") {
        setOnOff({ ...OnOff, message: "off", image: "on" })      
      } else if(data.MessageToggle === "off" && data.PhotoToggle === "off") {
        setOnOff({ ...OnOff, message: "off", image: "off" })      
      }

      var circle = new window.Image();
circle.src = "https://i.ibb.co/2hJcX93/Untitled-1.png"

var square = new window.Image();
square.src = "https://cdn.discordapp.com/embed/avatars/0.png"

var background = new window.Image();
background.src = data.imageurl


      setData({ 
        ...Data, 
        guildID: match.params.guildID,
        MessageChannel: data.MessageChannel,
        PhotoChannel: data.PhotoChannel,
        MessageToggle: data.MessageToggle,
        PhotoToggle: data.PhotoToggle,
        imagex: Number(data.imagex),
        imagey: Number(data.imagey),
        imagesx: Number(data.imagesx),
        imagesy: Number(data.imagesy),
        textx: Number(data.textx),
        texty: Number(data.texty),
        textsx: Number(data.textsx),
        textsy: Number(data.textsy),
        texts: Number(data.texts),
        imageurl: data.imageurl,
        stagewidth: Number(data.stagewidth),
        stageheight: Number(data.stageheight),
        icontype: data.icontype,
        textarea: data.textarea,
        textcolor: data.textcolor,
        textalign: data.textalign,
        circle: circle, 
        square: square, 
        background: background
      })
    })
    





  } else {
    history.push("/")
  }
  }).then(() => {
setTimeout(() => {
setLoader(false)
setLoading(false)
}, 1000)
})

  },[])

function MessageToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, MessageToggle: "on" })
    setOnOff({ ...OnOff, message: "on" })
  } else {
    setData({ ...Data, MessageToggle: "off" })
    setOnOff({ ...OnOff, message: "off" })
  }
}

function PhotoToggle(e) {
  if(e.target.checked === true) {
    setData({ ...Data, PhotoToggle: "on" })
    setOnOff({ ...OnOff, image: "on" })
  } else {
    setData({ ...Data, PhotoToggle: "off" })
    setOnOff({ ...OnOff, image: "off" })
  }
}

document.addEventListener("change", () => {
  showSave()
})

function hideAndResetSave() {
  let SaveBox = document.getElementById("SaveBox")
  SaveBox.style.opacity = "0"
  getGuildWelcomer(match.params.guildID).then(({data}) => {
    
      if(data.MessageToggle === "on" && data.PhotoToggle === "on") {
        setOnOff({ ...OnOff, message: "on", image: "on" })
      } else if(data.MessageToggle === "on" && data.PhotoToggle === "off") {
        setOnOff({ ...OnOff, message: "on", image: "off" })      
      } else if(data.MessageToggle === "off" && data.PhotoToggle === "on") {
        setOnOff({ ...OnOff, message: "off", image: "on" })      
      } else if(data.MessageToggle === "off" && data.PhotoToggle === "off") {
        setOnOff({ ...OnOff, message: "off", image: "off" })      
      }

      var circle = new window.Image();
circle.src = "https://i.ibb.co/2hJcX93/Untitled-1.png"

var square = new window.Image();
square.src = "https://cdn.discordapp.com/embed/avatars/0.png"

var background = new window.Image();
background.src = data.imageurl

    setData({ 
      ...Data, 
      MessageChannel: data.MessageChannel,
      PhotoChannel: data.PhotoChannel,
      MessageToggle: data.MessageToggle,
      PhotoToggle: data.PhotoToggle,
      imagex: Number(data.imagex),
      imagey: Number(data.imagey),
      imagesx: Number(data.imagesx),
      imagesy: Number(data.imagesy),
      textx: Number(data.textx),
      texty: Number(data.texty),
      textsx: Number(data.textsx),
      textsy: Number(data.textsy),
      texts: Number(data.texts),
      imageurl: data.imageurl,
      stagewidth: Number(data.stagewidth),
      stageheight: Number(data.stageheight),
      icontype: data.icontype,
      textarea: data.textarea,
      textcolor: data.textcolor,
      textalign: data.textalign,
      circle: circle, 
      square: square, 
      background: background
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

function Save(e) {
  e.preventDefault()
  axios.put("https://api.ppbot.cc/welcome", Data).catch(err => console.log(err))
  hideSave()
}










function ImageChanger(e) {
    var form = new FormData();
    console.log(e.target)
    const inputimageurl = document.getElementById("ImageChanger")
    
    form.append("image", inputimageurl.files[0])

    var settings = {
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      return xhr;
    },
      "url": "https://api.imgbb.com/1/upload?key=f5bfdf106c048bf8178bede79baee61d",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };
    $.ajax(settings).done(function (response) {
    var jx = JSON.parse(response)
    var imgc = new window.Image()
    imgc.src = `${jx.data.url}`
    imgc.onload = function getwidth() {
    var imagewidth = imgc.width
    var imageheight = imgc.height
    var maxWidth = 500;
    var maxHeight = 500;
    if((imagewidth > maxWidth)&&(imageheight < maxHeight)){
    var ratio = maxWidth / imagewidth,
    width = imagewidth * ratio,
    height = imageheight * ratio
    }else if((imageheight > maxHeight)&&(imagewidth < maxWidth)){
    var ratio = imageheight,
    width = imagewidth * maxWidth/(ratio),
    height = imageheight * maxHeight/(ratio)
    }else if((imagewidth > maxWidth)&&(imageheight > maxHeight)){
    
    var ratio = maxWidth / imagewidth,
    
    width = imagewidth * ratio,
    height = imageheight * ratio
    
    }else {

    var ratio = maxWidth / imagewidth,
    width = imagewidth * ratio,
    height = imageheight * ratio  

    }



    getGuildWelcomer(match.params.guildID).then(({data}) => {
      


      var circle = new window.Image();
circle.src = "https://i.ibb.co/2hJcX93/Untitled-1.png"

var square = new window.Image();
square.src = "https://cdn.discordapp.com/embed/avatars/0.png"

var background = new window.Image();
background.src = data.imageurl


      setData({ 
        ...Data, 
        guildID: match.params.guildID,
        MessageChannel: data.MessageChannel,
        PhotoChannel: data.PhotoChannel,
        MessageToggle: data.MessageToggle,
        PhotoToggle: data.PhotoToggle,
        imagex: Number(data.imagex),
        imagey: Number(data.imagey),
        imagesx: Number(data.imagesx),
        imagesy: Number(data.imagesy),
        textx: Number(data.textx),
        texty: Number(data.texty),
        textsx: Number(data.textsx),
        textsy: Number(data.textsy),
        texts: Number(data.texts),
        imageurl: imgc.src,
        stagewidth: Number(width),
        stageheight: Number(height),
        icontype: data.icontype,
        textarea: data.textarea,
        textcolor: data.textcolor,
        textalign: data.textalign,
        circle: circle, 
        square: square, 
        background: imgc
      })
    })


    };
    })
    
    }







return (
<div> 
<Navbar user={user} />

{

loader
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

<form onSubmit={ Save }>

<Sidebar active="welcomer" guildID={ match.params.guildID } />

<div className="stage_conteter">

<div className="linee">
  <div className="linee-box">

<a>Welcomer Message</a>

<label>
<input className="toggle" onChange={MessageToggle} checked={ Data.MessageToggle === "on" ? true : false } type="checkbox" />
<span ></span>
</label>

  </div>
</div>

<div style={ OnOff.message === "off" ? { display: "none" } : {} } >

<div className="stage-nav">

  <div onClick={ () => setTab2(1) } className={ Tab2 === 1 ? "stage-box Pactive" : "stage-box"}>
    Message
  </div>

  <div onClick={ () => setTab2(2) } className={ Tab2 === 2 ? "stage-box Pactive" : "stage-box"}>
    Channel
  </div>

</div>

<div className={ Tab2 === 1 ? "stage" : "stage hidden" }>

  

<div className="stage-component">

<div className="stage-box2">

<a style={{ margin: "10px" }}>Message</a>

<textarea value={ Data.textarea } onChange={ (e) => setData({ ...Data, textarea: e.target.value }) } placeholder="Welcome message">{ Data.textarea }</textarea>

<div className="info_conteter">
<a>{`{user}`} : Mentions the new member</a>
<br />
<a>{`{userName}`} : New member name without mentioning</a>
<br />
<a>{`{memberCount}`} : Amount of members reached</a>
<br />
<a>{`{server}`} : Server name</a>
<br />
<a>{`{inviter}`} : Mentions the Inviter</a>
<br />
<a>{`{inviterName}`} : Inviter name without mentioning</a>
<br />
<a>{`{invites}`} : User's invite counter</a>
</div>

</div>

</div>

</div>

<div className={ Tab2 === 2 ? "stage" : "stage hidden" }>

<div className="stage-component">

<div className="stage-box2">

<a>Message channel</a>
<select onChange={ (e) => setData({ ...Data, MessageChannel: e.target.value }) } style={{ width: "300px" }}>
{
channels.map(channel => (
  channel.id === Data.MessageChannel
  ?
  <option value={ channel.id } selected>{ channel.name }</option>
  :
  <option value={ channel.id }>{ channel.name }</option>
))
}
</select>

</div>

</div>

</div>
</div>

<div className="linee">
  <div className="linee-box">

<a>Welcomer image</a>

<label>
<input className="toggle" onChange={PhotoToggle} checked={ Data.PhotoToggle === "on" ? true : false } type="checkbox" />
<span ></span>
</label>

  </div>
</div>

<div style={ OnOff.image === "off" ? { display: "none" } : { marginTop: "20px" } } >

<Stage
         onTap={(e) => {
          setData({ ...Data, selected: e.target.name() })
        }}
        onClick={(e) => {
          setData({ ...Data, selected: e.target.name() })
        }}
        width={ Number(Data.stagewidth) }
        height={ Number(Data.stageheight) }
      >
        <Layer>
          <Image
            image={ Data.background }
            width={ Number(Data.stagewidth) }
            height={ Number(Data.stageheight) }
          />
          <Image
            image={ Data.icontype === "circle" ? Data.circle : Data.square }
            scaleX={ Number(Data.imagesx) / 50 }
            scaleY={ Number(Data.imagesy) / 50 }
            x={ Data.imagex }
            y={ Data.imagey }
            draggable
            name="Avatar"
            onDragEnd={(e) => {
              const newPos = e.target.position();
              setData({ ...Data, imagex: newPos.x, imagey: newPos.y });
            }}
            onTransformEnd={(e) => {
              setData({ ...Data, imagesx: Number(e.target.attrs.scaleX) * 50, imagesy: Number(e.target.attrs.scaleY) * 50, imagex:e.target.attrs.x, imagey:e.target.attrs.y });
            }}
            onClick={(e) => {
              setData({ ...Data, selected: e.target.name() })
            }}
            onTap={(e) => {
              setData({ ...Data, selected: e.target.name() })
            }}
          />
          <Text text="UserName" name="username"
          fill={Data.textcolor}
          shadowOffset={{ x: 1, y: 1 }}
          x={Number(Data.textx)}
          y={Number(Data.texty)}
          scaleX={Number(Data.textsx) / 50}
          scaleY={Number(Data.textsy) / 50}
          draggable
          fontFamily="Roboto,Arial,sans-serif"
          shadowColor="black"
          fontSize={Number(Data.texts)}
          onClick={(e) => {
            setData({...Data,selected:e.target.name()})
          }}
          onTap={(e) => {
            setData({...Data,selected:e.target.name()})
          }}
            onDragEnd={(e) => {
              const newPos = e.target.position();
              e.target.position({ x: Data.textx, y: Data.texty });
              setData({...Data,textx:newPos.x,texty:newPos.y})
            }}
            onTransformEnd={(e) => {
              setData({...Data,textsx: Number(e.target.attrs.scaleX) * 50,textsy: Number(e.target.attrs.scaleY) * 50,textx:e.target.attrs.x,texty:e.target.attrs.y});
}}
            />
          <TransformerComponent selectedShapeName={Data.selected} />
        </Layer>
      </Stage>

<div className="stage-nav">

  <div onClick={ () => setTab(1) } className={ Tab === 1 ? "stage-box Pactive" : "stage-box"}>
    Background
  </div>

  <div onClick={ () => setTab(2) } className={ Tab === 2 ? "stage-box Pactive" : "stage-box"}>
    Icon
  </div>

  <div onClick={ () => setTab(3) } className={ Tab === 3 ? "stage-box Pactive" : "stage-box"}>
    Username
  </div>

  <div onClick={ () => setTab(4) } className={ Tab === 4 ? "stage-box Pactive" : "stage-box"}>
    Channel
  </div>

</div>





<div className={ Tab === 1 ? "stage" : "stage hidden" }>

<div className="upload-component">

<label className="file">
<input type="file" id="ImageChanger" style={{ display: "none"}} onChange={ImageChanger} accept="image/*" />
<a>Upload</a>
</label>
<input className="imagefiled" id="imageurl" data-trigger="fileinput" readOnly="" placeholder="upload" name="imageurl" value={ Data.imageurl } />
  
</div>

</div>



<div className={ Tab === 2 ? "stage" : "stage hidden" }>

<div className="stage-box2">

<div className="stage-component">
<a>Right&nbsp;-&nbsp;Left</a>
<input type="Number" id="imagex" onChange={ (e)=> setData({...Data, imagex: Number(e.target.value)}) } value={Data.imagex} />
</div>

<div className="stage-component">
<a>Width</a>
<input type="Number" id="imagesx" onChange={ (e)=> setData({...Data, imagesx: Number(e.target.value)}) } value={Data.imagesx} />
</div>

</div>

<div className="stage-component">

<div className="stage-box2">

<a>Top&nbsp;-&nbsp;Bottom</a>
<input type="Number" id="imagey" onChange={ (e)=> setData({...Data, imagey: Number(e.target.value)}) } value={Data.imagey} />

<a>Height</a>
<input type="Number" id="imagesy" onChange={ (e)=> setData({...Data, imagesy: Number(e.target.value)}) } value={Data.imagesy} />

</div>

</div>

<div className="stage-box2">
<div className="stage-component">
<div className="stage-box2">

<a>Icon type</a>
<div>
<select defaultValue={Data.icontype} onChange={ (e) => setData({ ...Data, icontype: e.target.value }) } >
<option value="circle">Circle</option>
<option value="square">Square</option>
</select>
</div>

<div style={{ height: "85px" }} >

</div>

</div>
</div>

</div>

</div>


<div className={ Tab === 3 ? "stage" : "stage hidden" }>


<div className="stage-box2">

<div className="stage-component">
<a>Right&nbsp;-&nbsp;Left</a>
<input type="Number" id="textx" onChange={ (e) => setData({...Data, textx: Number(e.target.value) }) } value={Data.textx} />
</div>

<div className="stage-component">
<a>Width</a>
<input type="Number" id="textsx" onChange={ (e) => setData({...Data, textsx: Number(e.target.value) }) } value={Data.textsx} />
</div>

</div>

<div className="stage-component">

<div className="stage-box2">

<a>Top&nbsp;-&nbsp;Bottom</a>
<input type="Number" id="texty" onChange={ (e) => setData({...Data, texty: Number(e.target.value) }) } value={Data.texty} />

<a>Height</a>
<input type="Number" id="textsy" onChange={ (e) => setData({...Data, textsy: Number(e.target.value) }) } value={Data.textsy} />

</div>



</div>

<div className="stage-component">

<div className="stage-box3">

<a>Font size</a>
<input type="Number" id="texts" onChange={ (e) => setData({...Data, texts: Number(e.target.value) }) } value={Data.texts} />


<a style={{ paddingTop: "13px" }} >Color</a>
<input id="colorChanger" onChange={ (e) => setData({ ...Data, textcolor: e.target.value }) } value={ Data.textcolor } type="color" />

</div>

</div>

</div>

<div className={ Tab === 4 ? "stage" : "stage hidden" }>

<div className="stage-component">

<div className="stage-box2">

<a>Image channel</a>
<select onChange={ (e) => setData({ ...Data, PhotoChannel: e.target.value }) } style={{ width: "300px" }}>
{
channels.map(channel => (
  channel.id === Data.PhotoChannel
  ?
  <option value={ channel.id } selected>{ channel.name }</option>
  :
  <option value={ channel.id }>{ channel.name }</option>))
}
</select>

</div>

</div>

</div>

</div>

</div>

<div style={{ height: "80px" }}></div>

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