import React from 'react';

import Header from '../../components/header/header'
import Error404 from '../../components/errors/404/404'
import Post from '../../components/post/post'
class Tags extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   tag: !!this.props.location.state ? this.props.location.state.tag : null,
   loading: true
  }
  this.updateState = this.updateState.bind(this)
 }
 updateState() {
  this.setState({
   loading: false
  })
 }
 render() {
  if (this.state.tag !== null) {
   return (
    <div className='Page-Tag'>
     <div className='Content'>
      <Header loadingParent={this.updateState} tag={this.props.location.state.tag} />
      {this.state.loading ?
       ''
       :
       <>
        <div className='Section-Wrapper Articles container'>
         <div className='Section Section-Tag  row'>
          <div className='Section-Title col-12'>
           <h2>Articles</h2>
          </div>
          <div className='Section-Description col-12'>
           <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.</p>
          </div>
          <Post tag={this.props.location.state.tag} />
         </div>
        </div>
       </>
      }
     </div>
    </div>
   )
  }
  else {
   return (<Error404 />)
  }
 }
}

export default Tags
