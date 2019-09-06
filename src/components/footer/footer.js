import React from 'react'
import Navigation from '../menu/Navigation/Navigation'
import Info from '../info/info'
import './footer.sass';
import './footer-mobile.sass';

const footer = () => {
 const lin = [
  {
   link: '/photography',
   text: 'Photography',
   count: '6'
  },
  {
   link: '/tag/fashion',
   text: 'Fashion',
   count: '8'
  },
  {
   link: '/tag/technology',
   text: 'Technology',
   count: '2'
  },
  {
   link: '/tag/travel',
   text: 'Travel',
   count: '2'
  }
 ];
 const arch = [
  {
   link: '/archive/10.2018',
   text: 'October 2018',
   count: '6'
  },
  {
   link: '/archive/09.2018',
   text: 'Semptember 2018',
   count: '6'
  },
  {
   link: '/archive/08.2018',
   text: 'August 2018',
   count: '8'
  },
  {
   link: '/archive/07.2018',
   text: 'July 2018',
   count: '2'
  },
  {
   link: '/archive/06.2018',
   text: 'June 2018',
   count: '7'
  }
 ];
 return (
  <div className="Footer-Background">
   <div className='Footer-Wrapper container'>
    <div className='Footer row'>
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
      <Info mod='Footer' />
     </div>
    </div>
   </div>
  </div>
 )
}

export default footer;