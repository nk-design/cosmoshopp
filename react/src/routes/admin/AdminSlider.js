import { useContext, useEffect} from "react";
import UsersContext from "../../Context";
import { Link, useParams } from "react-router-dom";
import AccountAdmin from "../../components/account/AccountAdmin";

const AdminSlider = () => {
    const {sliderData, fetchSlider, handleAdd, handleDelete, admin} = useContext(UsersContext);

    useEffect(()=>{
        fetchSlider()
    },[fetchSlider])

    let {sliderId} = useParams();

    const objectStructure = {
        "title": "",
        "description": "",
        "button": "",
        "buttonLink": ""
    }

    return (
        <>
            <AccountAdmin />
        
            {admin?<section className="admin">
                <Link to="/admin" className="admin__back">НАЗАД</Link>
                <button onClick={() => {handleAdd(objectStructure,"slider");window.location.reload()}}>ДОДАТИ</button>
                {sliderData.sort((a,b) => b.id - a.id).map(el => {
                    sliderId = el.id;
                    return <div className="admin__product" key={el.id}>
                        <p>id: {el.id}</p>
                        <p>Назва слайда: {el.title}</p>
                        <p>Опис слайда: {el.description}</p>
                        <p>Текст кнопки: {el.button}</p>
                        <p>Посилання кнопки: {el.buttonLink}</p>
                        <p>Зображення: <a href={el.image} rel="noreferrer" target="_blank"><img alt="PRODUCT" src={el.image}/></a></p>
                        <Link className="admin__product__edit" to={`/admin/slider/${sliderId}`}>РЕДАГУВАТИ</Link>
                        <button onClick={()=> {handleDelete(el.id, "slider", sliderData);window.location.reload()}}>ВИДАЛИТИ</button>
                    </div>
                })}
            </section>:""}
        </>
    )
}

export default AdminSlider