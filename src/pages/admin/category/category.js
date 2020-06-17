import React from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPen } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

class AllTags extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tags: [],
   loading: true,
  };
  this.Rows = this.Rows.bind(this);
 }
 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('tagInfo')({
    all: true,
   })
   .then((result) => {
    this.setState({
     tags: result.data,
     loading: false,
    });
   });
 }
 Rows() {
  let row = [];
  for (let [key, value] of Object.entries(this.state.tags)) {
   row.push(
    <tr
     data-id={key}
     data-name={value.name}
     data-description={value.description}
     data-count={value.count}
     data-img={value.img}
     data-background={value.background}
     key={key}
    >
     <td>{value.name}</td>
     <td>{value.description}</td>
     <td>{value.count}</td>
     <td className='Edits'>
      <FaPen onClick={this.openEditPopup} />{' '}
      <FaTrashAlt onClick={this.openDeletePopup} />
     </td>
    </tr>,
   );
  }
  return row;
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
  const id = document.getElementById('tag-id').innerHTML;
  const name = document.getElementById('title').value;
  console.log(name);
  const img = document.getElementById('imgIcon').value;
  const background = document.getElementById('imgBackground').value;
  const count = document.getElementById('count').value;
  const description = document.getElementById('description').value;
  firebase
   .functions()
   .httpsCallable('editTag')({
    count,
    id,
    description,
    img,
    background,
    name,
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
  const id = document.getElementById('delete-tag-id').innerHTML;
  firebase
   .functions()
   .httpsCallable('deleteTag')({
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

 createSubmit() {
  document.body.classList.remove('Background');
  document.querySelector('.PopupCreate').classList.remove('PopupOpen');
  MySwal.fire({
   title: 'Загрузка',
   onOpen: () => {
    MySwal.showLoading();
   },
  });
  const name = document.getElementById('createTitle').value;
  const img = document.getElementById('createImgIcon').value;
  const background = document.getElementById('createImgBackground').value;
  const count = document.getElementById('createCount').value;
  const description = document.getElementById('createDescription').value;
  firebase
   .functions()
   .httpsCallable('createTag')({
    count,
    description,
    img,
    background,
    name,
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
 openEditPopup(e) {
  document.body.classList.add('Background');
  document.querySelector('.Popup').classList.add('PopupOpen');
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  document.getElementById('title').value = data.name;
  document.getElementById('description').value = data.description;
  document.getElementById('count').value = data.count;
  document.getElementById('imgBackground').value = data.background;
  document.getElementById('imgIcon').value = data.img;
  document.getElementById('tag-id').innerHTML = data.id;
 }
 openDeletePopup(e) {
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  document.getElementById('delete-tag-id').innerHTML = data.id;
  document.body.classList.add('Background');
  document.querySelector('.Popup-Delete').classList.add('PopupDeleteOpen');
 }
 render() {
  return (
   <div className='Admin-ListAllTag'>
    <div className='Popup'>
     <h1>
      Редактирование категории <span id='tag-id'></span>
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
      Описание:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Короткое описание статьи *'
       id='description'
      />
     </label>

     <label>
      Количество статей:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Количество статьей *'
       id='count'
      />
     </label>
     <label>
      Ссылка на изображение подложки:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Ссылка на изображение подложки *'
       id='imgBackground'
      />
     </label>
     <label>
      Ссылка на изображение иконки:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Ссылка на изображение ииконки *'
       id='imgIcon'
      />
     </label>
     <button onClick={this.editSubmit} className='Button-Submit'>
      Подтвердить
     </button>
    </div>
    <div className='Popup-Delete'>
     <h1>
      Вы уверены что хотите удалить категорию <span id='delete-tag-id'></span>?
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
    <div className='PopupCreate'>
     <h1>Создание категории</h1>
     <button
      className='Close-Popup'
      onClick={() => {
       document.body.classList.remove('Background');
       document.querySelector('.PopupCreate').classList.remove('PopupOpen');
       document
        .querySelectorAll('.Tags-Buttons')
        .forEach((item) => item.classList.remove('Tags-Buttons-Selected'));
      }}
     >
      <FaTimes />
     </button>

     <label>
      Название
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Название статьи *'
       id='createTitle'
      />
     </label>

     <label>
      Описание:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Короткое описание статьи *'
       id='createDescription'
      />
     </label>

     <label>
      Количество статей:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Количество статьей *'
       id='createCount'
      />
     </label>
     <label>
      Ссылка на изображение подложки:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Ссылка на изображение подложки *'
       id='createImgBackground'
      />
     </label>
     <label>
      Ссылка на изображение иконки:
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Ссылка на изображение ииконки *'
       id='createImgIcon'
      />
     </label>
     <button onClick={this.createSubmit} className='Button-Submit'>
      Подтвердить
     </button>
    </div>

    {this.state.loading ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
    ) : (
     <table>
      <thead>
       <tr>
        <th>Название:</th>
        <th>Описание:</th>
        <th>Кол-во статей:</th>
        <th>Действия:</th>
       </tr>
      </thead>
      <tbody>
       <this.Rows />
      </tbody>
     </table>
    )}
    <button
     className='CreateCategoryButton'
     onClick={() => {
      document.body.classList.add('Background');
      document.querySelector('.PopupCreate').classList.add('PopupOpen');
     }}
    >
     Создать категорию
    </button>
   </div>
  );
 }
}
export default AllTags;
