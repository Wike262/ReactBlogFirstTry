import React from 'react';
import Navigation from '../menu/Navigation/Navigation';
import Info from '../info/info';
import './footer.sass';
import './footer-mobile.sass';

const footer = () => {
 const lin = [
  {
   link: '/tag/education',
   text: 'Образование',
   tag: 'education',
  },
  {
   link: '/tag/fashion',
   text: 'Мода',
   tag: 'fashion',
  },
  {
   link: '/tag/technology',
   text: 'Технологии',
   tag: 'technology',
  },
  {
   link: '/tag/travel',
   text: 'Путешествия',
   tag: 'travel',
  },
 ];
 const arch = [
  {
   link: '/archive/2.2020',
   text: 'Ферваль 2020',
   date: '2.2020',
  },
  {
   link: '/archive/3.2020',
   text: 'Март 2020',
   date: '3.2020',
  },
  {
   link: '/archive/4.2020',
   text: 'Апрель 2020',
   date: '4.2020',
  },
  {
   link: '/archive/5.2020',
   text: 'Май 2020',
   date: '5.2020',
  },
  {
   link: '/archive/6.2020',
   text: 'Июнь 2020',
   date: '6.2020',
  },
 ];
 return (
  <div className='Footer-Background'>
   <div className='Footer-Wrapper container'>
    <div className='Footer row'>
     <div className='Footer-Category Category col-xl-4 col-12'>
      <Navigation links={lin} title='Категории' mod='menu-footer' />
     </div>
     <div className='Footer-Archives Archives col-xl-4 col-12'>
      <Navigation links={arch} title='Архивы' mod='menu-footer' />
     </div>
     <div className='Footer-Info Info col-xl-4 col-12'>
      <div className='Info-Title'>
       <h3>Контакты</h3>
      </div>
      <Info mod='Footer' />
     </div>
    </div>
   </div>
  </div>
 );
};

export default footer;
