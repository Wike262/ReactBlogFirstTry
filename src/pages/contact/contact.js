import React from 'react';
import Footer from '../../components/footer/footer'
import Info from '../../components/info/info'
import '../page.sass'
import '../page-mobile.sass'

const about = () => {
 return (
  <div className="Page-Contact">
   <div className="Content">
    <Info />
    <Footer />
   </div>
  </div>
 )
}

export default about;