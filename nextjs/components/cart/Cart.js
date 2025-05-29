import Link from "next/link";
import "./Cart.scss";
import Image from "next/image";

const Cart = ({cart,cartIsOpen, openCart, setCart}) => {

    function generate_url(str)
    {
      let url = str.replace(/[\s]+/gi, '-');
      url = translit(url);
      url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase();	
      return url;
    }
    
    function translit(str)
    {
      let ua=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
      let en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
         let res = '';
      for(let i=0, l=str.length; i<l; i++)
      { 
        let s = str.charAt(i), n = ua.indexOf(s); 
        if(n >= 0) { res += en[n]; } 
        else { res += s; } 
        } 
        return res;  
    }

    return cartIsOpen?<section className="cart" onClick={(event) => {
        if(event.target === event.currentTarget) {
            openCart(!cartIsOpen)
        }
    }}>
                    <div className="cart__wrapper">
                        <p onClick={()=> openCart(!cartIsOpen)} className="cart__close">X</p>
                        <h3 className="cart__title">Кошик</h3>
                        {cart.length>0?
                            <>
                                {cart.map((el) => {
                                    return <div key={el.id + Math.random()} className="cart__product" >
                                        <div className="cart__product__image">
                                            <Image width={200} height={200} src={el.image} alt="CARTIMAGE"/>
                                        </div>
                                        <div className="cart__product__description">
                                            {el.discount?<span>-{el.discount}%</span>:""}
                                            <Link onClick={() => {openCart(!cartIsOpen)} } 
                                            href={"/catalogue/" + el.type + "/" + el.id + "/" + generate_url(el.title)}>{el.title}</Link>
                                            {el.discount?<>
                                            <p className="cart__product__description__discount">{el.price} UAH</p>
                                            <p>{Math.round((100 - el.discount)/100 * el.price)} UAH</p></>:
                                            <p>{el.price} UAH</p>}
                                            {el.color?<p>Колір: {el.color}</p>:""}
                                            <p className="cart__product__description__quantity">Кількість: 
                                                <button onClick={() => {
                                                    setCart(cart.map((cartObj) => {
                                                        if(cartObj.id === el.id){
                                                            if(cartObj.quantity>1){
                                                                cartObj.quantity = cartObj.quantity - 1
                                                            }
                                                        }
                                                        
                                                        return cartObj
                                                    }))
                                                }}>-</button>
                                                {el.quantity} 
                                                <button onClick={() => {
                                                setCart(cart.map((cartObj) => {
                                                    if(cartObj.id === el.id){
                                                        if(cartObj.quantity<cartObj.maxQuantity){
                                                            cartObj.quantity = cartObj.quantity + 1
                                                        }
                                                    }
                                                    
                                                    return cartObj
                                                }))
                                            }}>+</button>
                                            </p>
                                            <p className="cart__product__description__delete"><button onClick={()=> setCart(cart.filter(cartObj => cartObj.id !== el.id))}>ВИДАЛИТИ</button></p>
                                        </div>
                                    </div>
                                })}
                                <div className="cart__sum">
                                    <h4>Разом: </h4> 
                                    <h4>{cart.reduce((acc, el) => el.discount?acc += (100 - el.discount)/100 * el.price * el.quantity:acc += el.price * el.quantity, 0)} UAH</h4>
                                </div>
                                <div className="cart__buttons">
                                    <p onClick={() => openCart(!cartIsOpen)}>Продовжити покупки</p>
                                    <Link onClick={() => openCart(!cartIsOpen)} href="/checkout">Оформити замовлення</Link>
                                </div>
                            </>:<div className="cart__disclaimer">
                                <h2>Кошик порожній.</h2>
                                <p >Обраний товар буде відображатись тут</p></div>
                        }
                    </div>
                </section>:""
}

export default Cart