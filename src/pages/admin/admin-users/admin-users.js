import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPen } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';



class AllUsers extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   Users: [],
   Loading: true,
  }
 }
 componentDidMount() {
  fetch('http://localhost:5000/my-app-dd6a6/us-central1/AllUsers')
   .then((response) => {
    response.json()
     .then((response) => {
      this.setState({ Users: response, Loading: false })
     })
   })
 }
 render() {
  return (
   <div className="Admin-ListAllUsers">
    {
     this.state.Loading
      ?
      <ClipLoader
       size={70}
       color={'gray'}
       loading={this.state.Loading}
      />
      :
      <table>
       <thead>
        <tr>
         <th>Name:</th>
         <th>E-mail:</th>
         <th>Id:</th>
         <th>Disabled:</th>
         <th>Actions:</th>
        </tr>
       </thead>
       <tbody>
        {this.state.Users.map((user) => {
         return (
          <tr key={user.displayName}>
           <td>{user.displayName}</td>
           <td>{user.email}</td>
           <td>{user.uid}</td>
           <td>{`${user.disabled}`}</td>
           <td><FaPen /> <FaCog /> <FaTrashAlt /></td>
          </tr>)
        })}
       </tbody>
      </table>
    }
   </div>
  )
 }
}
export default AllUsers;