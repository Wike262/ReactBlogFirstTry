import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaFileImage } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import Post from '../../components/post/post';
import './createPost.sass';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const MySwal = withReactContent(Swal);
var dat = new Date();
class CreatePosts extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   title: null,
   date: `${dat.getDate()}.${dat.getMonth()}.${dat.getFullYear()}`,
   content: null,
   tag: null,
   tags: null,
   tagName: null,
   description: null,
   img: null,
  };
  this.localUpdatePreview = this.localUpdatePreview.bind(this);
  this.tags = this.tags.bind(this);
  this.tagSelect = this.tagSelect.bind(this);
  this.openTags = this.openTags.bind(this);
  this.updateInformation = this.updateInformation.bind(this);
 }
 handleClick() {
  let wrapper = document.querySelector('.Creating-Post-Wrapper ');
  if (wrapper.classList.contains('Creating-Post-Wrapper-closed')) {
   wrapper.classList.remove('Creating-Post-Wrapper-closed');
  } else {
   wrapper.classList.add('Creating-Post-Wrapper-closed');
  }
 }

 updateInformation() {
  MySwal.fire({
   title: 'Загрузка',
   onOpen: () => {
    MySwal.showLoading();
   },
  });
  let reader = new FileReader();
  let file = document.getElementById('Avatar').files[0];
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
  let fileName =
   Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  let fileType = file.name.slice(file.name.indexOf('.'));
  let storageREF = firebase.storage().ref('Images/' + fileName + fileType);
  let task = storageREF.put(file);
  task.on(
   'state_changed',
   () => {},
   () => {},
   () => {
    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
     firebase
      .functions()
      .httpsCallable('addPost')({
       tagName: this.state.tagName,
       content: this.state.content,
       date: this.state.date,
       description: this.state.description,
       img: downloadURL,
       tag: this.state.tag,
       title: this.state.title,
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
    });
   },
  );
 }

 localUpdatePreview(e) {
  if (e.target.id === 'title')
   this.setState({
    title: e.target.value,
   });
  if (e.target.id === 'content')
   this.setState({
    content: e.target.value,
   });
  if (e.target.id === 'description')
   this.setState({
    description: e.target.value,
   });
 }

 updatePhoto(e) {
  let reader = new FileReader();
  reader.onload = (e) =>
   (document.querySelector('.Post-Image img').src = e.target.result);
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
 }

 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('tagInfo')({ all: true })
   .then((result) => {
    this.setState({
     tags: result.data,
    });
   });
 }
 openTags(e) {
  if (!!this.state.tags) {
   document.querySelector('.Tags').classList.toggle('Tags-Hidden');
   e.target.classList.toggle('Tags-Open');
  }
 }

 tagSelect(e) {
  document
   .querySelectorAll('.Tags-Buttons')
   .forEach((item) => item.classList.remove('Tags-Buttons-Selected'));
  e.target.classList.add('Tags-Buttons-Selected');
  this.setState({
   tag: e.target.innerHTML,
   tagName: e.target.dataset.tag,
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
     className='Tags-Buttons'
    >
     {value.name}
    </button>,
   );
  }
  return tags;
 }
 render() {
  let style;
  style = !!this.state.tags ? { background: '#fff' } : {};
  return (
   <>
    <div className='Creating-Post-Wrapper'>
     <div className='Creating-Post'>
      <h1>Создание статьи</h1>

      <label className='Account-Info-Label Avatar-Label Label' htmlFor='Avatar'>
       <div className='Input-Button Button'>
        <FaFileImage style={{ marginRight: '10px' }} />
        Выберите файл *
       </div>
       <input
        name='Avatar'
        id='Avatar'
        type='file'
        accept='image/x-png,image/gif,image/jpeg'
        onChange={(e) => this.updatePhoto(e)}
       />
      </label>
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
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Название статьи *'
       id='title'
       value={this.state.title}
       onChange={this.localUpdatePreview}
      />

      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Текст статьи *'
       id='content'
       onChange={this.localUpdatePreview}
      />
      <input
       className='Callback-Input TextArea'
       type='textarea'
       placeholder='Короткое описание статьи *'
       id='description'
       onChange={this.localUpdatePreview}
      />
      <button
       onClick={this.updateInformation}
       className='Creating-Post-Button Creating-Post-Button-Submit'
      >
       Подтвердить
      </button>
      <button
       onClick={this.handleClick}
       className='Creating-Post-Button Creating-Post-Button-close'
      >
       <FaTimes />
      </button>
      <button
       onClick={this.handleClick}
       className='Creating-Post-Button Creating-Post-Button-open'
      >
       <FaBars />
      </button>
     </div>
    </div>
    <div className='Post-SingleWrapper'>
     <div className='Post-Single Single'>
      <Post
       creatingPost={this.state}
       modClass='Post-SingleContent'
       creating='true'
      />
     </div>
    </div>
   </>
  );
 }
}

export default CreatePosts;
