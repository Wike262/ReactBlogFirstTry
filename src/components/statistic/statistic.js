import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import './statistic.sass'


const stat = (props) => {
 return (
  <div className='Statistic'>
   <div className='Statistic-Likes'>
    <p><FaHeart style={{ marginRight: '10px' }} />{props.likes}</p>
   </div>
   <div className='Statistic-View'>
    <p><FaRegEye style={{ marginRight: '10px' }} />{props.view}</p>
   </div>
   <div className='Statistic-Comment'>
    <p><FaComment style={{ marginRight: '10px' }} />{props.comment}</p>
   </div>
  </div>
 )
}

export default stat;