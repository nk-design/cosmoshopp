import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import "./Account.scss";
import UsersContext from "@/context//Context";
import { useContext } from "react";

const Account = ({openAccount, accountIsOpen}) => {

    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [dbResponse, setDBResponse] = useState();

    const {signUser} = useContext(UsersContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const result = await axios.post("/api/auth/login", {
                email,
                password
            })

            window.localStorage.setItem("auth", JSON.stringify(result.data))
            signUser(result.data);

            setEmailValue("");
            setPasswordValue("");
            openAccount(!accountIsOpen)
        } catch(err){
            console.log("ERROR OCCURED", err)
            setDBResponse(err.response.data)
        }
    }


    return (<section className="account" onClick={(event)=>{
        if(event.target === event.currentTarget) {openAccount(!accountIsOpen)}}
        }>
        <form className="account__wrapper" onSubmit={handleSubmit}>
            <h1>Вхід</h1>
            <p>*Email чи телефон:</p>
            <input required autoComplete="on" type="email" placeholder="Email чи телефон" value={email} onChange={(event) => setEmailValue(event.target.value)}/>
            <p>*Пароль:</p>
            <input required autoComplete="off" type="password" placeholder="Пароль" minLength={6} maxLength={64} value={password} onChange={(event) => setPasswordValue(event.target.value)}/>
            <div className="account__buttons">
                <Link href="/forgot" onClick={()=>openAccount(!accountIsOpen)}>Забули пароль?</Link>

                <Link href="/register" onClick={()=>openAccount(!accountIsOpen)}>Реєстрація </Link>

                <button type="submit">Увійти</button>
            </div>
            <h2 className="account__close" onClick={()=>openAccount(!accountIsOpen)}>X</h2>
        </form>
        {dbResponse?<div onClick={() => setDBResponse()} className="register__error">
                <p>{dbResponse} <br/> <span>Клікніть, щоб закрити повідомлення</span></p>
            </div>:""}
    </section>)
}

export default Account;