import React from 'react';
import { Link } from 'react-router-dom'

import './admin-menu.sass'

function Active() {
 var links = document.querySelectorAll('.AdminMenu-Link');
 links = Array.from(links)
 links.map((link) => {
  link.classList.remove('Active')
 })
}
class AdminMenu extends React.Component {
 constructor(props) {
  super(props);

 }
 componentDidMount() {

  window.addEventListener('load', function () {
   var links = document.querySelectorAll('.AdminMenu-Link');
   links = Array.from(links)
   links.map((link) => {
    link.addEventListener('click', function (e) {
     Active()
     this.classList.add('Active')
    })
   })
  })

 }
 render() {
  return (
   <ul className="AdminMenu" >
    <Link className='AdminMenu-Link Link' to='/admin/users'>All users</Link>
    <Link className='AdminMenu-Link Link' to='/admin/posts'>All posts</Link>
   </ul>

  )
 }
}

export default AdminMenu;