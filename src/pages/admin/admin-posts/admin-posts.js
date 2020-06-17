import React from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPen } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './posts.sass';

const MySwal = withReactContent(Swal);
class AllPosts extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   posts: [],
   loadnig: true,
   tags: null,
  };
  this.Rows = this.Rows.bind(this);
  this.openTags = this.openTags.bind(this);
 }

 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('posts')({
    all: true,
   })
   .then((result) => {
    firebase
     .functions()
     .httpsCallable('tagInfo')({ all: true })
     .then((result) => {
      this.setState({
       tags: result.data,
      });
     });
    this.setState({
     posts: result.data,
     loadnig: false,
    });
   });
 }
 tags() {
  let tags = [];
  for (let [key, value] of Object.entries(this.state.tags)) {
   tags.push(
    <button
     data-tag={key}
     onClick={this.tagSelect}
     key={key}
     className={`Tags-Buttons ${value.name}`}
    >
     {value.name}
    </button>,
   );
  }
  return tags;
 }

 Rows() {
  let row = [];
  for (let [key, value] of Object.entries(this.state.posts)) {
   row.push(
    <tr
     data-tag={value.tag}
     data-id={key}
     data-img={value.img}
     data-content={value.content}
     data-title={value.title}
     data-description={value.description}
     key={key}
    >
     <td key={`title${key}`}> {value.title}</td>
     <td key={`tag${key}`}> {value.tag}</td>
     <td key={`date${key}`}>{value.date}</td>
     <td className='Edits' key={`edit${key}`}>
      {!!this.state.tags ? (
       <FaPen onClick={this.openEditPopup} />
      ) : (
       <ClipLoader size={15} color={'gray'} />
      )}
      <FaTrashAlt onClick={this.openDeletePopup} />
     </td>
    </tr>,
   );
  }
  return row;
 }

 openDeletePopup(e) {
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  document.getElementById('delete-post-id').innerHTML = data.id;
  document.body.classList.add('Background');
  document.querySelector('.Popup-Delete').classList.add('PopupDeleteOpen');
 }

 openTags(e) {
  if (!!this.state.tags) {
   document.querySelector('.Tags').classList.toggle('Tags-Hidden');
   e.target.classList.toggle('Tags-Open');
  }
 }

 openEditPopup(e) {
  document.body.classList.add('Background');
  document.querySelector('.Popup').classList.add('PopupOpen');
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  console.log(data);
  document.querySelector(`.${data.tag}`).classList.add('Tags-Buttons-Selected');
  document.getElementById('title').value = data.title;
  document.getElementById('img').value = data.img;
  document.getElementById('content').value = data.content;
  document.getElementById('description').value = data.description;
  document.getElementById('post-id').innerHTML = data.id;
 }
 tagSelect(e) {
  document
   .querySelectorAll('.Tags-Buttons')
   .forEach((item) => item.classList.remove('Tags-Buttons-Selected'));
  e.target.classList.add('Tags-Buttons-Selected');
 }
 editSubmit() {
  document.body.classList.remove('Background');
  document.querySelector('.Popup').classList.remove('PopupOpen');
  MySwal.fire({
   title: 'Загрузка',
   onOpen: () => {
    MySwal.showLoading();
   },
  });
  const tag = document.querySelector('.Tags-Buttons-Selected').innerHTML;
  const title = document.getElementById('title').value;
  const img = document.getElementById('img').value;
  const content = document.getElementById('content').value;
  const description = document.getElementById('description').value;
  const id = document.getElementById('post-id').innerHTML;
  firebase
   .functions()
   .httpsCallable('editPost')({
    id,
    tag,
    title,
    img,
    description,
    content,
   })
   .then((result) => {
    if (!!result.data) {
     MySwal.fire({
      title: 'Обновновление успешно',
      icon: 'success',
     }).then((result) => {
      if (result.value) {
       window.location.reload();
      }
     });
    } else {
     MySwal.fire({
      icon: 'error',
      title: 'Что-то пошло не так!',
     });
    }
   });
 }
 deleteSubmit() {
  document.body.classList.remove('Background');

  document.querySelector('.Popup-Delete').classList.remove('PopupDeleteOpen');
  MySwal.fire({
   title: 'Загрузка',
   onOpen: () => {
    MySwal.showLoading();
   },
  });
  const id = document.getElementById('delete-post-id').innerHTML;
  firebase
   .functions()
   .httpsCallable('deletePost')({
    id,
   })
   .then((result) => {
    if (!!result.data) {
     MySwal.fire({
      title: 'Удаление успешно',
      icon: 'success',
     }).then((result) => {
      if (result.value) {
       window.location.reload();
      }
     });
    } else {
     MySwal.fire({
      icon: 'error',
      title: 'Что-то пошло не так!',
     });
    }
   });
 }

 render() {
  let style;
  style = !!this.state.tags ? { background: '#fff' } : {};
  return (
   <div className='Admin-ListAllPosts'>
    <div className='Popup'>
     <h1>
      Редактирование статьи <span id='post-id'></span>
     </h1>
     <button
      className='Close-Popup'
      onClick={() => {
       document.body.classList.remove('Background');
       document.querySelector('.Popup').classList.remove('PopupOpen');
       document
        .querySelectorAll('.Tags-Buttons')
        .forEach((item) => item.classList.remove('Tags-Buttons-Selected'));
      }}
     >
      <FaTimes />
     </button>
     <button
      onClick={this.openTags}
      className='Callback-Input Input Button-Tags'
      id='tag'
      style={style}
     >
      Категории{' '}
      {!!this.state.tags ? (
       <FaAngleDown />
      ) : (
       <ClipLoader size={20} color={'gray'} />
      )}
     </button>
     <div className='Tags Tags-Hidden'>
      {!!this.state.tags ? this.tags() : ''}
     </div>
     <label>
      Название
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Название статьи *'
       id='title'
      />
     </label>

     <label>
      Картинка:
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Ссылка на картинку *'
       id='img'
      />
     </label>
     <label>
      Текст:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Текст статьи *'
       id='content'
      />
     </label>
     <label>
      Описание:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Короткое описание статьи *'
       id='description'
      />
     </label>
     <button onClick={this.editSubmit} className='Button-Submit'>
      Подтвердить
     </button>
    </div>
    <div className='Popup-Delete'>
     <h1>
      Вы уверены что хотите удалить статью <span id='delete-post-id'></span>?
     </h1>
     <button
      className='Close-Popup-Delete'
      onClick={() => {
       document.body.classList.remove('Background');

       document
        .querySelector('.Popup-Delete')
        .classList.remove('PopupDeleteOpen');
      }}
     >
      <FaTimes />
     </button>
     <div className='Buttons-Wrapper'>
      <button
       onClick={() => {
        document.body.classList.remove('Background');
        document
         .querySelector('.Popup-Delete')
         .classList.remove('PopupDeleteOpen');
       }}
       className='Button-Cancel'
      >
       Отменить
      </button>
      <button onClick={this.deleteSubmit} className='Button-Submit'>
       Подтвердить
      </button>
     </div>
    </div>
    {this.state.loadnig ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
    ) : (
     <table>
      <thead>
       <tr>
        <th>Название:</th>
        <th>Категория:</th>
        <th>Дата:</th>
        <th>Действия:</th>
       </tr>
      </thead>
      <tbody>
       <this.Rows />
      </tbody>
     </table>
    )}
   </div>
  );
 }
}
export default AllPosts;
