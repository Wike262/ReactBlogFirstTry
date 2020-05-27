import React from 'react';

import Header from '../../components/header/header';
import Error404 from '../../components/errors/404/404';
import Post from '../../components/post/post';
import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase';
import 'firebase/functions';

class Tags extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tag: !!this.props.location.state ? this.props.location.state.tag : null,
   loading: true,
   tagData: {},
  };
 }

 componentDidUpdate(prevProps) {
  if (
   this.state.tag !== null &&
   prevProps.location.state.tag !== this.props.location.state.tag
  ) {
   this.setState({
    loading: true,
   });
   firebase
    .functions()
    .httpsCallable('tagInfo')({ tag: this.props.location.state.tag })
    .then((result) => {
     this.setState({
      tagData: result.data,
      loading: false,
     });
    });
  }
 }

 componentDidMount() {
  if (this.state.tag !== null) {
   firebase
    .functions()
    .httpsCallable('tagInfo')({ tag: this.props.location.state.tag })
    .then((result) => {
     this.setState({
      tagData: result.data,
      loading: false,
     });
    });
  } else {
   this.setState({ loading: false });
  }
 }
 render() {
  if (this.state.tag !== null) {
   return (
    <div className='Page-Tag'>
     <div className='Content'>
      {this.state.loading ? (
       <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
      ) : (
       <>
        <Header tag={this.state.tagData} />
        <div className='Section-Wrapper Articles container'>
         <div className='Section Section-Tag  row'>
          <Post tag={this.state.tagData} />
         </div>
        </div>
       </>
      )}
     </div>
    </div>
   );
  } else {
   return <Error404 />;
  }
 }
}

export default Tags;
