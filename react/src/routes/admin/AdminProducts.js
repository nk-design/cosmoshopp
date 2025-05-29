import UsersContext from "../../Context";
import { useContext, Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {ReactComponent as RightArrow} from "./../../resources/right_arrow.svg";
import AccountAdmin from "../../components/account/AccountAdmin";


const AdminProducts = () => {
    const {productsData, handleDelete, handleAdd, admin} = useContext(UsersContext);

    let {productId} = useParams();

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
        "like": false,
        "cart": false,
        "category": [],
        "description": [],
        "usage": [],
        "image": [],
        "color": {
          "black": "#000",
          "white": "#fff"
        },
        "more": [],
        "ingredient": [],
        "type": ""
      }

    return (<>
        <AccountAdmin />

        {
            admin?<section className="admin">
            <Link to="/admin" className="admin__back">НАЗАД</Link> 
            <button onClick={() => {handleAdd(objectStructure, "products");window.location.reload()}}>ДОДАТИ</button>
            {productsData.sort((a,b) => b.id - a.id).slice(offset, offset + PER_PAGE).map(el => {
                productId = el.id;
                return <div className="admin__product" key={el.id}>
                    <p>id: {el.id}</p>
                    <p>Більше: {el.more}</p>
                    <p>Тип: {el.type}</p>
                    <p>Назва: {el.title}</p>
                    <p>Бренд: {el.brand}</p>
                    <p>Зображення: {el.image.map((el2,id) => <Fragment key={id}><br/><a rel="noreferrer" target="_blank" href={el2}><img alt="PRODUCT" src={el2}/></a></Fragment>)}</p>
                    <p>Спосіб застосування: {el.usage}</p>
                    <p>Ціна: {el.price}</p>
                    <div className="admin__product__colors">Колір:
                            {Object.entries(el.color).map(([key, value], index) => {
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
                    <Link className="admin__product__edit" to={`/admin/products/${productId}`}>РЕДАГУВАТИ</Link>
                    <button onClick={()=> {handleDelete(el.id, "products", productsData);window.location.reload()}}>ВИДАЛИТИ</button>
                </div>
            })}

            {
                productsData.length>9?<ReactPaginate
                previousLabel={<RightArrow/>}
                nextLabel={<RightArrow/>}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                />:""
            }
            </section>:""
        }
    
    </>)
}

export default AdminProducts;