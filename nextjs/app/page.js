import './Homepage.scss';
import instagram from "@/public/instagram.svg";
import emailPromo from "@/public/email_promo.png";
import Link from 'next/link';
import Image from 'next/image';
import InstaPosts from '@/components/instaPosts/InstaPosts';
import Header from '@/components/header/Header';
import Head from 'next/head';

function Home() {

  return (
    <>
      <Header/>
      <Head >
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>COSMOSHOPP - Магазин брендової косметики</title>
        <meta name="description" content="Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="COSMOSHOPP - Магазин брендової косметики" />
        <meta property="og:description" content="Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні" />
        <meta property="og:url" content="https://www.cosmoshopp.com" />
        <meta property="og:image" content="https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="COSMOSHOPP - Магазин брендової косметики" />
        <meta name="twitter:description" content="Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні" />
        <meta name="twitter:image" content="https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no" />
        <link rel="canonical" href="https://www.cosmoshopp.com" />
      </Head>
      <section>

        <div className='categories__title'>
          <p>Категорії</p>
        </div>

        <div className='categories__tiles'>
          
          <div className='categories__tiles__row'>
            <Link href="/catalogue/body" className='categories__tile body__tile'>
              <p>ТІЛО</p>
            </Link>

            <Link href="/catalogue/purses" className='categories__tile purses__tile'>
              <p>КОСМЕТИЧКИ</p>
            </Link>
          </div>

          <div className='categories__tiles__row'>
            <Link href="/catalogue/makeup" className='categories__tile makeup__tile'>
              <p>МАКІЯЖ</p>
            </Link>

            <Link href="/catalogue/sets" className='categories__tile packages__tile'>
              <p>НАБОРИ</p>
            </Link>
          </div>

        </div>


        <div className='email_promo'>
          <Image alt="EMAIL_PROMO" src={emailPromo}/>
          <div className='email_promo__description'>
            <p>Зареєструйся і отримай знижку 5% на перше замовлення</p>
            <Link href="/register">Реєстрація <span className='email_promo__description__image'><svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></span></Link>
          </div>
        </div>


        <div className='instagram__title'>
          <p>Instagram</p>
        </div>

        <div className='instagram__description'>
          <p>Слідкуйте за нами в instagram</p>
          <div className='instagram__description__image'>
            <div><Image src={instagram} alt="instagram" fill/></div>
            <a className='instagram__link' href="https://www.instagram.com/cosmoshopp_ua/" rel="noreferrer" target="_blank">cosmoshopp_ua</a>
          </div>

          
          <InstaPosts />     
        </div>
      </section>
    </>
  );
}

export default Home;
