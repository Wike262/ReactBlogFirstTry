import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import TagCard from '../../components/tags/tag-card';

import './tags.sass';
import firebase from 'firebase';
import 'firebase/functions';

class Tags extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tag: {},
   loading: true,
  };
 }

 componentDidMount() {
  if (this.state.tag !== []) {
   firebase
    .functions()
    .httpsCallable('tagInfo')({ all: true })
    .then((result) => {
     this.setState({
      tag: result.data,
      loading: false,
     });
    });
  } else {
   this.setState({ loading: false });
  }
 }
 Tags() {
  let tags = [];
  for (let [key, value] of Object.entries(this.state.tag)) {
   tags.push(<TagCard title={key} tag={value} key={key} />);
  }
  return tags;
 }
 render() {
  return (
   <div className='Page-Tags'>
    <div className='Content'>
     {this.state.loading ? (
      <div className='Handler-Loading'>
       <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
      </div>
     ) : (
      <>
       <div className='Section-Wrapper Articles container'>
        <div className='Section Section-Tag row'>
         <div className='Tag-Title col-12'>
          <h1>Все категории</h1>
         </div>
         {this.Tags()}
        </div>
       </div>
      </>
     )}
    </div>
   </div>
  );
 }
}

export default Tags;
