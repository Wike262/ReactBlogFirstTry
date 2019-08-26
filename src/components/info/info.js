import React, { Component } from 'react'
import { IconContext } from "react-icons";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import './info.sass'

const info = () => {
 return (
  <div className="Info-Wrapper">
   <ul className="Info">
    <li className="Info-Address">
     <IconContext.Provider value={{ color: "#ffffff", style: { width: '40px' } }}>
      <div>
       <FaMapMarkerAlt />
      </div>
     </IconContext.Provider>203 Fake St. Mountain View, San Francisco, California, USA</li>
    <li className="Info-Tepelhone">
     <IconContext.Provider value={{ color: "#ffffff", style: { width: '40px' } }}>
      <div>
       <FaPhone />
      </div>
     </IconContext.Provider>
     <a href="tel:+2 392 3929 210">+2 392 3929 210</a></li>
    <li className="Info-Email">
     <IconContext.Provider value={{ color: "#ffffff", style: { width: '40px' } }}>
      <div>
       <FaEnvelope />
      </div>
     </IconContext.Provider><a href="mailto:	info@yourdomain.com">	info@yourdomain.com</a></li>
   </ul>
  </div>
 )
}

export default info;