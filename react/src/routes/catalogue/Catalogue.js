import "./Catalogue.scss";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ProductsList from "../../components/productsList/ProductsList";
import { useState, useCallback, useContext } from "react";
import {ReactComponent as RightArrow} from "./../../resources/right_arrow.svg";
import {ReactComponent as Cross} from "./../../resources/cross.svg";
import ReactPaginate from "react-paginate";
import UsersContext from "../../Context";

const SORT_OPTIONS = {
  POPULARITY: "За популярністю",
  PRICE_DESC: "Спочатку дорожче",
  PRICE_ASC: "Спочатку дешевше"
};

const SORT_CONFIGS = {
  [SORT_OPTIONS.POPULARITY]: {
    order: [SORT_OPTIONS.POPULARITY, SORT_OPTIONS.PRICE_DESC, SORT_OPTIONS.PRICE_ASC],
    sortFn: (a, b) => b.quantity - a.quantity
  },
  [SORT_OPTIONS.PRICE_DESC]: {
    order: [SORT_OPTIONS.PRICE_DESC, SORT_OPTIONS.POPULARITY, SORT_OPTIONS.PRICE_ASC],
    sortFn: (a, b) => (b.price * (1 - b.discount/100)) - (a.price * (1 - a.discount/100))
  },
  [SORT_OPTIONS.PRICE_ASC]: {
    order: [SORT_OPTIONS.PRICE_ASC, SORT_OPTIONS.POPULARITY, SORT_OPTIONS.PRICE_DESC],
    sortFn: (a, b) => (a.price * (1 - a.discount/100)) - (b.price * (1 - b.discount/100))
  }
};

const Catalogue = ({type, pathName}) => {
    const {productsData,filterProducts, filteredProducts, resetFilters, setFilteredProducts} = useContext(UsersContext)
    
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
                    {filteredProducts !== productsData? <Cross onClick={resetFilters}/> : ""}
                </div>
            )
        });
    };

    const changeFilter = useCallback((event) => {
      const selectedSort = event.target.innerHTML;
      const config = SORT_CONFIGS[selectedSort];
      
      if (config) {
        setSortingValue(config.order);
        setFilteredProducts([...filteredProducts].sort(config.sortFn));
      }
    }, [filteredProducts, setFilteredProducts]);

    const PER_PAGE = 9;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredProducts?filteredProducts.length / PER_PAGE: filteredProducts.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        window.scrollTo(0,0)
    }


    return <section className="catalogue">
        <Breadcrumbs links={[{path:"/catalogue", linkName: "Каталог"}, type?{path:"/catalogue/" + type, linkName: pathName}:""]}/>

        <div className="catalogue__filter">
            <h2>ФІЛЬТР</h2>

            <div onClick={()=>openCategory({...categoryFilter, filter: !categoryFilter.filter})} className={(categoryFilter.filter?"catalogue__products--closed ":"") + "catalogue__filter--sorting"}>
                <p>Сортувати:</p>
                
                <div className="catalogue__filter--list">
                    <h4 >{sortingValue[0]}</h4>
                    <h4 onClick={changeFilter}>{sortingValue[1]}</h4>
                    <h4 onClick={changeFilter}>{sortingValue[2]}</h4>
                </div>

                <RightArrow/>
            </div>
        </div>

        <div className="catalogue__products">
            <div className="catalogue__products--filter">
                <div className={(categoryFilter.brand?"catalogue__products--closed ":"") + "catalogue__products--brands"}>
                    <h3 onClick={()=>openCategory({...categoryFilter, brand: !categoryFilter.brand})} >Бренд <RightArrow/></h3>
                    {uniqueRender("brand")}
                </div>

                <div className={(categoryFilter.category?"catalogue__products--closed ":"") + "catalogue__products--categories"}>
                    <h3 onClick={()=>openCategory({...categoryFilter, category: !categoryFilter.category})}>Категорії <RightArrow/></h3>
                    {uniqueRender("category")}
                </div>

            </div>

            <ProductsList products={filteredProducts.filter(el => el.type===type).slice(offset, offset + PER_PAGE)}/>
        </div>
            {
                filteredProducts?filteredProducts.length>9?<ReactPaginate
                previousLabel={<RightArrow/>}
                nextLabel={<RightArrow/>}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />:"":filteredProducts.length>9?<ReactPaginate
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
    </section>
}

export default Catalogue;