"use client"
import "./Product.scss";
import { useContext } from "react";
import UsersContext from "@/context/Context";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Carousel from "nuka-carousel";
import { useState } from "react";
import ProductsList from "@/components/productsList/ProductsList";
import Image from "next/image";

const Product = ({product}) => {
    let { cart, setCart, openCart, cartIsOpen, productsData} = useContext(UsersContext);
    
    const [value, setValue] = useState(1);
    const [description, openDescription] = useState({description: 0, usage: 0, ingredient: 0, shipping: 0, payment: 0});
    const [productColor, changeColor] = useState(Object.keys(JSON.parse(product.color)).length>0?Object.entries(JSON.parse(product.color))[0][0].toUpperCase():"Оберіть колір");
    console.log(JSON.parse(product.color));
    console.log(productColor);

    const handleChange = (type) => {
        if(type==="minus"){
            if(value===1){
                setValue(value)
            } else {
                setValue(value - 1)
            }
        } else {
            if(value === product.quantity){
                setValue(value)
            } else {
                setValue(value + 1)
            }
        }
    }

    const generate_url = (str) => {
      let url = str.replace(/[\s]+/gi, '-');
      url = translit(url);
      url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase();	
      return url;
    }
    
    const translit = (str) => {
      const ua=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
      const en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
         let res = '';
      for(let i=0, l=str.length; i<l; i++)
      { 
        const s = str.charAt(i), n = ua.indexOf(s); 
        if(n >= 0) { res += en[n]; } 
        else { res += s; } 
        } 
        return res;  
    }

    const productId = product.id;
    const productType = product.type;
    const productName = generate_url(product.title);

    return (
        <>
            <section className="product">
                <Breadcrumbs links={[{path:"/catalogue", linkName: "Каталог"}, 
                {path: "/catalogue/" + productType, linkName: product.type === "makeup"?"Макіяж":
                product.type === "face"?"Обличчя":product.type === "candles"?"Свічки":product.type === "hair"?"Волосся":
                product.type === "sets"?"Набори":product.type === "purses"?"Косметички":""}, 
                {path: "/catalogue/" + productType + "/" + productId + "/" + productName, linkName: product.title}]}/>

                <div className="product__container">
                    <div className="product__slider">
                        <Carousel autoplay dragging speed={1500} wrapAround pauseOnHover autoplayInterval={7000}>
                            {product.image.split("/br").map((el, index) => <Image key={index} width={700} height={700} alt="SLIDERIMAGE" src={el}/>
                            )}
                        </Carousel>
                    </div>
                    <div className="product__description">
                        <div className="product__description--heading">
                            <h4>{product.title}</h4>
                        </div>
                        <div className="product__description--text">
                            {
                                product.more.split("/br").map((el, index) => <p key={index}>{el}</p>)
                            }
                        </div>
                        <div className="product__description--color">
                            {
                                Object.keys(JSON.parse(product.color)).length>0?
                                    <>
                                        <p>Колір: {productColor}</p>
                                        <div className="product__description--color-list">
                                            {Object.entries(JSON.parse(product.color)).map(([color,value],i)=>{
                                                return <div onClick={()=> changeColor(color.toUpperCase())} className="product__description--color-wrapper" color={color} key={i+color}>
                                                    <div style={{backgroundColor: value}}></div>
                                                </div>
                                            })}
                                        </div>
                                    </>
                                :""
                            }
                        </div>
                        <div className="product__description--code">
                            <h5>Код товару:</h5> {productId}
                        </div>
                        <div className="product__description--price">
                            {product.discount?<><h5 className="product__description--discount">{product.price} UAH</h5><h4>{Math.round(product.price*(1-product.discount/100))} UAH</h4></>:<h4>{product.price}UAH</h4>} 
                        </div>
                        <div className="product__description--cart">
                            <div className="product__description--quantity">
                                <div onClick={()=> handleChange("minus")}>-</div>
                                <input placeholder="1" type="number" value={value} onChange={() => setValue(value)}/>
                                <div onClick={()=> handleChange("plus")}>+</div>
                            </div>

                            {product.quantity>0?<div onClick={() => {
                                if(cart.find(el => el.id === product.id) === undefined){
                                    setCart([...cart, {
                                        id: product.id, 
                                        title: product.title, 
                                        price: product.price, 
                                        discount: product.discount, 
                                        quantity: value, 
                                        image: product.image.split("/br")[0], 
                                        color: productColor, 
                                        type: product.type,
                                        maxQuantity: product.quantity
                                    }])
                                } else {
                                    if(cart.find(el => el.id === product.id && el.color !== productColor) !== undefined){
                                        if(cart.find(el => el.id === product.id && el.color === productColor)){
                                            return setCart(cart.map((cartObj) => {
                                                if(cartObj.id === product.id && cartObj.color === productColor){
                                                    if(cartObj.quantity!==cartObj.maxQuantity){
                                                        cartObj.quantity = cartObj.quantity + value
                                                    }
                                                }
                                                
                                                return cartObj
                                            }))
                                        }else{

                                            return setCart([...cart, {
                                                id: product.id, 
                                                title: product.title, 
                                                price: product.price, 
                                                discount: product.discount, 
                                                quantity: value, 
                                                image: product.image.split("/br")[0], 
                                                color: productColor, 
                                                type: product.type,
                                                maxQuantity: product.quantity
                                            }])
                                        }
                                    }
                                    

                                    setCart(cart.map((cartObj) => {
                                        if(cartObj.id === product.id && cartObj.color === productColor){
                                            if(cartObj.quantity!==cartObj.maxQuantity){
                                                cartObj.quantity = cartObj.quantity + value
                                            }
                                        }
                                        
                                        return cartObj
                                    }))
                                };
                                openCart(!cartIsOpen)
                            }} className="product__description--button">Додати у кошик</div>:"Немає в наявності"}
                        </div>

                        <div className="product__description--subtext">
                            {product.description.length>0?
                            <div onClick={() => openDescription({...description, description: !description.description })} className={(description.description?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>ОПИС продукту <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h5>
                                {product.description.split("/br").map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            {product.usage.length>0?
                            <div onClick={() => openDescription({...description, usage: !description.usage })} className={(description.usage?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Спосіб застосування <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h5>
                                {product.usage.split("/br").map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            {product.ingredient.length>0?
                            <div onClick={() => openDescription({...description, ingredient: !description.ingredient })} className={(description.ingredient?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Склад <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h5>
                                {product.ingredient.split("/br").map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            <div onClick={() => openDescription({...description, shipping: !description.shipping })} className={(description.shipping?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Доставка <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h5>
                                <p>Нова Пошта</p>
                                <p>Укр Пошта</p>
                                <p>Точка самовивозу: Гоголя 8</p>
                            </div>
                            <div onClick={() => openDescription({...description, payment: !description.payment })} className={(description.payment?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Оплата <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h5>
                                <p>На нашому сайті ви можете здійснити оплату наступними способами:</p>
                                <p>Карткою Visa і MasterCard</p>
                                <p>Apple Pay або Google Pay</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div className='product__title'>
                <p>Популярні товари</p>
            </div>

            <ProductsList className="related" products={productsData.slice(0,4)}/>
        </>
    )
}

export default Product;