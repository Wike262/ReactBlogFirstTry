import React from 'react';
import Author from '../author/author'
import post1 from '../../Img/image_1.webp'
import post2 from '../../Img/image_2.webp'
import post3 from '../../Img/image_3.webp'
import post4 from '../../Img/image_4.webp'
import post5 from '../../Img/image_5.webp'
import post6 from '../../Img/image_6.webp'
import post7 from '../../Img/image_7.webp'
import post8 from '../../Img/image_8.webp'
import post9 from '../../Img/image_9.webp'
import post10 from '../../Img/image_10.webp'
import post11 from '../../Img/image_11.webp'
import post12 from '../../Img/image_12.webp'

import './post.sass'

const posts =
 [
  {
   id: '0',
   tag: 'technology',
   tagLink: '#',
   title: 'the newest technology on this year 2019',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post1,
   authorID: '0',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '1',
   tag: 'travel',
   tagLink: '#',
   title: 'what to pack when visiting sea',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post2,
   authorID: '1',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '2',
   tag: 'fashion',
   tagLink: '#',
   title: 'Awesome Fashion Trend in For Summer',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post3,
   authorID: '2',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '3',
   tag: 'TRAVEL',
   tagLink: '#',
   title: '10 Most Awesome Place',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post4,
   authorID: '0',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '4',
   tag: 'TRAVEL',
   tagLink: '#',
   title: '10 Most Awesome Beach in Asia',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post5,
   authorID: '1',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '5',
   tag: 'TRAVEL',
   tagLink: '#',
   title: 'Top Amazing Places to Go in Summer',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post6,
   authorID: '2',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '6',
   tag: 'FASHION',
   tagLink: '#',
   title: '7 Beginner Photographer’s Mistakes',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post7,
   authorID: '0',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '7',
   tag: ['PHOTOGRAPHY', 'TRAVEL'],
   tagLink: ['#', '#'],
   title: 'Excited to Visit in Palawan Philippines',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post8,
   authorID: '1',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '8',
   tag: 'technology',
   tagLink: '#',
   title: 'How to Make a Paper Boat in Scratch',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post9,
   authorID: '2',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '9',
   tag: 'FASHION',
   tagLink: '#',
   title: '10 Best Way to Styling Your Lifestyle',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post10,
   authorID: '0',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '10',
   tag: 'FASHION',
   tagLink: '#',
   title: '10 Tips to Become a Fashion Pro',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post11,
   authorID: '1',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  },
  {
   id: '11',
   tag: 'PHOTOGRAPHY',
   tagLink: '#',
   title: 'Visit the Most Amazing Place in North America',
   description: 'Even the all-powerful Pointing has no control about the blind texts it is an almost',
   img: post12,
   authorID: '2',
   likes: '3',
   view: '100',
   comments: '5',
   date: '28.11.2018',
   link: '#'
  }
 ]

const post = (props) => {
 const id = props.id;
 const modificClass = props.modClass == undefined ? ' col-xl-4 col-md-6 col-12' : props.modClass;
 return (
  <article className={'Post-Wrapper' + modificClass}>
   <div className='Post'>
    <div className='Post-Image'>
     <a href={posts[id].link}>
      <img src={posts[id].img} alt='' />
     </a>
    </div>
    <div className='Post-Tag'>
     {posts[id].tag instanceof Array ? posts[id].tag.map((tag, i) => <a key={tag} href={posts[id].tagLink[i]}>{posts[id].tag[i]}{i === posts[id].tag.length - 1 ? '' : ', '}</a>) : <a href={posts[id].tagLink}>{posts[id].tag}</a>}
    </div>
    <div className='Post-Title'>
     <a href={posts[id].link}><h1>{posts[id].title}</h1></a>
    </div>
    <div className='Post-Description'>
     <p>{posts[id].description}</p>
    </div>
    <div className='Post-Author'>
     <Author id={posts[id].authorID} />
    </div>
    <div className='Post-Date'>
     <p>{posts[id].date}</p>
    </div>
    <div className='Post-Statistic'>
     <div className='Statistic-Likes'>
      <p></p>
     </div>
     <div className='Statistic-View'>
      <p></p>
     </div>
     <div className='Statistic-Comment'>
      <p></p>
     </div>
    </div>
    <div className='Post-Link'>
     <a href={posts[id].link}>Continue reading ></a>
    </div>
   </div>
  </article >
 )
}

export default post;