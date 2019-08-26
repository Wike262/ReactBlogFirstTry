import React from 'react';
import author1 from '../../Img/author_1.webp'
import author2 from '../../Img/author_2.webp'
import author3 from '../../Img/author_3.webp'

const authors = [
 {
  id: '0',
  name: 'Dave Lewis',
  link: '#',
  avatar: author1
 },
 {
  id: '1',
  name: 'Dave Lewis',
  link: '#',
  avatar: author2
 },
 {
  id: '2',
  name: 'Dave Lewis',
  link: '#',
  avatar: author3
 }
]

const author = (props) => {
 const authorID = props.id;

 return (
  <a className='Author' href={authors[authorID].link}>
   <div className='Author-Avatar'><img src={authors[authorID].avatar} alt='' /></div>
   <div className='Author-Name'>
    <p>Written by</p>
    <h2>{authors[authorID].name},</h2>
   </div>
  </a>)
}


export default author;