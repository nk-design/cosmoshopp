"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const UsersContext = createContext();

const Provider = ({children}) =>{
    const router = useRouter();
    const [productsData, setProductsData] = useState([]);
    const [cartIsOpen, openCart] = useState(false);
    
    const [cart, setCart] = useState([]);
    const [like, setLike] = useState([]);
    const [user, signUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [location, setLocation] = useState("")
    useEffect(()=>{
        setLocation(window.location.pathname)
    },[location]);

    
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const filterProducts = (event) => {
        setFilteredProducts(productsData.filter((el) => {
            return el.brand === event.target.innerHTML || el.category === event.target.innerHTML 
        }))
    }

    const resetFilters = () => {
        setFilteredProducts(productsData);
    }

    // window.localStorage.getItem("auth")?JSON.parse(window.localStorage.getItem("auth")) :
    
    // const [productColor, changeColor] = useState("Оберіть колір")

    // const urlId = Number(router.pathname.split("").reduce((acc, val) => {
    //     if(!isNaN(Number(val))){
    //         acc = acc + val
    //     }

    //     return acc
    // }, ""));

    const persistenceManager = (stateFunction, stateName, initialValue) => {
        stateFunction(window.localStorage.getItem(stateName)?JSON.parse(window.localStorage.getItem(stateName)) :initialValue)
    }


    useEffect(()=>{
        if(cart.length>0){
            window.localStorage.setItem("cart", JSON.stringify(cart))
        }
    },[cart])

    useEffect(()=>{
        if(like.length>0){
            window.localStorage.setItem("like", JSON.stringify(like))
        }
    },[like])

    useEffect(()=>{
        persistenceManager(setCart, "cart", []);
        persistenceManager(setLike, "like", []);
        persistenceManager(signUser, "auth", null);
    },[])

    useEffect(()=>{
        // Optionally refetch the products when component mounts
        const fetchData = async () => {
            const response = await fetch('/api/db/getProducts', {
                method: "GET",
                headers: {
                    'Cache-Control': 'no-store', // Prevent caching of the response
                }
            });
            const data = await response.json();
            setProductsData(data.products);
            console.log(data.products);
            setFilteredProducts(data.products);
        };

        fetchData();
    },[])


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/db/${id}/deleteProduct`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    
    const handleEdit = async (id, newEl) => {
        try {
          const response = await fetch(`/api/db/${id}/changeProduct`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, newEl }),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const updatedData = await response.json();
      
          setProductsData(updatedData);
        } catch (error) {
          console.error('Error updating db:', error);
        }
    };

    
    const handleAdd = async (objectStructure, id) => {
        try {
            const response = await fetch(`/api/db/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectStructure),
            });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

      const valueToShare = {
        productsData,
        filteredProducts,
        filterProducts,
        resetFilters,
        setFilteredProducts,
        cart,
        setCart,
        handleDelete,
        handleEdit,
        handleAdd,
        user,
        signUser,
        like,
        setLike,
        admin,
        setAdmin,
        cartIsOpen,
        openCart,
        location,
        setLocation,
      }


    return <UsersContext.Provider value={valueToShare}>
        {children}
    </UsersContext.Provider>
}

export {Provider};
export default UsersContext;