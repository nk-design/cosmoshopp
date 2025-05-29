"use client";
import "./Navigation.scss";
import Logo from "@/public/COSMOSHOP.svg";
import Menu from "@/public/menu.svg";
import Bag from "@/public/bag.svg";
import LikePic from "@/public/like.svg";
import AccountImage from "@/public/account.svg";
import Search from "@/public/search.svg";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import ProductsList from "../productsList/ProductsList";
import UsersContext from "@/context/Context";
import Cart from "../cart/Cart";
import Account from "../account/Account";
import Like from "../like/Like";

const Navigation = () => {
    const [menuStatus, isOpen] = useState(0);
    const [accountIsOpen, openAccount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const {productsData, like, cart, setCart, user, cartIsOpen, openCart, location, setLocation} = useContext(UsersContext);
    const [likeIsOpen, openLike] = useState(false);
    const [menuColor, switchColor] = useState(0);

    
    const menuHandler = () => {
        isOpen(!menuStatus)
    }

    const handleSearch = (evt) => {
        if(searchValue){
            const concernedElement = document.querySelector(".nav__content__search input");

            document.addEventListener("click", (event) => concernedElement.contains(event.target)?"":setSearchValue(""), {once: true});
        }
        setSearchValue(evt.target.value)
    }

    const searchedProducts = productsData.filter(el => (String(el.title).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) || (String(el.brand).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) || (String(el.category).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) );

    useEffect(()=>{
        if(location.pathname !== "/"){
            switchColor(0)
        } else {
            switchColor(1)
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
            {/* <section className="nav + nav--homepage"> */}
                <div className="nav__disclaimer">
                    <p>Магазин брендової косметики</p>
                </div>
                <div className="nav__content">
                    <div className="nav__content__logo-container">
                        <Link href="/"><Image src={Logo} alt="LOGO" className="nav__content--logo"/></Link>
                    </div>

                    <div className="nav__content__search">
                        <input placeholder="Пошук" value={searchValue} onChange={handleSearch}/>
                        <Image src={Search} alt="Search" />

                        {searchValue?<ProductsList products={searchedProducts} />:""}
                    </div>

                    <div className="nav__content__controls">
                        <div onClick={() => openCart(!cartIsOpen)} className="nav__content__controls--bag">
                            <Image src={Bag} alt="BAG" width={25} height={25}/>
                            <span>{cart.length>0?cart.length:""}</span>
                            <p>Кошик</p>

                        </div>


                        <div onClick={() => openLike(!likeIsOpen)} className="nav__content__controls--like">
                            <Image src={LikePic} alt="LIKEPIC" width={30} height={30}/>
                            <span>{like.length>0?like.length:""}</span>
                            <p>Обране</p>
                            {likeIsOpen?<Like/>:""}
                        </div>

                        {user!==null?
                        <Link className="nav__content__controls--profile" href="/profile">
                            <Image src={AccountImage} alt="AccountImage" width={30} height={30}/> <p>Профіль</p>
                        </Link>:
                        <div onClick={() => openAccount(!accountIsOpen)}>
                            <Image src={AccountImage} alt="AccountImage" width={30} height={30}/>
                            <p>Аккаунт</p>
                        </div>}
                    </div>

                    <div className="nav__content__menu" >
                        <Image src={Menu} alt="MENU" onClick={menuHandler} />

                        <div className={(menuStatus?"nav__content__menu--show":"nav__content__menu--fade") + " nav__content__menu--open"}>
                            <div className="nav__content__search">
                                <input placeholder="Пошук" value={searchValue} onChange={handleSearch}/>
                                <Image src={Search} alt="Search" />

                                {searchValue?<ProductsList products={searchedProducts} />:""}
                            </div>

                            <div className="nav__content__controls nav__content__controls--mobile">
                                <div onClick={() => openCart(!cartIsOpen)} className="nav__content__controls--bag">
                                    <Image src={Bag} alt="BAG" width={25}/>
                                    <span>{cart.length>0?cart.length:""}</span>
                                    <p>Кошик</p>

                            </div>

                                <div onClick={() => openLike(!likeIsOpen)} className="nav__content__controls--like">
                                    <Image src={LikePic} alt="LIKEPIC" width={30}/>
                                    <span>{like.length>0?like.length:""}</span>
                                    <p>Обране</p>
                                </div>
                                    {likeIsOpen?<Like/>:""}

                                {user!==null?
                                <Link className="nav__content__controls--profile" href="/profile">
                                    <Image src={AccountImage} alt="AccountImage" width={30}/> <p>Профіль</p>
                                </Link>:
                                <div onClick={() => openAccount(!accountIsOpen)}>
                                    <Image src={AccountImage} alt="AccountImage" width={30}/>
                                    <p>Аккаунт</p>
                                </div>}
                            </div>

                            <Link href="/catalogue">Каталог</Link>
                            <Link href="/catalogue/body">Тіло</Link>
                            <Link href="/catalogue/hair">Волосся</Link>
                            <Link href="/catalogue/makeup">Макіяж</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Cart cart={cart} cartIsOpen={cartIsOpen} openCart={openCart} setCart={setCart}/>

            {accountIsOpen?<Account openAccount={openAccount} accountIsOpen={accountIsOpen}/>:""}
        </>
    )
}

export default Navigation;