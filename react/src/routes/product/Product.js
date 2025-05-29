import "./Product.scss";
import { useContext } from "react";
import UsersContext from "../../Context";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Carousel from "nuka-carousel";
import { useState } from "react";
import {ReactComponent as RightArrow} from "./../../resources/right_arrow.svg"
import { useParams } from "react-router-dom";
import ProductsList from "./../../components/productsList/ProductsList";

const Product = () => {
    let {currentProduct, productsData, cart, setCart, openCart, cartIsOpen} = useContext(UsersContext);
    console.log(currentProduct)

    const [value, setValue] = useState(1);
    const [description, openDescription] = useState({description: 0, usage: 0, ingredient: 0, shipping: 0, payment: 0});
    const [productColor, changeColor] = useState(Object.keys(currentProduct.color).length>0?Object.entries(currentProduct.color)[0][0].toUpperCase():"Оберіть колір")

    const handleChange = (type) => {
        if(type==="minus"){
            if(value===1){
                setValue(value)
            } else {
                setValue(value - 1)
            }
        } else {
            if(value === currentProduct.quantity){
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

    let {productId, productType, productName} = useParams()
    productId = currentProduct.id;
    productType = currentProduct.type;
    productName = generate_url(currentProduct.title);

    return (
        <>
            <section className="product">
                <Breadcrumbs links={[{path:"/catalogue", linkName: "Каталог"}, 
                {path: "/catalogue/" + productType, linkName: currentProduct.type === "makeup"?"Макіяж":
                currentProduct.type === "face"?"Обличчя":currentProduct.type === "candles"?"Свічки":currentProduct.type === "hair"?"Волосся":
                currentProduct.type === "sets"?"Набори":currentProduct.type === "purses"?"Косметички":""}, 
                {path: "/catalogue/" + productType + "/" + productId + "/" + productName, linkName: currentProduct.title}]}/>

                <div className="product__container">
                    <div className="product__slider">
                        <Carousel autoplay={true} dragging={true} speed={1500} wrapAround={true} pauseOnHover={true} autoplayInterval={7000}>
                            {currentProduct.image.map((el, index) => <img key={index} alt="SLIDERIMAGE" src={el}/>)}
                        </Carousel>
                    </div>
                    <div className="product__description">
                        <div className="product__description--heading">
                            <h4>{currentProduct.title}</h4>
                        </div>
                        <div className="product__description--text">
                            {
                                currentProduct.more.map((el, index) => <p key={index}>{el}</p>)
                            }
                        </div>
                        <div className="product__description--color">
                            {
                                Object.keys(currentProduct.color).length>0?
                                    <>
                                        <p>Колір: {productColor}</p>
                                        <div className="product__description--color-list">
                                            {Object.entries(currentProduct.color).map(([color,value],i)=>{
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
                            {currentProduct.discount?<><h5 className="product__description--discount">{currentProduct.price} UAH</h5><h4>{Math.round(currentProduct.price*(1-currentProduct.discount/100))} UAH</h4></>:<h4>{currentProduct.price}UAH</h4>} 
                        </div>
                        <div className="product__description--cart">
                            <div className="product__description--quantity">
                                <div onClick={()=> handleChange("minus")}>-</div>
                                <input type="number" value={value} onChange={() => setValue(value)}/>
                                <div onClick={()=> handleChange("plus")}>+</div>
                            </div>

                            <div onClick={() => {
                                console.log(productColor)
                                console.log(cart.find(el => el.id === currentProduct.id && el.color !== productColor) !== undefined)
                                if(cart.find(el => el.id === currentProduct.id) === undefined){
                                    setCart([...cart, {
                                        id: currentProduct.id, 
                                        title: currentProduct.title, 
                                        price: currentProduct.price, 
                                        discount: currentProduct.discount, 
                                        quantity: value, 
                                        image: currentProduct.image[0], 
                                        color: productColor, 
                                        type: currentProduct.type,
                                        maxQuantity: currentProduct.quantity
                                    }])
                                } else {
                                    if(cart.find(el => el.id === currentProduct.id && el.color !== productColor) !== undefined){
                                        if(cart.find(el => el.id === currentProduct.id && el.color === productColor)){
                                            return setCart(cart.map((cartObj) => {
                                                if(cartObj.id === currentProduct.id && cartObj.color === productColor){
                                                    if(cartObj.quantity!==cartObj.maxQuantity){
                                                        cartObj.quantity = cartObj.quantity + value
                                                    }
                                                }
                                                
                                                return cartObj
                                            }))
                                        }else{

                                            return setCart([...cart, {
                                                id: currentProduct.id, 
                                                title: currentProduct.title, 
                                                price: currentProduct.price, 
                                                discount: currentProduct.discount, 
                                                quantity: value, 
                                                image: currentProduct.image[0], 
                                                color: productColor, 
                                                type: currentProduct.type,
                                                maxQuantity: currentProduct.quantity
                                            }])
                                        }
                                    }
                                    

                                    setCart(cart.map((cartObj) => {
                                        if(cartObj.id === currentProduct.id && cartObj.color === productColor){
                                            if(cartObj.quantity!==cartObj.maxQuantity){
                                                cartObj.quantity = cartObj.quantity + value
                                            }
                                        }
                                        
                                        return cartObj
                                    }))
                                };
                                openCart(!cartIsOpen)
                            }} className="product__description--button">Додати у кошик</div>
                        </div>

                        <div className="product__description--subtext">
                            {currentProduct.description.length>0?
                            <div onClick={() => openDescription({...description, description: !description.description })} className={(description.description?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>ОПИС продукту <RightArrow/></h5>
                                {currentProduct.description.map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            {currentProduct.usage.length>0?
                            <div onClick={() => openDescription({...description, usage: !description.usage })} className={(description.usage?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Спосіб застосування <RightArrow/></h5>
                                {currentProduct.usage.map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            {currentProduct.ingredient.length>0?
                            <div onClick={() => openDescription({...description, ingredient: !description.ingredient })} className={(description.ingredient?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Склад <RightArrow/></h5>
                                {currentProduct.ingredient.map((el, index) => <p key={index}>{el}</p>)}
                            </div>

                            :""}
                            <div onClick={() => openDescription({...description, shipping: !description.shipping })} className={(description.shipping?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Доставка <RightArrow/></h5>
                                <p>Нова Пошта</p>
                                <p>Укр Пошта</p>
                                <p>Точка самовивозу: Гоголя 8</p>
                            </div>
                            <div onClick={() => openDescription({...description, payment: !description.payment })} className={(description.payment?" ":"product__description--closed ") + "product__description--sub"}>
                                <h5>Оплата <RightArrow/></h5>
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