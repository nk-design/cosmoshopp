import { createContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const UsersContext = createContext();

const Provider = ({children}) =>{
    const [productsData, setProductsData] = useState([]);
    const [cartIsOpen, openCart] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        "id": "",
        "title": "",
        "brand": "",
        "price": 0,
        "like": false,
        "cart": false,
        "category": "",
        "discount": 0,
        "quantity": 0,
        "description": "",
        "usage": "",
        "image": [],
        "color": {},
        "more": [],
        "ingredient": "",
        "type": ""
    });
    const [cart, setCart] = useState(window.localStorage.getItem("cart")?JSON.parse(window.localStorage.getItem("cart")) :[]);
    const [like, setLike] = useState(window.localStorage.getItem("like")?JSON.parse(window.localStorage.getItem("like")) :[]);
    const [user, signUser] = useState(window.localStorage.getItem("auth")?JSON.parse(window.localStorage.getItem("auth")) :null);
    const [admin, setAdmin] = useState(null);

    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const filterProducts = (event) => {
        setFilteredProducts(productsData.filter((el) => {
            return el.brand === event.target.innerHTML || el.category === event.target.innerHTML 
        }))
    }

    const resetFilters = () => {
        setFilteredProducts(productsData);
    }
   // const [productColor, changeColor] = useState("Оберіть колір")


    const [sliderData, setSliderData] = useState([]);

    const urlId = Number(useLocation().pathname.split("").reduce((acc, val) => {
        if(!isNaN(Number(val))){
            acc = acc + val
        }

        return acc
    }, ""));

    useEffect(()=>{
        if(window.location.pathname.indexOf("slider") === -1){
            if(window.location.pathname.indexOf("users") === -1){
                if((currentProduct !== undefined && currentProduct.id === "") && productsData.length>0){
                    console.log("asd")
                    setCurrentProduct(productsData.find((el) => el.id === urlId));
                }
            }
        }


        // if(currentProduct.color){
        //     if(Object.entries(currentProduct.color).length){
        //         changeColor(Object.entries(currentProduct.color)[0][0].toUpperCase())
        //     }
        // }
    },[productsData, urlId, currentProduct])

    useEffect(()=>{
        window.localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
        window.localStorage.setItem("like", JSON.stringify(like))
    },[like])

    const fetchSlider = useCallback(async () => {
        const result = await fetch("https://cosmoshopp.com/slider",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
        }).then(response=>response.json()).then(data=>data);
        
        setSliderData(result)
    }, []);

    const fetchProducts = useCallback(async () => {
        const result = await fetch("https://cosmoshopp.com/products",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        }).then(response=>response.json()).then(data=>data);
        
        setProductsData(result.sort((a,b) => b.quantity - a.quantity)); 
        setFilteredProducts(result.sort((a,b) => b.quantity - a.quantity))    
    }, []);


    const handleDelete = async (id, db, jsonData) => {
        await fetch(`https://cosmoshopp.com/${db}/${id}`,{
            method: "DELETE"
        })
        const newProductsData = jsonData.filter((elem)=>{
            return elem.id !== id;
        })
    
        setProductsData(newProductsData);
    };
    
    const handleEdit = async (id, newEl, db, jsonData) => {
        console.log(newEl)
        const result = await fetch(`https://cosmoshopp.com/${db}/${id}`,{
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newEl)
        }).then(response=>response.json()).then(data=>data);

        console.log(result)

    
        const updatedData = jsonData.filter((el)=>{
            if(el.id===id){
                return el = newEl;
            }
    
            return el
        })
    
        setProductsData(updatedData)
    };
    
    const handleAdd = async (objectStructure, db) =>{
        const result = await fetch(`https://cosmoshopp.com/${db}`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(objectStructure)
        }).then(response=>response.json()).then(data=>data);

        console.log(result)
    };

      const valueToShare = {
        productsData,
        currentProduct,
        setCurrentProduct,
        cart,
        setCart,
        handleDelete,
        handleEdit,
        handleAdd,
        fetchProducts,
        fetchSlider,
        sliderData,
        user,
        signUser,
        like,
        setLike,
        admin,
        setAdmin,
        cartIsOpen,
        openCart,
        filterProducts,
        filteredProducts,
        resetFilters,
        setFilteredProducts
      }


    return <UsersContext.Provider value={valueToShare}>
        {children}
    </UsersContext.Provider>
}

export {Provider};
export default UsersContext;