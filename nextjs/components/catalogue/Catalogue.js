"use client";
import "./Catalogue.scss";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import ProductsList from "@/components/productsList/ProductsList";
import { useState, useCallback, useContext, useEffect } from "react";
import Cross from "@/public/cross.svg";
import ReactPaginate from "react-paginate";
import UsersContext from "@/context/Context";
import Image from "next/image";

const Catalogue = ({type, pathName}) => {
    const {filteredProducts, filterProducts, resetFilters, productsData, setFilteredProducts} = useContext(UsersContext)
    
    const [sortingValue, setSortingValue] = useState(["За популярністю", "Спочатку дорожче", "Спочатку дешевше"]);
    const [categoryFilter, openCategory] = useState({brand: 1, category: 1, filter: 1});
    const [currentPage, setCurrentPage] = useState(0);

    const uniqueRender = (arg) => {
        return [...new Set(filteredProducts.filter(el => type?el.type === type:el).map((el) => {
            return el[arg]
        }))].map((el2,index) => {
            return (
                <div className="catalogue__products--filter-link" key={index}>
                    <p onClick={filterProducts} field={arg}>{el2}</p>
                    {filteredProducts !== productsData? <Image src={Cross} width={12} height={12} alt="CROSS" onClick={resetFilters}/> : ""}
                </div>
            )
        });
    };

    const changeFilter = useCallback((event)=>{
        switch(event.target.innerHTML){
            case "За популярністю":
                setSortingValue(["За популярністю", "Спочатку дорожче", "Спочатку дешевше"]);
                setFilteredProducts(filteredProducts.sort((a,b) => b.quantity - a.quantity))
                break;
            case "Спочатку дорожче":
                setSortingValue(["Спочатку дорожче", "За популярністю", "Спочатку дешевше"])
                setFilteredProducts(filteredProducts.sort((a,b) => (b.price*(1-b.discount/100)) - (a.price*(1-a.discount/100))))
                break;
            case "Спочатку дешевше":
                setSortingValue(["Спочатку дешевше", "За популярністю", "Спочатку дорожче"])
                setFilteredProducts(filteredProducts.sort((a,b) => (a.price*(1-a.discount/100)) - (b.price*(1-b.discount/100))))
                break;
            default:
                break;
        }
    },[filteredProducts, setFilteredProducts])

    const PER_PAGE = 9;
    const offset = currentPage * PER_PAGE;
    const generalOffset = (currentPage + 1) * PER_PAGE
    const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0,0)
    }


    return <section className="catalogue">
        <Breadcrumbs links={[{path:"/catalogue", linkName: "Каталог"}, type?{path:"/catalogue/" + type, linkName: pathName}:""]}/>
        {/* <Breadcrumbs links={[{path:"/catalogue", linkName: "Каталог"}]}/> */}
            <div style={{display: "none"}}>
                <ProductsList products={filteredProducts.slice(generalOffset)}/>
            </div>

        <div className="catalogue__filter">
            <h2>ФІЛЬТР</h2>

            <div onClick={()=>openCategory({...categoryFilter, filter: !categoryFilter.filter})} className={(categoryFilter.filter?"catalogue__products--closed ":"") + "catalogue__filter--sorting"}>
                <p>Сортувати:</p>
                
                <div className="catalogue__filter--list">
                    <h4 >{sortingValue[0]}</h4>
                    <h4 onClick={changeFilter}>{sortingValue[1]}</h4>
                    <h4 onClick={changeFilter}>{sortingValue[2]}</h4>
                </div>

                <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                </svg>
            </div>
        </div>

        <div className="catalogue__products">
            <div className="catalogue__products--filter">
                <div className={(categoryFilter.brand?"catalogue__products--closed ":"") + "catalogue__products--brands"}>
                    <h3 onClick={()=>openCategory({...categoryFilter, brand: !categoryFilter.brand})} >Бренд <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h3>
                    {uniqueRender("brand")}
                </div>

                <div className={(categoryFilter.category?"catalogue__products--closed ":"") + "catalogue__products--categories"}>
                    <h3 onClick={()=>openCategory({...categoryFilter, category: !categoryFilter.category})}>Категорії <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg></h3>
                    {uniqueRender("category")}
                </div>

            </div>

            <ProductsList products={filteredProducts.filter(el => type?el.type === type:el).slice(offset, offset + PER_PAGE)}/>
        </div>
            {
                filteredProducts.length>9?<ReactPaginate
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
            />:""}
    </section>
}

export default Catalogue;