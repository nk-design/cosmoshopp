"use client";
import UsersContext from "@/context/Context";
import { useContext, Fragment, useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import AccountAdmin from "../../../components/account/AccountAdmin";
import Image from "next/image";
import "./../Admin.scss";


const AdminProducts = () => {
    const {productsData, handleDelete, handleAdd, admin} = useContext(UsersContext);

    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(productsData.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0,0);
    }

    const objectStructure = {
        "title": "",
        "brand": "",
        "like": 0,
        "cart": 0,
        "category": "",
        "description": "",
        "usage": "",
        "image": "",
        "color": JSON.stringify({
          "black": "#000",
          "white": "#fff"
        }),
        "more": "",
        "ingredient": "",
        "type": ""
      }

    return (<>
        <AccountAdmin />
    
        {admin?
        <section className="admin">
            <Link href="/admin" className="admin__back">НАЗАД</Link> 
            <button onClick={() => {handleAdd(objectStructure, productsData.length+1);window.location.reload()}}>ДОДАТИ</button>
            {productsData.sort((a,b) => b.id - a.id).slice(offset, offset + PER_PAGE).map(el => {
                return <div className="admin__product" key={el.id}>
                    <p>id: {el.id}</p>
                    <p>Більше: {el.more}</p>
                    <p>Тип: {el.type}</p>
                    <p>Назва: {el.title}</p>
                    <p>Бренд: {el.brand}</p>
                    <p>Зображення: {el.image?el.image.split("/br").map((el2,id) => <Fragment key={id}><br/><a rel="noreferrer" target="_blank" href={el2}><Image width={200} height={300} alt="PRODUCT" src={el2}/></a></Fragment>):""}</p>
                    <p>Спосіб застосування: {el.usage}</p>
                    <p>Ціна: {el.price}</p>
                    <div className="admin__product__colors">Колір:
                            {Object.entries(JSON.parse(el.color)).map(([key, value], index) => {
                                return (<p key={index}>
                                    <span>{key} -</span> <span>{value} - </span> <span style={{
                                        backgroundColor: value, 
                                        width: "20px", 
                                        height: "20px", 
                                        border: "1px solid #000", 
                                        display: "inline-block"
                                    }}></span>
                                </p>)
                            })}
                    </div>
                    <p>Кількість: {el.quantity}</p>
                    <p>Категорія: {el.category}</p>
                    <p>Знижка: {el.discount}</p>
                    <p>Склад: {el.ingredient}</p>
                    <p>Опис: {el.description}</p>
                    <Link className="admin__product__edit" href={`/admin/products/${el.id}`}>РЕДАГУВАТИ</Link>
                    <button onClick={()=> {handleDelete(el.id);window.location.reload()}}>ВИДАЛИТИ</button>
                </div>
            })}

            {
                productsData.length>9?<ReactPaginate
                previousLabel={<svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg>}
                nextLabel={<svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg>}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                />:""
            }
            </section>:""}
    </>)
}

export default AdminProducts;