import { useState } from "react";
import axios from "axios";
import UsersContext from "../../Context";
import { useContext } from "react";

const AccountAdmin = () => {
    const [email, setEmailValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const [dbResponse, setDBResponse] = useState();
    const {setAdmin, admin} = useContext(UsersContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const result = await axios.post("https://cosmoshopp.com/api/adminLogin", {
                email,
                password
            })

            setAdmin(true)
            console.log(result)
            

            setEmailValue("");
            setPasswordValue("");

        } catch(err){
            console.log("ERROR OCCURED", err)
            setDBResponse(err.response.data)
        }
    }

    return (
        <>
  
        {!admin?(<form className="account__wrapper account__wrapper--admin" onSubmit={handleSubmit}>
            <h1>Вхід</h1>
            <p>*Email чи телефон:</p>
            <input required autoComplete="on" type="email" placeholder="Email чи телефон" value={email} onChange={(event) => setEmailValue(event.target.value)}/>
            <p>*Пароль:</p>
            <input required autoComplete="off" type="password" placeholder="Пароль" minLength={6} maxLength={64} value={password} onChange={(event) => setPasswordValue(event.target.value)}/>
            <div className="account__buttons">
                <button type="submit">Увійти</button>
            </div>
        </form>):""}

        {dbResponse?<div onClick={() => setDBResponse()} className="register__error">
                <p>{dbResponse} <br/> <span>Клікніть, щоб закрити повідомлення</span></p>
            </div>:""}
    
    </>)
}

export default AccountAdmin