import React from 'react';
import { Link } from 'react-router-dom';

import Author from '../author/author';

import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase';

class PostInline extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   authorID: this.props.post.authorID,
   author: {},
   loading: true,
  };
 }

 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('author')({ id: this.state.authorID })
   .then((result) => {
    this.setState({
     author: result.data,
     loading: false,
    });
   });
 }

 render() {
  let { post, modClass, id } = this.props;
  return (
   <article className={`Post-Wrapper ${modClass}`}>
    {this.state.loading ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
    ) : (
     <div className='Post'>
      <div className='Post-Image'>
       <Link
        to={{
         pathname: `/posts/${id}`,
         state: {
          post: post,
          author: this.state.authorID,
         },
        }}
       >
        <img src={post.img} alt={`Post-${id}`} />
       </Link>
      </div>
      <div className='Post-Tag'>
       {post.tag instanceof Array ? (
        post.tag.map((tag, i) => (
         <a key={tag} href={post.tagLink[i]}>
          {post.tag[i]}
          {i === post.tag.length - 1 ? '' : ', '}
         </a>
        ))
       ) : (
        <a href={post.tagLink}>{post.tag}</a>
       )}
      </div>
      <div className='Post-Title'>
       <Link
        to={{
         pathname: `/posts/${id}`,
         state: {
          post: post,
          author: this.state.authorID,
         },
        }}
       >
        <h1>{post.title}</h1>
       </Link>
      </div>
      <div className='Post-Description'>
       <p>{post.description}</p>
      </div>
      <div className='Post-AuthorDateWrapper'>
       <div className='Post-Author'>
        <Author author={this.state.author} authorID={this.state.authorID} />
       </div>
       <div className='Post-Date'>
        <p>{post.date}</p>
       </div>
      </div>
      <div className='Post-Link Link'>
       <Link
        to={{
         pathname: `/posts/${id}`,
         state: {
          post: post,
          author: this.state.authorID,
         },
        }}
       >
        Продолжить чтение >
       </Link>
      </div>
     </div>
    )}
   </article>
  );
 }
}

export default PostInline;
