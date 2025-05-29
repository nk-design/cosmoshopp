"use client";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useState } from "react";
import axios from "axios";
import "./Forgot.scss";

const Forgot = () => {
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [dbResponse, setDBResponse] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
    
            await axios.put('/api/auth/changePassword/', {
                email,
                password
            })

            setDBResponse("Пароль змінено");
            setEmailValue("");
            setPasswordValue("");
        } catch(err){
            console.log("Error occured", err)
            setDBResponse(err.response.data)
        }
    }

    return (<section className="forgot">
        <Breadcrumbs links={[]} />

        <form className="account__wrapper register__wrapper" onSubmit={handleSubmit}>
            <h1>Змінити пароль</h1>
            <p>*Email:</p>
            <input required autoComplete="on" type="email" placeholder="Email" value={email} onChange={(event) => setEmailValue(event.target.value)}/>
            <p>*Пароль:</p>
            <input required autoComplete="off" minLength={6} maxLength={64} type="password" placeholder="Пароль" value={password} onChange={(event) => setPasswordValue(event.target.value)}/>
            <div className="account__buttons">
                <button type="submit">Зміна паролю</button>
            </div>
        </form>

        {dbResponse?<div onClick={() => setDBResponse()} className="register__error">
                <p>{dbResponse} <br/> <span>Клікніть, щоб закрити повідомлення</span></p>
            </div>:""}
    </section>)
}

export default Forgot