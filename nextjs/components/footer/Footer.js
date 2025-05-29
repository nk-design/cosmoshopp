import logo from "@/public/COSMOSHOP.svg";
import instagram from "@/public/instagram.svg";
import visa from "@/public/visa.png";
import mastercard from "@/public/mastercard.png";
import Link from "next/link";
import "./Footer.scss";
import Image from "next/image";

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer__first">
                <div className="footer__first__image"><Image src={logo} className="footer__first--logo" alt="Logo" fill/></div>
                <div className="footer__first__insta">
                    <div className="footer__first__image"><Image src={instagram} alt="instagram" fill/></div>
                    <a href="https://www.instagram.com/cosmoshopp_ua/" rel="noreferrer" target="_blank" className="footer__first--instagram"> cosmoshopp_ua</a>
                </div>
                <p>Магазин брендової косметики since 2021</p>
            </div>
            <div className="footer__second">
                <div className="footer__second__left">
                    <h3>Категорії</h3>
                    <Link href="/catalogue/makeup">Макіяж</Link>
                    <Link href="/catalogue/body">Тіло</Link>
                    <Link href="/catalogue/hair">Волосся</Link>
                    <Link href="/catalogue/sets">Набори</Link>
                    <Link href="/catalogue/candles">Свічки</Link>
                    <Link href="/catalogue/purses">Косметички</Link>
                </div>

                <div className="footer__second__right">
                    <h3>Інформація</h3>
                    {/* <Link href="/about-us">Про нас</Link> */}
                    <Link href="/blog">Блог</Link>
                    <Link href="/shipping">Доставка і оплата</Link>
                    {/* <Link href="/certificates">Подарункові сертифікати</Link> */}
                </div>
            </div>
            <div className="footer__third">
                <h3>Приймаємо до сплати</h3>
                <div className="footer__third__payments">
                    <div><Image alt="PAYMENTMETHODS" src={visa}/></div>
                    <div><Image alt="PAYMENTMETHODS" src={mastercard} /></div>
                </div>
            </div>
        </section>
    )
}

export default Footer;