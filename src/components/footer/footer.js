import React, { Component } from 'react'
import Navigation from '../menu/Navigation/Navigation'
import Info from '../info/info'
import './footer.sass';

const footer = () => {
 const lin = [
  {
   link: '#',
   text: 'Photography',
   count: '6'
  },
  {
   link: '#',
   text: 'Fashion',
   count: '8'
  },
  {
   link: '#',
   text: 'Technology',
   count: '2'
  },
  {
   link: '#',
   text: 'Travel',
   count: '2'
  }
 ];
 const arch = [
  {
   link: '#',
   text: 'October 2018',
   count: '6'
  },
  {
   link: '#',
   text: 'Semptember 2018',
   count: '6'
  },
  {
   link: '#',
   text: 'August 2018',
   count: '8'
  },
  {
   link: '#',
   text: 'July',
   count: '2'
  },
  {
   link: '#',
   text: 'June',
   count: '7'
  }
 ];
 return (
  <div className='Footer container'>
   <div className='Footer-Wrapper row'>
    <div className='Footer-Category Category col-xl-4 col-12'>
     <Navigation links={lin} title='Category' mod='menu-footer' />
    </div>
    <div className='Footer-Archives Archives col-xl-4 col-12'>
     <Navigation links={arch} title='Archives' mod='menu-footer' />
    </div>
    <div className="Footer-Info Info col-xl-4 col-12">
     <div className="Info-Title">
      <h3>Have a Questions?</h3>
     </div>
     <Info />
    </div>
   </div>
  </div>
 )
}

export default footer;