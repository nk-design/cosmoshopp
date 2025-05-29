import "./Navigation.scss";
import {ReactComponent as Logo} from "../../resources/COSMOSHOP.svg";
import {ReactComponent as Menu} from "../../resources/menu.svg";
import {ReactComponent as Bag} from "../../resources/bag.svg";
import {ReactComponent as LikePic} from "../../resources/like.svg";
import {ReactComponent as AccountImage} from "../../resources/account.svg";
import {ReactComponent as Search} from "../../resources/search.svg";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Footer from "../footer/Footer";
import ProductsList from "../productsList/ProductsList";
import UsersContext from "../../Context";
import Cart from "../cart/Cart";
import Account from "../account/Account";
import Like from "../like/Like";

const Navigation = ({accountIsOpen, openAccount}) => {
    const [menuStatus, isOpen] = useState(0);
    const [menuColor, switchColor] = useState(0);
    const location = useLocation();
    const [searchValue, setSearchValue] = useState("");
    const {fetchProducts, productsData, cart, setCart, user, cartIsOpen, openCart} = useContext(UsersContext);
    const [likeIsOpen, openLike] = useState(false);
    
    useEffect(() => {
        fetchProducts();
    },[fetchProducts])
    
    const menuHandler = () => {
        isOpen(!menuStatus)
    }

    const handleSearch = (evt) => {
        setSearchValue(evt.target.value)
    }

    const searchedProducts = productsData.filter(el => (String(el.title).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) || (String(el.brand).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) || (String(el.category).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) );

    useEffect(()=>{
        if(location.pathname !== "/"){
            switchColor(1)
        } else {
            switchColor(0)
        }

        isOpen(0);
    },[location])

    useEffect(()=>{
        if(searchValue){
            const concernedElement = document.querySelector(".nav__content__search input");

            document.addEventListener("click", (event) => concernedElement.contains(event.target)?"":setSearchValue(""), {once: true});
        }
    }, [searchValue])

    return (
        <>
            <section className={"nav" + (menuColor?"":" nav--homepage ")}>
                <div className="nav__disclaimer">
                    <p>Магазин брендової косметики</p>
                </div>
                <div className="nav__content">
                    <div className="nav__content__logo-container">
                        <Link to="/"><Logo className="nav__content--logo"/></Link>
                    </div>

                    <div className="nav__content__search">
                        <input placeholder="Пошук" value={searchValue} onChange={handleSearch}/>
                        <Search />

                        {searchValue?<ProductsList products={searchedProducts} />:""}
                    </div>

                    <div className="nav__content__controls">
                        <div onClick={() => openCart(!cartIsOpen)} className="nav__content__controls--bag">
                            <Bag />
                            <span>{cart.length>0?cart.length:""}</span>
                            <p>Кошик</p>

                        </div>


                        <div onClick={() => openLike(!likeIsOpen)} className="nav__content__controls--like">
                            <LikePic />
                            <p>Обране</p>
                            {likeIsOpen?<Like/>:""}
                        </div>

                        {user!==null?
                        <Link className="nav__content__controls--profile" to="/profile">
                            <AccountImage /> <p>Профіль</p>
                        </Link>:
                        <div onClick={() => openAccount(!accountIsOpen)}>
                            <AccountImage />
                            <p>Аккаунт</p>
                        </div>}
                    </div>

                    <div className="nav__content__menu" >
                        <Menu onClick={menuHandler} />

                        <div className={(menuStatus?"nav__content__menu--show":"nav__content__menu--fade") + " nav__content__menu--open"}>
                            <div className="nav__content__search">
                                <input placeholder="Пошук" value={searchValue} onChange={handleSearch}/>
                                <Search />

                                {searchValue?<ProductsList products={searchedProducts} />:""}
                            </div>

                            <div className="nav__content__controls nav__content__controls--mobile">
                                <div onClick={() => openCart(!cartIsOpen)} className="nav__content__controls--bag">
                                    <Bag />
                                    <span>{cart.length>0?cart.length:""}</span>
                                    <p>Кошик</p>

                            </div>

                                <div onClick={() => openLike(!likeIsOpen)} className="nav__content__controls--like">
                                    <LikePic />
                                    <p>Обране</p>
                                    {likeIsOpen?<Like/>:""}
                                </div>

                                {user!==null?
                                <Link className="nav__content__controls--profile" to="/profile">
                                    <AccountImage /> <p>Профіль</p>
                                </Link>:
                                <div onClick={() => openAccount(!accountIsOpen)}>
                                    <AccountImage />
                                    <p>Аккаунт</p>
                                </div>}
                            </div>

                            <Link to="/catalogue">Каталог</Link>
                            <Link to="/catalogue/face">Обличчя</Link>
                            <Link to="/catalogue/hair">Волосся</Link>
                            <Link to="/catalogue/makeup">Макіяж</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Cart cart={cart} cartIsOpen={cartIsOpen} openCart={openCart} setCart={setCart}/>

            {accountIsOpen?<Account openAccount={openAccount} accountIsOpen={accountIsOpen}/>:""}

            <Outlet/>

            <Footer/>
        </>
    )
}

export default Navigation;