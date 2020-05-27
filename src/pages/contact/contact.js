import React from 'react';
import Footer from '../../components/footer/footer';
import Info from '../../components/info/info';
import Callback from '../../components/callback/callback';
import './contact.sass';
import '../page.sass';
import '../page-mobile.sass';

const about = () => {
 return (
  <div className='Page-Contact'>
   <div className='Content'>
    <div className='container'>
     <div className='row'>
      <div className='Page-Title'>
       <h1>Контактная информация</h1>
      </div>
     </div>
    </div>
    <Info mod='Contact' />
    <div className='container mb-5 pb-5'>
     <div className='row'>
      <div className='Page-Map col-lg-6 col-12'>
       <iframe
        src='https://yandex.ru/map-widget/v1/?um=constructor%3A915aee54bc32587cb47292ec08aa2c9d183ffe5b9c1b0f56b6ec018a92850e96&amp;source=constructor'
        width='100%'
        height='400'
        frameborder='0'
        title='contact-map'
       ></iframe>
      </div>
      <div className='Page-Callback col-lg-6 col-12'>
       <Callback />
      </div>
     </div>
    </div>
    <Footer />
   </div>
  </div>
 );
};

export default about;
