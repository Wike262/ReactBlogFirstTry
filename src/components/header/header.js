import React from 'react'
import Background from '../../Img/bg_1.webp'
import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase'
import 'firebase/functions'

import './header.sass';
import './header-mobile.sass';


class Header extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   tag: {},
   loading: true,
  }
 }

 componentDidUpdate(prevProps) {

  if (this.props.tag !== undefined && prevProps.tag !== this.props.tag) {
   firebase.functions().httpsCallable('tagInfo')({ tag: this.props.tag })
    .then(result => {
     console.log(result)
     this.setState({
      tag: result,
      loading: false
     })
     this.props.loadingParent()
    })
  }
 }

 componentDidMount() {
  if (this.props.tag !== undefined) {
   console.log(this.props.tag)
   firebase.functions().httpsCallable('tagInfo')({ tag: this.props.tag })
    .then(result => {
     console.log(result)
     this.setState({
      tag: result.data,
      loading: false
     })
     this.props.loadingParent()
    })
  }
  else {
   this.setState({ loading: false })
  }
 }
 render() {
  return (
   this.state.loading ? <ClipLoader
    size={70}
    color={"gray"}
    loading={this.state.loading} /> :
    this.props.tag !== undefined ?
     <>
      <div className='Header-Tag Header' style={{ background: `url(${this.state.tag.background}) 100% 100%`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
       <div className='Overlay'></div>
       <div className='Header-Wrapper'>
        <div className='Header-Title Title'>
         <h1>{this.props.tag}</h1>
        </div>
        <div className='Header-Image'>
         <img src={this.state.tag.img} alt='Header' />
        </div>
        <div className='Header-Link Link'><a href='/#'>More about {this.props.tag} ></a></div>
       </div>
      </div>
     </>
     :
     <>
      <div className='Header-Hello Header' style={{ background: 'url(' + (!!this.props.backgroundImg ? this.props.backgroundImg : Background) + ') 100% 100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
       <div className='Overlay'></div>
       <div className='Header-Wrapper'>
        <div className='Header-Title Title'>
         <h1>Hello Stranger</h1>
        </div>
        <div className='Header-Image'>
         <img src='https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Funnamed.jpg?alt=media&token=e30b3c66-b49e-4df7-94f1-b2c565f931c0' alt='Header' />
        </div>
        <div className='Header-Description Description'>
         <p>It's platform where you can find interesting articles on many different topics.</p>
        </div>
        <div className='Header-Link Link'><a href='/#'>More about .Blog ></a></div>
       </div>
      </div>
     </>
  )

 }

}

export default Header