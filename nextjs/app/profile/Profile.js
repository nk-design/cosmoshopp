"use client"
import UsersContext from "@/context/Context";
import { useContext, useEffect, useState, } from "react";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import axios from "axios";
import "./Profile.scss";
import Image from "next/image";
import "./../checkout/Checkout.scss";

const Profile = () => {
    const {user, signUser, location} = useContext(UsersContext)
    const [block, openBlock] = useState({
        promo: false,
        order: false,
        profile: false
    })
    const [promos, setPromos] = useState([])
    const [formValue, setFormValue] = useState({
        name: user&&user.user.name?user.user.name:"",
        surName: user&&user.user.surName?user.user.surName:"",
        phone: user&&user.user.phone?user.user.phone:"",
        email: user&&user.user.email?user.user.email:"",
        promocode: user&&user.user.firstBuy?5:"",
        oblast: user&&user.user.oblast?user.user.oblast:"",
        city: user&&user.user.city?user.user.city:"",
        viddil: user&&user.user.viddil?user.user.viddil:""
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put('/api/auth/sendOrder/', {
            user,
            formValue
        })
    }

    const handleNavigation = () => {
        if (typeof window !== 'undefined') {
            // This code runs only in the client-side (browser)
            setTimeout(() => {
              window.location.href = '/';
            }, 0);
        }
    };

    useEffect(()=>{
        axios.get('/api/auth/getGeneralPromo/').then((result) => {
            return setPromos(result.data.user.filter(element => element.email === formValue.email))
        });

    },[formValue.email])

    return user && user.token?<section className="profile">
        <Breadcrumbs links={[]} />
        <h1>Привіт, {user.user.email}</h1>
        <p>Тут можна знайти ваші промокоди та замовлення, або видалити аккаунт</p>

        <div onClick={()=>{openBlock({
            ...block,
            order: !block.order
        })}} className="profile__orders">
            <h2>Замовлення <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h2>

            {block.order?user.user.orders.map((element,index) => {
                return (
                    <div key={index + 1}>
                        <h2>Замовлення {index + 1}</h2>
                        {
                            element.map(element2 => {
                                return <div key={Math.random()} className="profile__orders__item">
                                    <div>
                                        <Image src={element2.image} alt="PRODUCTIMAGE" width={500} height={700}/>
                                    </div>
                                    <div>
                                        <p>Номер товара: {element2.id}</p>
                                        <p>Назва: {element2.title}</p>
                                        <p>Колір: {element2.color}</p>
                                        <p>Знижка: {element2.discount}</p>
                                        <p>Кількість: {element2.quantity}</p>
                                        <p>Ціна: {element2.price} UAH</p>
                                    </div>
                                </div>
                            })
                        }
                        <hr/>
                    </div>
                )
            }):""}
        </div>

        <div onClick={()=>{openBlock({
            ...block,
            promo: !block.promo
        })}} className="profile__promos">
            <h2>Промокоди <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h2>

            {block.promo?promos.length>0?promos.map((element, index) => {
                return <div key={index}>
                    <h3>Назва промокоду - {element.name}, Знижка промокоду - {element.discount}, Кількість промокоду - {element.quantity}</h3>
                </div>
            }):<p>Поки що у вас немає промокодів</p>:""}
        </div>

        <div className="profile__promos">
            <h2 onClick={()=>{openBlock({
            ...block,
            profile: !block.profile
        })}}>Редагувати профіль <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
    </svg></h2>

           {block.profile? <form className="checkout__contact__form" onSubmit={handleSubmit}>
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
                        <div className="checkout__contact__shipping">

                            <div>
                                <p>*Область:</p>
                                <input defaultValue={user&&user.user.oblast?user.user.oblast:formValue.oblast} onChange={(event)=> setFormValue({
                                    ...formValue,
                                    oblast: event.target.value
                                })} required autoComplete="on" type="text" placeholder="Введіть область" name="user_oblast"/>

                                <p>*Місто:</p>
                                <input defaultValue={user&&user.user.city?user.user.city:formValue.city} onChange={(event)=> setFormValue({
                                    ...formValue,
                                    city: event.target.value
                                })} required autoComplete="on" type="text" placeholder="Введіть місто" name="user_city"/>

                                <p>*Відділення:</p>
                                <input defaultValue={user&&user.user.viddil?user.user.viddil:formValue.viddil} onChange={(event)=> setFormValue({
                                    ...formValue,
                                    viddil: event.target.value
                                })} required autoComplete="on" type="text" placeholder="Введіть відділення" name="user_viddil"/>
                            </div>
                        </div>

                        <button type="submit">Редагувати</button>
                    </form>:""}
        </div>

        <button className="profile__logout" onClick={() => {window.localStorage.removeItem("auth"); signUser(null)}}>Вийти з аккаунту</button>
        <button className="profile__delete" onClick={()=>{axios.delete('/api/auth/userDelete/'+ user.user._id, {
                params: { 
                    id: user.user._id,

                }
            });window.localStorage.removeItem("auth"); signUser(null)
        }}>Видалити аккаунт</button>
    </section>:handleNavigation()
}

export default Profile