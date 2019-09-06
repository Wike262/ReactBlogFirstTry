import React, { Component } from 'react';
import './author.sass'
import './author-mobile.sass'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore'
import { send } from 'q';

firebase.initializeApp({
 apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 projectId: 'my-app-dd6a6',
})
let db = firebase.firestore();

class Author extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   author: {}
  }
 }
 componentWillMount() {
  db.collection("authors").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
    this.setState({
     author: doc.data()
    })
    console.log(this.state.author)
   });
  });
 }
 render() {
  return (
   <Link className='Author' to={'/authors/'} >
    <div className='Author-Avatar'><img src={this.state.author.avatar} alt='' /></div>
    <div className='Author-Name'>
     <p>Written by</p>
     <h2>{this.state.author.name} ,</h2>
    </div>
   </Link>
  )
 }
}

export default Author;