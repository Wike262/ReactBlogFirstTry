import React from 'react';

import Header from '../../components/header/header';
import Error404 from '../../components/errors/404/404';
import Post from '../../components/post/post';
import ClipLoader from 'react-spinners/ClipLoader';

class Arhive extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   arhive: !!this.props.location.state ? this.props.location.state.date : null,
   loading: true,
  };
 }

 render() {
  if (this.state.arhive == '5.2020') {
   return (
    <div className='Page-Tag'>
     <div className='Content'>
      <Header title={this.state.arhive} />
      <div className='Section-Wrapper Articles container'>
       <div className='Section Section-Tag  row'>
        <Post />
       </div>
      </div>
      )
     </div>
    </div>
   );
  } else {
   if (!!this.state.arhive) {
    return (
     <div className='Page-Tag'>
      <div className='Content'>
       <>
        <Header title={this.state.arhive} />
        <div className='Section-Wrapper Articles container'>
         <div className='Section Section-Tag  row'></div>
        </div>
       </>
      </div>
     </div>
    );
   } else {
    return <Error404 />;
   }
  }
 }
}

export default Arhive;
