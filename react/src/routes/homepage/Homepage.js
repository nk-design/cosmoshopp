import './Homepage.scss';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import {ReactComponent as Instagram} from "../../resources/instagram.svg";
import EmailPromo from "../../resources/email_promo.png";
import {ReactComponent as RightArrow} from "../../resources/right_arrow.svg";
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const insta = async () => {
      const response = await fetch("https://feeds.behold.so/zyUK0Wrowy0E3gF1x1wz");
      const instaResponse = await response.json();
      setPosts(instaResponse);
    }
  
    insta();
  },[])

  console.log(posts)

  return (
    <section>
      <Header />

      <div className='categories__title'>
        <p>Категорії</p>
      </div>

      <div className='categories__tiles'>
        
        <div className='categories__tiles__row'>
          <Link to="/catalogue/body" className='categories__tile face__tile'>
            <p>ТІЛО</p>
          </Link>

          <Link to="/catalogue/purses" className='categories__tile hair__tile'>
            <p>КОСМЕТИЧКИ</p>
          </Link>
        </div>

        <div className='categories__tiles__row'>
          <Link to="/catalogue/makeup" className='categories__tile makeup__tile'>
            <p>МАКІЯЖ</p>
          </Link>

          <Link to="/catalogue/sets" className='categories__tile packages__tile'>
            <p>НАБОРИ</p>
          </Link>
        </div>

      </div>


      <div className='email_promo'>
        <img alt="EMAIL_PROMO" src={EmailPromo}/>
        <div className='email_promo__description'>
          <p>Зареєструйся і отримай знижку 5% на перше замовлення</p>
          <Link to="/register">Реєстрація <RightArrow/></Link>
        </div>
      </div>


      <div className='instagram__title'>
        <p>Instagram</p>
      </div>

      <div className='instagram__description'>
        <p>Слідкуйте за нами в instagram</p>
        <a className='instagram__link' href="https://www.instagram.com/cosmoshopp_ua/" rel="noreferrer" target="_blank"><Instagram /> cosmoshopp_ua</a>

        <div className='instagram__posts'>
          {posts.map((el,index) => {
            console.log(el.mediaUrl.indexOf("mp4"))
            console.log(el.thumbnailUrl)
            return (el.mediaUrl.indexOf("mp4")!==-1)?<a key={index} target='_blank' href={el.permalink} rel='noreferrer'><img alt="INSTAPOST" src={el.thumbnailUrl}/></a>:
            <a key={index} target='_blank' href={el.permalink} rel='noreferrer'><img alt="INSTAPOST" src={el.mediaUrl}/></a>
          })}
        </div>      
      </div>      
    </section>
  );
}

export default Home;
