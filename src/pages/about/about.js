import React from 'react';
import Header from '../../components/header/header'
import Background from '../../Img/author.webp'
import '../page.sass'
import '../page-mobile.sass'

const about = () => {
 return (
  <div className="Page-About">
   <div className="Content">
    <Header mod='about' backgroundImg={Background} />
   </div>
  </div>
 )
}

export default about;