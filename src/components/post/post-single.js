import React from 'react';

import Author from '../author/author';

import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase';
var dat = new Date();
class PostSingle extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   authorID: this.props.authorID,
   author: {},
   post: this.props.post || {},
   loading: true,
  };
 }

 componentDidMount() {
  if (!!this.props.creating) {
   firebase
    .functions()
    .httpsCallable('author')({})
    .then((result) => {
     this.setState({
      author: result.data,
      loading: false,
     });
    });
  } else {
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
 }

 componentDidUpdate(prevProps) {
  if (prevProps.post !== this.props.post) {
   this.setState({
    post: this.props.post,
   });
  }
 }

 render() {
  let noPhoto =
   'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa';
  var { modClass, postID } = this.props;
  var post = this.state.post;
  if (!!this.state.post.title) {
  } else {
   post = {
    title: 'Название статьи будет здесь',
    tag: 'Категория',
    content: 'Текст статьи будет здесь',
    likes: 0,
    view: 0,
    comments: 0,
    date: `${dat.getDate()}. ${dat.getMonth()}`,
   };
  }
  var style;
  style = {
   backgroundImage: 'url(' + !!post.img ? post.img : noPhoto + ')',
   backgroundSize: 'cover',
   backgroundPosition: '50%',
  };
  return (
   <article className={'Post-Wrapper ' + modClass}>
    {this.state.loading ? (
     <ClipLoader size={150} color={'gray'} loading={this.state.loading} />
    ) : (
     <div className='Post'>
      <div className='Post-Image' style={style}>
       <img
        src={!!post.img ? post.img : noPhoto}
        alt={'Post-Image-' + postID}
       />
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
       <h1>{post.title}</h1>
      </div>
      <div className='Post-Content'>
       <p>{post.content}</p>
      </div>
      <div className='Post-AuthorDateWrapper'>
       <div className='Post-Author'>
        <Author author={this.state.author} authorID={this.state.authorID} />
       </div>
       <div className='Post-Date'>
        <p>{post.date}</p>
       </div>
      </div>
     </div>
    )}
   </article>
  );
 }
}

export default PostSingle;
