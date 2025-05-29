"use client"
import Product from "@/components/product/Product";
import { useContext, useEffect } from "react";
import UsersContext from "@/context/Context";

const ProductPage = ({id}) => {
    const {setCurrentProduct, productsData} = useContext(UsersContext);
    useEffect(()=>{
        setCurrentProduct(productsData.find(el => el.id === Number(id)))
    },[id, productsData, setCurrentProduct])


    return <Product />
}

export default ProductPage;