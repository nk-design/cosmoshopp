"use client";
import UsersContext from "@/context/Context";
import { useContext } from "react";
import Link from "next/link";
import AccountAdmin from "../../../../components/account/AccountAdmin";
import "./../../Admin.scss";
import SLIDER from "@/db_slider.json";

const AdminEditSlider = ({params}) => {
    const {handleEdit, admin } = useContext(UsersContext);

    const sliderData = SLIDER.slider;
    
    let slideId = Number(params.id);
    let slide = sliderData.filter(el => el.id === slideId)[0] ||     {
        "id": "",
        "title": "",
        "description": "",
        "button": "",
        "buttonLink": ""
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let newSlider = {
            "id": slideId,
            "title": event.target.title.value,
            "description": event.target.description.value,
            "button": event.target.button.value,
            "buttonLink": event.target.buttonLink.value,
            "image": event.target.image.value
          }

        handleEdit(slideId, "slider", newSlider);
        window.location.reload();
    }

    return (
        <>
        
        <AccountAdmin /> 

        {admin?<>
                <form onSubmit={handleSubmit} className="admin">
                    <Link className="admin__back" href="/admin/slider">НАЗАД</Link>
                    <p>id: {slideId}</p>
                    <p>Назва слайда: {<input name="title" defaultValue={slide.title}/>}</p>
                    <p>Опис слайда: {<input name="description" defaultValue={slide.description}/>}</p>
                    <p>Кнопка: {<input name="button" defaultValue={slide.button}/>}</p>
                    <p>Посилання кнопки: {<input name="buttonLink" defaultValue={slide.buttonLink}/>}</p>
                    <p>Зображення: {<input name="image" defaultValue={slide.image}/>}</p>
                    <button type="submit">ЗБЕРЕГТИ</button>
                </form>
            </>:""}
        </>
    
    )
}

export default AdminEditSlider