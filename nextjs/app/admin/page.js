"use client";
import Link from "next/link";
import "./Admin.scss";


import AccountAdmin from "../../components/account/AccountAdmin";

import UsersContext from "@/context/Context";
import { useContext } from "react";


const Admin = () => {
    const {admin} = useContext(UsersContext)

    return (
        <>
  
        <AccountAdmin />
    
        {admin?(<section className="admin">
        <div className="admin__links">
            <Link href="/admin/products">Продукти</Link>
            <Link href="/admin/slider">Слайдер</Link>
            <Link href="/admin/users">Юзери</Link>
        </div>
    </section>):""}
    </>)
}

export default Admin;