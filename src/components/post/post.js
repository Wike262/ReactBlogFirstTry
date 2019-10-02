import React from 'react';
import Author from '../author/author'
import Statistic from '../statistic/statistic'

import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import * as firebase from 'firebase/app';

import 'firebase/firebase-firestore'
import './post.sass'
import './post-mobile.sass'

firebase.initializeApp({
 apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 projectId: 'my-app-dd6a6',
})


function PostSinglePage(post, author, modificClass, postID) {
 var style;
 style = {
  backgroundImage: 'url(' + post.img + ')',
  backgroundSize: 'cover',
  backgroundPosition: '50%'
 }
 return (
  <>
   <div className='Post-Image' style={style} >
    <img src={post.img} alt={'Post-Image-' + postID} />
   </div>
   <div className='Post-Tag'>
    {post.tag instanceof Array ? post.tag.map((tag, i) => <a key={tag} href={post.tagLink[i]}>{post.tag[i]}{i === post.tag.length - 1 ? '' : ', '}</a>) : <a href={post.tagLink}>{post.tag}</a>}
   </div>
   <div className='Post-Title'>
    <h1>{post.title}</h1>
   </div>
   <div className="Post-Content">
    <p>{post.content}</p>
   </div>
   <div className="Post-AuthorDateWrapper">
    <div className='Post-Author'>
     <Author authorID={post.authorID} authorName={author.displayName} authorAvatar={author.photoURL} />
    </div>
    <div className='Post-Date'>
     <p>{post.date}</p>
    </div>
   </div>
   <div className='Post-Statistic'>
    <Statistic likes={post.likes} view={post.view} comment={post.comments} />
   </div>
  </>
 )
}

function PostInline(post, author, modificClass, postID) {

 return (
  <>
   <div className='Post-Image'>
    <Link to={{
     pathname: '/posts/' + postID,
     state: {
      post: post,
      author: author
     }
    }}>
     <img src={post.img} alt={'Post-Image-' + postID} />
    </Link>
   </div>
   <div className='Post-Tag'>
    {post.tag instanceof Array ? post.tag.map((tag, i) => <a key={tag} href={post.tagLink[i]}>{post.tag[i]}{i === post.tag.length - 1 ? '' : ', '}</a>) : <a href={post.tagLink}>{post.tag}</a>}
   </div>
   <div className='Post-Title'>
    <Link to={{
     pathname: '/posts/' + postID,
     state: {
      post: post,
      author: author
     }
    }}><h1>{post.title}</h1></Link>
   </div>
   <div className='Post-Description'>
    <p>{post.description}</p>
   </div>
   <div className="Post-AuthorDateWrapper">
    <div className='Post-Author'>
     <Author authorID={post.authorID} authorName={author.displayName} authorAvatar={author.photoURL} />
    </div>
    <div className='Post-Date'>
     <p>{post.date}</p>
    </div>
   </div>
   <div className='Post-Statistic'>
    <Statistic likes={post.likes} view={post.view} comment={post.comments} />
   </div>
   <div className='Post-Link'>
    <Link to={{
     pathname: '/posts/' + postID,
     state: {
      post: post,
      author: author
     }
    }}>Continue reading ></Link>
   </div>
  </>
 )
}

class Post extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   post: {},
   author: {},
   Loading: true
  }
 }

 componentDidMount() {
  if (!!this.props.post) {
   console.log(this.props)
   this.setState({
    post: this.props.post,
    author: this.props.author,
    Loading: false
   })
  }
  else {
   fetch('http://localhost:5000/my-app-dd6a6/us-central1/post?id=' + this.props.postID)
    .then((response) => {
     response.json()
      .then((response) => {
       this.setState({
        post: response
       })
       fetch('http://localhost:5000/my-app-dd6a6/us-central1/author?id=' + this.state.post.authorID)
        .then((response) => {
         response.json()
          .then((response) => {
           this.setState({
            author: response,
            Loading: false
           })
          })
        })
      })
    })
  }
 };


 render() {
  const modificClass = !!this.props.modClass ? this.props.modClass : ' col-xl-4 col-md-6 col-12';
  var postType;
  return (
   <article className={'Post-Wrapper ' + modificClass}>
    <div className='Post'>
     {
      this.state.Loading
       ?
       <ClipLoader
        size={70}
        color={'gray'}
        loading={this.state.Loading}
       />
       :
       modificClass === 'Post-SingleContent' ?
        postType = PostSinglePage(this.state.post, this.state.author, modificClass, this.props.postID)
        :
        postType = PostInline(this.state.post, this.state.author, modificClass, this.props.postID)
     }

    </div>
   </article>
  )
 }
}

export default Post;