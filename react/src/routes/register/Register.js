import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import axios from "axios";


const Register = () =>{

    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [dbResponse, setDBResponse] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const result = await axios.post("https://cosmoshopp.com/api/register", {
                email,
                password,
                firstBuy: 1,
                cashback: 0,
            })

            console.log(result)
            setDBResponse("Аккаунт створено");
            setEmailValue("");
            setPasswordValue("");
        } catch(err){
            console.log("Error occured", err)
            setDBResponse(err.response.data)
        }
    }

    return (
        <section className="register">
            <Breadcrumbs links={[]} />

            <form className="account__wrapper register__wrapper" onSubmit={handleSubmit}>
                <h1>Реєстрація</h1>
                <p>*Email:</p>
                <input required autoComplete="on" type="email" placeholder="Email" value={email} onChange={(event) => setEmailValue(event.target.value)}/>
                <p>*Пароль:</p>
                <input required autoComplete="off" minLength={6} maxLength={64} type="password" placeholder="Пароль" value={password} onChange={(event) => setPasswordValue(event.target.value)}/>
                <div className="account__buttons">
                    <Link to="/forgot" >Забули пароль?</Link>

                    <button type="submit">Зареєструватись</button>
                </div>
            </form>

            {dbResponse?<div onClick={() => setDBResponse()} className="register__error">
                <p>{dbResponse} <br/> <span>Клікніть, щоб закрити повідомлення</span></p>
            </div>:""}
        </section>
    )
}

export default Register;