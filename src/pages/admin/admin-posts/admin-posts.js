import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPen } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

var db = firebase.firestore();
class AllPosts extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   Posts: [],
   Loadnig: true,
  };
 }

 async componentDidMount() {
  var handle = [];
  var i = 0;
  await db
   .collection('posts')
   .get()
   .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     handle[i] = doc.data();
     i++;
    });
    this.setState({ Posts: handle, Loading: false });
   });
 }

 render() {
  return (
   <div className='Admin-ListAllPosts'>
    {this.state.Loading ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.Loading} />
    ) : (
     <table>
      <thead>
       <tr>
        <th>Название:</th>
        <th>Дата:</th>
        <th>Удаленно:</th>
        <th>Действия:</th>
       </tr>
      </thead>
      <tbody>
       {this.state.Posts.map((post) => {
        return (
         <tr key={post.title}>
          <td>{post.title}</td>
          <td>{post.date}</td>
          <td>{post.deleted}</td>
          <td>
           <FaPen /> <FaCog /> <FaTrashAlt />
          </td>
         </tr>
        );
       })}
      </tbody>
     </table>
    )}
   </div>
  );
 }
}
export default AllPosts;
