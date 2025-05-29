"use client"
import { useState } from "react"

const ProductQuantity = () => {
    return <div className="product__description--quantity">
    <div onClick={()=> handleChange("minus")}>-</div>
    <input type="number" value={value} onChange={() => setValue(value)}/>
    <div onClick={()=> handleChange("plus")}>+</div>
</div>
}

export default ProductQuantity