import UsersContext from "../../Context";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountAdmin from "../../components/account/AccountAdmin";

const AdminEditSlider = () => {
    const {sliderData, handleEdit, fetchSlider, admin } = useContext(UsersContext);
    
    let location = useLocation();
    let slideId = location.pathname.split("/")[location.pathname.split("/").length-1];
    let slide = sliderData.filter(el => el.id === Number(slideId))[0] ||     {
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

        handleEdit(slideId, newSlider, "slider", sliderData)

        window.location.reload();
    }

    if(slide.id === ""){
        fetchSlider()
    }

    return (
        <>
            <AccountAdmin />
        
            {admin? <>
                <form onSubmit={handleSubmit} className="admin">
                    <Link className="admin__back" to="/admin/slider">НАЗАД</Link>
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