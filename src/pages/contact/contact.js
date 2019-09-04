import React from 'react';
import Footer from '../../components/footer/footer'
import Info from '../../components/info/info'
import Callback from '../../components/callback/callback'
import './contact.sass'
import '../page.sass'
import '../page-mobile.sass'

const about = () => {
 return (
  <div className='Page-Contact'>
   <div className='Content'>
    <div className='container'>
     <div className='row'>
      <div className='Page-Title'>
       <h1>Contact information</h1>
      </div>
     </div>
    </div>
    <Info mod='Contact' />
    <div className='container'>
     <div className='row'>
      <div className='Page-Map col-lg-6 col-12'>
       <iframe src='https://yandex.ru/map-widget/v1/?um=constructor%3A912b77231291fc995ec61bedf8e62b4014b1bd8d6e05ff4966133a90195e45ab&amp;source=constructor' width='100%' height='400' frameborder='0'></iframe>
      </div>
      <div className='Page-Callback col-lg-6 col-12'>
       <Callback />
      </div>
     </div>
    </div>
    <Footer />
   </div>
  </div>
 )
}

export default about;