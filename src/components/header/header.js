import React, { Component } from 'react'
import AvatarPhoto from '../../Img/author.webp'
import Backgroud from '../../Img/bg_1.webp'
import './header.sass';
import './header-mobile.sass';

const header = (props) => {
 return (
  <div className="Header " style={{ background: 'url(' + Backgroud + ') 100% 100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
   <div className="Overlay"></div>
   <div className="Header-Wrapper Profile">
    <div className="Profile-Avatar Avatar"><img src={props.img} alt="" /></div>
    <div className="Profile-Hello Hello">
     <p>Hello I'm</p>
    </div>
    <div className="Profile-Name Name">
     <h1>{props.name}</h1>
    </div>
    <div className="Profile-Description Description">
     <p>{props.description}</p>
    </div>
    <div className="Profile-Link Link"><a href={props.profile}>More about me ></a></div>
   </div>
  </div>
 )

}

header.defaultProps = {
 name: 'Elen Henderson',
 img: AvatarPhoto,
 description: 'I am A Blogger Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.'
}

export default header;