import { Link } from "react-router-dom";
import "./Admin.scss";

import AccountAdmin from "../../components/account/AccountAdmin";

import UsersContext from "../../Context";
import { useContext } from "react";


const Admin = () => {
    const {admin} = useContext(UsersContext)

    return (
        <>
  
        <AccountAdmin />
    
        {admin?(<section className="admin">
        <div className="admin__links">
            <Link to="/admin/products">Продукти</Link>
            <Link to="/admin/slider">Слайдер</Link>
            <Link to="/admin/users">Юзери</Link>
        </div>
    </section>):""}
    </>)
}

export default Admin;