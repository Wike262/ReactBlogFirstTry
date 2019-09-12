import React from 'react';
import Author from '../author/author'
import Statistic from '../statistic/statistic'
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore'
import './post.sass'
import './post-mobile.sass'

firebase.initializeApp({
 apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 projectId: 'my-app-dd6a6',
})
let db = firebase.firestore();



class Post extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   post: {},
   author: {}
  }
 }

 componentDidMount() {
  db.collection('posts').doc('' + this.props.postID)
   .get()
   .then((docPost) => {
    this.setState({
     post: docPost.data()
    })
    db.collection('authors')
     .doc('' + this.state.post.authorID)
     .get().then((docAuthor) => {
      this.setState({
       author: docAuthor.data()
      })
     })
   });
 }

 render() {
  const modificClass = this.props.modClass === undefined ? ' col-xl-4 col-md-6 col-12' : this.props.modClass;
  return (
   <article className={'Post-Wrapper' + modificClass}>
    <div className='Post'>
     <div className='Post-Image'>
      <a href={'/posts/' + this.props.postID}>
       <img src={this.state.post.img} alt='' />
      </a>
     </div>
     <div className='Post-Tag'>
      {this.state.post.tag instanceof Array ? this.state.post.tag.map((tag, i) => <a key={tag} href={this.state.post.tagLink[i]}>{this.state.post.tag[i]}{i === this.state.post.tag.length - 1 ? '' : ', '}</a>) : <a href={this.state.post.tagLink}>{this.state.post.tag}</a>}
     </div>
     <div className='Post-Title'>
      <a href={'/posts/' + this.props.postID}><h1>{this.state.post.title}</h1></a>
     </div>
     <div className='Post-Description'>
      <p>{this.state.post.description}</p>
     </div>
     <div className="Post-AuthorDateWrapper">
      <div className='Post-Author'>
       <Author authorID={this.state.post.authorID} authorName={this.state.author.name} authorAvatar={this.state.author.avatar} />
      </div>
      <div className='Post-Date'>
       <p>{this.state.post.date}</p>
      </div>
     </div>
     <div className='Post-Statistic'>
      <Statistic likes={this.state.post.likes} view={this.state.post.view} comment={this.state.post.comments} />
     </div>
     <div className='Post-Link'>
      <a href={'/posts/' + this.props.postID}>Continue reading ></a>
     </div>
    </div>
   </article >
  )
 }
}

export default Post;