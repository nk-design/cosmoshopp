"use client";
import { useContext} from "react";
import UsersContext from "@/context/Context";
import Link from "next/link";
import AccountAdmin from "../../../components/account/AccountAdmin";
import Image from "next/image";
import SLIDER from "@/db_slider.json";
import "./../Admin.scss";

const AdminSlider = () => {
    const {handleAdd, handleDelete, admin} = useContext(UsersContext);

    const objectStructure = {
        "title": "",
        "description": "",
        "button": "",
        "buttonLink": ""
    }

    const sliderData = SLIDER.slider;

    return (
        <>
        <AccountAdmin /> 

            {admin?<section className="admin">
                <Link href="/admin" className="admin__back">НАЗАД</Link>
                <button onClick={() => {handleAdd(objectStructure,"slider");window.location.reload()}}>ДОДАТИ</button>
                {sliderData.sort((a,b) => b.id - a.id).map(el => {
                    return <div className="admin__product" key={el.id}>
                        <p>id: {el.id}</p>
                        <p>Назва слайда: {el.title}</p>
                        <p>Опис слайда: {el.description}</p>
                        <p>Текст кнопки: {el.button}</p>
                        <p>Посилання кнопки: {el.buttonLink}</p>
                        <p>Зображення: <a href={el.image} rel="noreferrer" target="_blank"><Image width={500} height={700} alt="PRODUCT" src={el.image}/></a></p>
                        <Link className="admin__product__edit" href={`/admin/slider/${el.id}`}>РЕДАГУВАТИ</Link>
                        <button onClick={()=> {handleDelete(el.id, "slider", sliderData);window.location.reload()}}>ВИДАЛИТИ</button>
                    </div>
                })}
            </section>:""}
        </>
    )
}

export default AdminSlider