"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import UsersContext from "@/context/Context";
import { useContext } from "react";
import AccountAdmin from "../../../../components/account/AccountAdmin";
import Image from "next/image";
import "./../../Admin.scss";

const AdminEditUser = ({params}) => {
    const [users, listUsers] = useState([]);
    const [block, openBlock] = useState({
        promo: false,
        order: false
    })

    const {admin} = useContext(UsersContext)

    const [newPromo, setNewPromo] = useState({
        name: "",
        discount: "",
        quantity: "",
        email: ""
    });

    useEffect(()=>{
        const handleUsers = async () => {
            const usersList = await axios.get('/api/auth/listUsers/')
            listUsers(usersList.data.filter((element)=>{
                return params.id === element._id
            }))
        }

        handleUsers();
    }, [params.id])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const generalPromocodes = await axios.get('/api/auth/getGeneralPromo/').then((result) => {
            return result.data.user
        });

        const promocodes = [...generalPromocodes, newPromo];

        try{
            const result = await axios.put("/api/auth/createPromo", {
                promocodes
            })

        } catch(err){
            console.log("ERROR OCCURED", err)
        }

        window.location.reload();
    }

    return (<>
        <AccountAdmin /> 

        {admin?<section className="admin">
        <Link href={"/admin/users"}>Назад</Link>

        {
            users.length>0?users.map(element => {
                return <div key={element._id}>
                    <div>
                        <h3>ID - {element._id}</h3>
                    </div>
                    <div>
                        <h3>Email - {element.email}</h3>
                    </div>
                    <div>
                        <h3>Телефон - {element.phone?element.phone:"НЕМАЄ"}</h3>
                    </div>
                    <div>
                        <h3>Пароль - {element.password}</h3>
                    </div>
                    <div>
                        <h3>Ім`я - {element.name}</h3>
                    </div>
                    <div>
                        <h3>Прізвище - {element.surName}</h3>
                    </div>
                    <div>
                        <h3>Місто - {element.city}</h3>
                    </div>
                    <div>
                        <h3>Відділення - {element.viddil}</h3>
                    </div>
                    <div>
                        <h3>Область - {element.oblast}</h3>
                    </div>
                    <div>
                        <h3>Перша покупка - {element.firstBuy?"НІ":"ТАК"}</h3>
                    </div>
                    <div>
                        <h3>Останнє оновлення - {element.updatedAt}</h3>
                    </div>
                    <div>
                        <h3>Оновлень - {element.__v}</h3>
                    </div>
                    <div>
                        <h3>Аккаунт створено - {element.createdAt}</h3>
                    </div>
                    <div onClick={()=>{openBlock({
                        ...block,
                        order: !block.order
                    })}}>
                        {block.order?element.orders.length>0?element.orders.map((element2, index)=>{
                            return (
                                <div key={index + 1}>
                                    <h2>Замовлення {index + 1}</h2>
                                    {
                                        element2.map(element3 => {
                                            return <div key={Math.random()} className="profile__orders__item">
                                                <div>
                                                    <Image width={500} height={700} src={element3.image} alt="PRODUCTIMAGE"/>
                                                </div>
                                                <div>
                                                    <p>Номер товара: {element3.id}</p>
                                                    <p>Назва: {element3.title}</p>
                                                    <p>Колір: {element3.color}</p>
                                                    <p>Знижка: {element3.discount}</p>
                                                    <p>Кількість: {element3.quantity}</p>
                                                    <p>Ціна: {element3.price} UAH</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <hr/>
                                </div>
                            )
                        }):<h3>Замовлень - НЕМАЄ</h3>:<button>ЗАМОВЛЕННЯ</button>}
                    </div>
                    <div>
                        {block.promo?element.promocodes.length>0?element.promocodes.map((element2,index)=>{
                                return <div key={index}>
                                    <h3>Назва промокоду - {element2.name}, Знижка промокоду - {element2.discount}, Кількість промокоду - {element2.quantity}</h3>
                                    <form className="checkout__contact__form checkout__contact__form--users" onSubmit={handleSubmit}>
                                        <input type="text" placeholder="Ім'я промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            name: event.target.value
                                        })} value={newPromo.name} name="name"/>
                                        <input type="number" placeholder="Знижка промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            discount: Number(event.target.value)
                                        })} value={newPromo.discount} name="discount"/>
                                        <input type="number" placeholder="Кількість промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            quantity: Number(event.target.value)
                                        })} value={newPromo.quantity} name="quantity"/>
                                        <button type="submit">ДОДАТИ ПРОМОКОД</button>
                                    </form>
                                </div>
                        }):(<div>
                            <p>Промокодів - НЕМАЄ</p>
                            <form className="checkout__contact__form checkout__contact__form--users" onSubmit={handleSubmit}>
                                        <input type="text" placeholder="Ім'я промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            name: event.target.value
                                        })} value={newPromo.name} name="name"/>
                                        <input type="number" placeholder="Знижка промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            discount: Number(event.target.value)
                                        })} value={newPromo.discount} name="discount"/>
                                        <input type="number" placeholder="Кількість промокоду" onChange={(event)=>setNewPromo({
                                            ...newPromo,
                                            quantity: Number(event.target.value)
                                        })} value={newPromo.quantity} name="quantity"/>
                                        <button type="submit">ДОДАТИ ПРОМОКОД</button>
                            </form>
                        </div>):<button onClick={()=>{openBlock({
                        ...block,
                        promo: !block.promo
                    }); setNewPromo({
                        ...newPromo,
                        email: users[0].email 
                    })}}>ПРОМОКОДИ</button>}
                    </div>

                    <hr/>
                </div>
            }):<h3>ПОКИ ЩО НЕМАЄ ЮЗЕРІВ, АБО СТАЛАСЯ ПОМИЛКА</h3>
        }
    </section>:""}
    </>)
}

export default AdminEditUser