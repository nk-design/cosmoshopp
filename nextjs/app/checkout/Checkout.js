"use client";
import "./Checkout.scss";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useContext, useState, useRef, useEffect } from "react";
import UsersContext from "@/context/Context";
import Link from "next/link";
import axios from "axios";
import emailjs from '@emailjs/browser';
import Image from "next/image";

const Checkout = ({openAccount, accountIsOpen}) => {
    const {cart, setCart, user, handleEdit, productsData, signUser} = useContext(UsersContext);
    const [discount, setDiscount] = useState("");
    const [cashback, setCashback] = useState("");
    const [discountArr, setDiscountArr] = useState([]);
    const [generalPromo, setGeneralPromo] = useState(false);
    const [novaPoshtaData, setNovaPoshtaData] = useState({
        regions: [],
        cities: [],
        offices: []
    })
    const [openList, setOpenList] = useState({
        region: 0,
        city: 0,
        office: 0,
    })


    const token = "c75e7793d54454867832952df26ed5cb";
    const getNovaPoshta = async (modelName, calledMethod, methodProperties) => {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
            'Content-Type': 'application/json'
        }
        
        const param = {
            "modelName": modelName,
            "calledMethod": calledMethod,
            "methodProperties": methodProperties,
            "apiKey": token
        };

        const request = await axios.post('https://api.novaposhta.ua/v2.0/json/', param, headers);

        if(calledMethod === "getAreas"){
            setNovaPoshtaData({...novaPoshtaData, regions: request.data.data})
        } else if(calledMethod === "getCities"){ 
            setNovaPoshtaData({...novaPoshtaData, cities: request.data.data})
        } else if(calledMethod === "getWarehouses"){
            setNovaPoshtaData({...novaPoshtaData, offices: request.data.data})
        }
    }
    
    useEffect(()=>{
        user&&user.user.firstBuy?setDiscount(5):setDiscount(null);
    },[user
    
    ])



    let orderSum = cart.reduce((acc, el) => el.discount?acc += (100 - el.discount)/100 * el.price * el.quantity:acc += el.price * el.quantity, 0);
    let finalSum = discount?Math.round(orderSum-orderSum*discount/100):cashback?Math.round(orderSum)-cashback:Math.round(orderSum);
    const [formValue, setFormValue] = useState({
        name: user&&user.user.name?user.user.name:"",
        surName: user&&user.user.name?user.user.surName:"",
        phone: user&&user.user.name?user.user.phone:"",
        email: user&&user.user.name?user.user.email:"",
        promocode: discount,
        oblast: user&&user.user.name?user.user.oblast:"",
        city: user&&user.user.name?user.user.city:"",
        viddil: user&&user.user.name?user.user.viddil:"",
        shippingValue: null,
        paymentValue: null,
        cashback: cashback
    })
    
    const form = useRef();

    const quantityEdit = (product, object) => {
        return product = {
            ...product,
            quantity: product.quantity - object.quantity
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`/api/auth/sendOrder/`, {
            user,
            cart,
            formValue,
            finalSum,
            cashback
        })

        if(user && user.user.firstBuy){
            axios.put('/api/auth/firstBuyRedeem/', {
                user
            })
            window.localStorage.removeItem("auth"); 
        }

        const general = generalPromo;
        const email = user?user.user.email:undefined;
        const promocodes = discountArr

        axios.put('/api/auth/updatePromo/', {
            general,
            email,
            promocodes
        })

        const soldOutProducts = cart.map(element => {
            if( productsData.find(product => product.id === element.id).quantity - element.quantity === 0){
                return "ID: " + element.id + "; Назва: " + element.title + " | "
            }
    
            return false
        }).reduce((acc,val) => {
           return acc = acc + val
        },"");

        if(soldOutProducts !== "false"){
            emailjs.send('service_5o3x4qo', 'template_nnxwm3h', {soldOutProducts}, "Lbt6HfiM5c0zijzRz")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }

        emailjs.sendForm('service_5o3x4qo', 'template_jpquvra', form.current, "Lbt6HfiM5c0zijzRz")
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        cart.map(element => {
            return handleEdit(element.id, "products", quantityEdit(productsData.find(product => product.id === element.id), element))
        })


        setCart([]);
        signUser(null);
        setTimeout(() =>{
            window.localStorage.removeItem("cart");
            window.localStorage.removeItem("auth"); 
            window.location.href = '/thankyou'
        });
    }

    const promoRendering = (promoArray) => {
        return promoArray.map((el) => {
            if((el.name === formValue.promocode) && (el.email === formValue.email || el.email === "cosmoshopp@cosmoshopp.com")){
                setDiscount(el.discount)
                el.quantity -= 1;
            }

            if(el.quantity <= 0 ){
                el = {};
            }

            return el
        })
    }


    const handlePromocode = async () => {
        const generalPromocodes = await axios.get('/api/auth/getGeneralPromo/').then((result) => {
            return result.data.user;
        });
        setDiscountArr(promoRendering(generalPromocodes));
        setGeneralPromo(true);
        setCashback("");      
    }

    const handleCashback = () => {
        if(discount){
            setCashback("")
        }else if(orderSum<user.user.cashback){
            setCashback(orderSum)
        }else {
            setCashback(user.user.cashback)
        }
    }

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

    return (<section className="checkout">
        <Breadcrumbs links={[{path:"/checkout", linkName: "Оформлення замовлення"}]}/>

        {cart.length>0?(
        <div className="checkout__wrapper">
            <div className="checkout__contact">
                <div className="checkout__contact__info">
                    <div className="checkout__contact__info__title">
                        <h1>КОНТАКТНА ІНФОРМАЦІЯ</h1>
                        {user?"":<><span>Аккаунт вже існує?</span>
                        <span onClick={()=>openAccount(!accountIsOpen)}>Увійти</span></>}
                    </div>

                    <form ref={form} className="checkout__contact__form" onSubmit={handleSubmit}>
                        <p>*Ім`я:</p>
                        <input defaultValue={user&&user.user.name?user.user.name:formValue.name} onChange={(event) => setFormValue({
                            ...formValue,
                            name: event.target.value
                        })} required autoComplete="on" type="text" placeholder="Введіть ім'я" name="user_name"/>

                        <p>*Прізвище:</p>
                        <input defaultValue={user&&user.user.surName?user.user.surName:formValue.surName} onChange={(event) => setFormValue({
                            ...formValue,
                            surName: event.target.value
                        })} required autoComplete="on" type="text" placeholder="Введіть прізвище" name="user_surname"/>

                        <p>*Номер телефону:</p>
                        <input defaultValue={user&&user.user.phone?user.user.phone:formValue.phone} onChange={(event) => setFormValue({
                            ...formValue,
                            phone: event.target.value
                        })} required autoComplete="on" type="number" placeholder="+380 (__) ___ __ __" name="user_phone"/>

                        <p>Email:</p>
                        <input defaultValue={user&&user.user.email?user.user.email:formValue.email} onChange={(event) => setFormValue({
                            ...formValue,
                            email: event.target.value
                        })} autoComplete="on" type="email" placeholder="Введіть email" name="user_email"/>

                        <h2>ДОСТАВКА</h2>

                        <p>*Оберіть спосіб доставки:</p>
                        <div className="checkout__contact__shipping">
                            <div>
                                <label htmlFor="NovaPoshta" onClick={()=>{setFormValue({
                                    ...formValue,
                                    shippingValue: "NovaPoshta"
                                    }); getNovaPoshta("Address", "getAreas", {});}}>Нова Пошта
                                    <input required id="NovaPoshta" type="radio" value="NovaPoshta" name="shipping"/>
                                </label>

                                <label htmlFor="Samovyviz" onClick={()=>setFormValue({
                                    ...formValue,
                                    shippingValue: "Samovyviz"
                                    })}>Самовивіз
                                    <input required id="Samovyviz" type="radio" value="Samovyviz" name="shipping"/>
                                </label>
                            </div>

                            {formValue.shippingValue === "NovaPoshta"? (<div>
                                <p>*Область:</p>
                                <input value={formValue.oblast || ""} onChange={(event)=> {
                                    setFormValue({
                                        ...formValue,
                                        oblast: event.target.value
                                    });
                                    if(event.target.value !== ""){
                                        setOpenList({...openList, region: 1})
                                    }
                                }} required autoComplete="on" type="text" placeholder="Введіть область" name="user_oblast"/>

                                {
                                    openList.region?<div className="novaposhta">{
                                        novaPoshtaData.regions.filter(el => el.Description.toLowerCase().indexOf(formValue.oblast.toLowerCase())!==-1 || el.DescriptionRu.toLowerCase().indexOf(formValue.oblast.toLowerCase())!==-1).map(el => <p onClick={(event)=>
                                            {
                                                console.log(event.target.innerText)
                                                setFormValue({
                                                    ...formValue,
                                                    oblast: event.target.innerText,
                                                });
                                                setOpenList({...openList, region: 0})
                                                getNovaPoshta("Address", "getCities", {"AreaRef": el.Ref})
                                            }
                                        } key={el.Ref}>{el.Description}</p>)
                                    }</div>:""
                                }

                                <p>*Місто:</p>
                                <input value={formValue.city || ""} onChange={(event)=> {
                                    setFormValue({
                                        ...formValue,
                                        city: event.target.value
                                    });
                                    if(event.target.value !== ""){
                                        setOpenList({...openList, city: 1})
                                    }
                                }} required autoComplete="on" type="text" placeholder="Введіть місто" name="user_city"/>

                                {
                                    openList.city?<div className="novaposhta">{
                                        novaPoshtaData.cities.filter(el => el.Description.toLowerCase().indexOf(formValue.city.toLowerCase())!==-1 || el.DescriptionRu.toLowerCase().indexOf(formValue.city.toLowerCase())!==-1).map(el => <p onClick={(event)=>
                                            {
                                                setFormValue({
                                                    ...formValue,
                                                    city: event.target.innerText,
                                                });
                                                setOpenList({...openList, city: 0})
                                                getNovaPoshta("Address", "getWarehouses", {"CityRef": el.Ref})
                                                console.log(novaPoshtaData)
                                            }
                                        } key={el.Ref}>{el.Description}</p>)
                                    }</div>:""
                                }

                                <p>*Відділення:</p>
                                <input value={formValue.viddil || ""} onChange={(event)=> {
                                    setFormValue({
                                        ...formValue,
                                        viddil: event.target.value
                                    })
                                    if(event.target.value !== ""){
                                        setOpenList({...openList, office: 1})
                                    }
                                }} required autoComplete="on" type="text" placeholder="Введіть відділення" name="user_viddil"/>

                                {
                                    openList.office?<div className="novaposhta">{
                                        novaPoshtaData.offices.filter(el => el.Description.toLowerCase().indexOf(formValue.viddil.toLowerCase())!==-1 || el.DescriptionRu.toLowerCase().indexOf(formValue.viddil.toLowerCase())!==-1).map(el => <p onClick={(event)=>
                                            {
                                                setFormValue({
                                                    ...formValue,
                                                    viddil: event.target.innerText,
                                                });
                                                setOpenList({...openList, office: 0})
                                            }
                                        } key={el.Ref}>{el.Description}</p>)
                                    }</div>:""
                                }

                            </div>): formValue.shippingValue === "Samovyviz"? (<div>
                                <p>Точка самовивозу: м. Дніпро, вул. Гоголя 8</p>
                                <p>Часи роботи: 10:00 - 20:00</p>
                            </div>):""}
                        </div>

                        <h2>ОПЛАТА</h2>

                        <p>*Оберіть спосіб оплати:</p>
                        <div className="checkout__contact__payment">
                            <label htmlFor="Card" onClick={()=>setFormValue({
                                ...formValue,
                                paymentValue: "Credit"
                                })}>Банківська карта
                                <input required id="Card" type="radio" value="Банківська карта" name="payment"/>
                            </label>

                            <label htmlFor="Cash" onClick={()=>setFormValue({
                                ...formValue,
                                paymentValue: "Cash"
                                })}>Оплата при отриманні
                                <input required id="Cash" type="radio" value="Оплата при отриманні" name="payment"/>
                            </label>
                            
                        </div>

                        {formValue.paymentValue==="Credit"?<div>
                                <p>Ви можете сплатити ваше замовлення зробивши переказ нам на ФОП рахунок:</p>
                                <h2>IBAN - UA883220010000026009340087574</h2>
                                <p>Код ЄДРПОУ - 3643710988</p>
                                <p>Також вкажіть в коментарі до сплати ваше ім`я, щоб ми могли вас ідентифікувати, а в призначенні `Сплата за косметику`</p>
                            </div>:""}

                        <p>Оформлюючи замовлення ви даєте згоду на обробку персональних даних, та інше, що описано на сторінці політика конфіденційності.</p>

                        <p>Промокод:</p>
                        <input onChange={(event)=>{setFormValue({
                            ...formValue,
                            promocode: event.target.value
                        })}} disabled={discount?"disabled":""} autoComplete="on" type="text" placeholder="Введіть промокод" 
                         value={discount?"Промокод - " + discount + "%":formValue.promocode} /> 

                         {discount?<input className="checkout__contact__promo" type="button" placeholder="Змінити промокод" value="Змінити промокод" onClick={() => {setDiscount(null)}}/>:
                         <input className="checkout__contact__promo" type="button" placeholder="Активувати промокод" value="Активувати промокод" onClick={()=>handlePromocode()}/>}

                        {user&&user.user?<div>
                            <p>Ваш поточний кешбек. Зробіть замовлення щоб накопичити балли які можна буде вітратити як знижку. Кешбек не сумується з промокодами</p>
                            <p>{user.user.cashback} UAH</p>
                            <input className="checkout__contact__promo" type="button" placeholder="Використати кешбек" value="Використати кешбек" onClick={()=>handleCashback()} disabled={user.user.cashback<0?"disabled":discount?"disabled":""}/>
                        </div>:""}


                        <p>Коментар до замовлення:</p>
                        <input onChange={(event)=>{setFormValue({
                            ...formValue,
                            comment: event.target.value
                        })}} autoComplete="on" type="text" placeholder="Ваш коментар" name="user_comment"/>

                        <input readOnly type="text" hidden name="user_payment" value={formValue.paymentValue==="Cash"?"При отриманні":"Карткою"}/>
                        <input readOnly type="text" hidden name="user_shipping" value={formValue.shippingValue==="Samovyviz"?"Самовивіз":"Нова Пошта"}/>
                        <input readOnly type="text" hidden name="user_sum" value={finalSum + "UAH"}/>
                        <input readOnly type="text" hidden name="user_goods" value={cart.reduce((acc,val) => acc + val.title + ", Кількість - " + val.quantity + ", Колір - " + val.color + ", Ціна - " + (val.discount?(100 - val.discount)/100 * val.price:val.price) + " UAH; ", "")}/>
                        <input readOnly type="text" hidden name="user_promo" value={discount?"Промокод - " + formValue.promocode + " " + discount + "%":formValue.promocode} />
                        <input readOnly type="text" hidden name="user_cashback" value={cashback?"Кешбек - " + cashback  + "UAH":cashback} />

                        <button type="submit">Замовити</button>
                    </form>
                </div>
            </div>
            <div className="checkout__finish">
                <h2>ВАШЕ ЗАМОВЛЕННЯ:</h2>
                <div className="checkout__finish__cart">
                    {cart.map(el => {
                        return (
                            <div key={el.id} className="checkout__finish__cart__product">
                                <div className="checkout__finish__cart__product__image">
                                <Link 
                                href={"/catalogue/" + el.type + "/" + el.id + "/" + generate_url(el.title)}><Image alt="PRODUCTSIMAGE" src={el.image} width={500} height={700}/></Link>
                                </div>
                                <div className="checkout__finish__cart__product__text">
                                    <Link
                                    href={"/catalogue/" + el.type + "/" + el.id + "/" + generate_url(el.title)}>{el.title}</Link>
                                    <p>Колір: {el.color}</p>
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
                                    <p>Номер товару: {el.id}</p>
                                    {el.discount?<>
                                    Ціна: <span className="cart__product__description__discount">{el.price} UAH</span>
                                    <span>{(100 - el.discount)/100 * el.price} UAH</span></>:
                                    <p>Ціна: {el.price} UAH</p>}
                                    <p className="cart__product__description__delete"><button onClick={()=> setCart(cart.filter(cartObj => cartObj.id !== el.id))}>ВИДАЛИТИ</button></p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {discount?<p>Додано промокод до першого замовлення - {discount}%</p>:""}
                {cashback?<p>Додано кешбек до замовлення - {cashback} UAH</p>:""}
                <h3>ЗАГАЛОМ ДО СПЛАТИ: {finalSum} UAH</h3>
                <p>Доставка за тарифами пошти</p>
            </div>
        </div>):<div className="cart__disclaimer">
                    <h2>Кошик порожній.</h2>
                    <p >Обраний товар буде відображатись тут</p>
                </div>}
    </section>)
}

export default Checkout;