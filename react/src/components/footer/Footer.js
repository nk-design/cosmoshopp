import {ReactComponent as Logo} from "../../resources/COSMOSHOP.svg";
import {ReactComponent as Instagram} from "../../resources/instagram.svg";
import visa from "../../resources/visa.png";
import mastercard from "../../resources/mastercard.png";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer__first">
                <Logo className="footer__first--logo" />
                <a href="https://www.instagram.com/cosmoshopp_ua/" rel="noreferrer" target="_blank" className="footer__first--instagram"><Instagram /> cosmoshopp_ua</a>
                <p>Магазин брендової косметики since 2021</p>
            </div>
            <div className="footer__second">
                <div className="footer__second__left">
                    <h3>Категорії</h3>
                    <Link to="/catalogue/makeup">Макіяж</Link>
                    <Link to="/catalogue/face">Обличчя</Link>
                    <Link to="/catalogue/hair">Волосся</Link>
                    <Link to="/catalogue/sets">Набори</Link>
                    <Link to="/catalogue/candles">Свічки</Link>
                    <Link to="/catalogue/purses">Косметички</Link>
                </div>

                <div className="footer__second__right">
                    <h3>Інформація</h3>
                    {/* <Link to="/about-us">Про нас</Link> */}
                    <a href="https://www.instagram.com/cosmoshopp_ua/" rel="noreferrer" target="_blank" >Блог</a>
                    <Link to="/shipping">Доставка і оплата</Link>
                    {/* <Link to="/certificates">Подарункові сертифікати</Link> */}
                </div>
            </div>
            <div className="footer__third">
                <h3>Приймаємо до сплати</h3>
                <div className="footer__third__payments">
                    <img alt="PAYMENTMETHODS" src={visa}/>
                    <img alt="PAYMENTMETHODS" src={mastercard} />
                </div>
            </div>
        </section>
    )
}

export default Footer;