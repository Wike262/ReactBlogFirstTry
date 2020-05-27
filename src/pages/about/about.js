import React from 'react';
import Header from '../../components/header/header';
import ClipLoader from 'react-spinners/ClipLoader';
import Footer from '../../components/footer/footer';

import firebase from 'firebase';
import 'firebase/functions';

import '../page.sass';
import '../page-mobile.sass';
import './about.sass';

class About extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   posts: 0,
   tags: 0,
   users: 0,
   authors: 0,
   loading: true,
  };
 }

 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('posts')({ count: true })
   .then((result) => {
    this.setState({
     posts: result.data,
    });
    firebase
     .functions()
     .httpsCallable('tagInfo')({ count: true })
     .then((result) => {
      this.setState({
       tags: result.data,
      });
      firebase
       .functions()
       .httpsCallable('allUsers')({ count: true })
       .then((result) => {
        this.setState({
         users: result.data,
         authors: result.data,
         loading: false,
        });
       });
     });
   });
 }
 render() {
  let background =
   'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2F%D0%91%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.png?alt=media&token=24ad701a-9c6c-416f-a9e6-410392d81ba1';
  return this.state.loading ? (
   <div className='Handler-Loading'>
    <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
   </div>
  ) : (
   <div className='Page-About'>
    <div className='Content'>
     <Header
      img={background}
      title='О нашем информационном портале'
      about={true}
      modClass='Header-About Header'
      mod='about'
      desc=' '
     />
     <div className='About row'>
      <div className='About-Title col-12'>
       <h1>Наша статистика</h1>
      </div>
      <div className='About-Description col-12'>
       <p>
        Мы постоянно развиваемся для того чтобы предоставлять вам самый удобный
        сервис написания и чтения статей.
       </p>
      </div>
      <div className='Statistic-Item col-md-6 col-12'>
       <div className='Count-Wrapper'>
        <div className='Count'>
         <h3>{this.state.posts}</h3>
        </div>
       </div>
       <div className='Statistic-Description'>
        <h2>Статьи</h2>
        <p>На все различные темы</p>
       </div>
      </div>
      <div className='Statistic-Item col-md-6 col-12'>
       <div className='Count-Wrapper'>
        <div className='Count'>
         <h3>{this.state.tags}</h3>
        </div>
       </div>
       <div className='Statistic-Description'>
        <h2>Категории</h2>
        <p>Для охвата всех волнущих тем</p>
       </div>
      </div>
      <div className='Statistic-Item col-md-6 col-12'>
       <div className='Count-Wrapper'>
        <div className='Count'>
         <h3>{this.state.users}</h3>
        </div>
       </div>
       <div className='Statistic-Description'>
        <h2>Пользователей</h2>
        <p>Активно использующих информационный портал</p>
       </div>
      </div>
      <div className='Statistic-Item col-md-6 col-12'>
       <div className='Count-Wrapper'>
        <div className='Count'>
         <h3>{this.state.authors}</h3>
        </div>
       </div>
       <div className='Statistic-Description'>
        <h2>Авторов</h2>
        <p>Создающих уникальный и не повторимый контент</p>
       </div>
      </div>
     </div>
    </div>
    <Footer />
   </div>
  );
 }
}

export default About;
