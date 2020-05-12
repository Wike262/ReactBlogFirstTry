import React from "react";

import Author from "../author/author";
import Statistic from "../statistic/statistic";

import ClipLoader from "react-spinners/ClipLoader";

import firebase from "firebase";

class PostInline extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   authorID: this.props.authorID,
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
    });
   });
 }

 render() {

  let { post, modClass, postID } = this.props;
  var style;
  style = {
   backgroundImage: 'url(' + post.img + ')',
   backgroundSize: 'cover',
   backgroundPosition: '50%'
  }
  return (
   <article className={'Post-Wrapper ' + modClass}>
    {this.state.loading ? (
     <ClipLoader
      size={150}
      color={"gray"}
      loading={this.state.loading} />
    ) : (
      <div className='Post'>
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
         <Author author={this.state.author} authorID={this.state.authorID} />
        </div>
        <div className='Post-Date'>
         <p>{post.date}</p>
        </div>
       </div>
       <div className='Post-Statistic'>
        <Statistic likes={post.likes} view={post.view} comment={post.comments} />
       </div>
      </div>)}
   </article>

  );
 }
}

export default PostInline;
