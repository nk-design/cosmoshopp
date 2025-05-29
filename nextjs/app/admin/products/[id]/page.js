"use client";
import UsersContext from "@/context/Context";
import { Fragment, useContext, useState, useEffect } from "react";
import Link from "next/link";
import AccountAdmin from "../../../../components/account/AccountAdmin";
import "./../../Admin.scss";


const AdminEditProduct = ({params}) => {
    const {productsData, handleEdit, admin} = useContext(UsersContext);
    const [newProduct, setNewProduct] = useState({
        "id": "",
        "title": "",
        "brand": "",
        "price": 0,
        "like": false,
        "cart": false,
        "category": [],
        "discount": 0,
        "quantity": 0,
        "description": [],
        "usage": [],
        "image": [],
        "color": {},
        "more": [],
        "ingredient": [],
        "type": []
    })

    // let location = useLocation();
    useEffect(()=>{
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/db/${params.id}/findProduct/`);
                const data = await response.json();
                const product = data.product;

                // Safe parse function to handle potentially bad JSON
                const safeParse = (value) => {
                    console.log(value)
                    console.log(value.split("/br"));
                    const renderedValue = value.trim().startsWith('{') || value.trim().startsWith('[')?value:value.split("/br");
                    try {
                        // Check if the value is a string and is not already in array or object form
                        if (renderedValue && typeof renderedValue === 'string') {
                            // If it's a valid JSON object or array, parse and return it
                            if (renderedValue.trim().startsWith('{') || renderedValue.trim().startsWith('[')) {
                                return JSON.parse(renderedValue);  // Parse valid JSON (object or array)
                            }
                            // Otherwise, return the string wrapped in an array
                            return [renderedValue];
                        }
                        // In case value is already an array or something else, just return it as is
                        return Array.isArray(renderedValue) ? renderedValue : (typeof renderedValue === 'object' ? renderedValue : []);;
                    } catch (error) {
                        console.error("Error parsing JSON", error);
                        return [];  // Default to an empty array in case of error
                    }
                };
                

                setNewProduct({
                    "id": product.id,
                    "title": product.title,
                    "brand": product.brand,
                    "type": product.type,
                    "price": product.price,
                    "like": product.like,
                    "cart": product.cart,
                    "category": safeParse(product.category),
                    "discount": product.discount,
                    "quantity": product.quantity,
                    "description": safeParse(product.description),
                    "usage": safeParse(product.usage),
                    "image": safeParse(product.image),
                    "color": safeParse(product.color),
                    "more": safeParse(product.more),
                    "ingredient": safeParse(product.ingredient)
                });
            } catch (error) {
                console.error("Failed to fetch product data", error);
            }
        }

        getProduct();
    },[params.id]);

    console.log(newProduct)


      const gatherData = (inputName) => {
        return Array.from(document.querySelectorAll(`input[name=${inputName}]`)).map(el => el.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        const colorKeys = gatherData("colorKey");
        const colorValues = gatherData("colorValue");
        const colorObject = {}
        colorKeys.forEach((element, index) => {
          colorObject[element] = colorValues[index];
        });

        setNewProduct({
            "id": newProduct.id,
            "title": event.target.title.value,
            "brand": event.target.brand.value,
            "price": Number(event.target.price.value),
            "like": newProduct.like,
            "cart": newProduct.cart,
            "category": event.target.category.value,
            "discount": Number(event.target.discount.value),
            "quantity": Number(event.target.quantity.value),
            "description": gatherData("description"),
            "usage": gatherData("usage"),
            "image": gatherData("image"),
            "color": colorObject,
            "more": gatherData("more"),
            "ingredient": gatherData("ingredient"),
            "type": event.target.type.value
        })

        handleEdit(newProduct.id, newProduct);
        // window.location.reload()
    }

    const handleCreate = (section) => { 
        console.log(newProduct[section]);       
        if (section === "color") {
            // For color (object), add or modify the property
            setNewProduct({
                ...newProduct, 
                new: "#000000"  // Updating the color property
            });
        } else if(newProduct[section].length>0){
            // For other sections, update as needed
            setNewProduct({
                ...newProduct,
                [section]: [...newProduct[section], ""]   // Here you would handle other fields
            });
        } else {
            setNewProduct({
                ...newProduct,
                [section]: Array.from(newProduct[section])   // Here you would handle other fields
            });
        }

        // handleEdit(newProduct.id, newProduct);
        // window.location.reload()
    }

const handleDelete = (section, index) => {
    if (section === "color") {
        // For color (which is an object), handle the removal of a specific key
        const newColor = { ...newProduct.color };  // Copy the color object
        const keys = Object.keys(newColor);
        
        // Delete the color property by key (index is used to get the key)
        delete newColor[keys[index]];

        // Update state with the new color object
        setNewProduct({
            ...newProduct,
            color: newColor
        });
    } else {
        // For other sections, handle the array deletion by index
        const newSection = [...newProduct[section]];  // Copy the array
        newSection.splice(index, 1);  // Remove the item at the specified index

        // Update state with the new array for that section
        setNewProduct({
            ...newProduct,
            [section]: newSection
        });
    }
};


    
    return (<>

        <AccountAdmin />
    
        {admin?
        <section className="admin">
            <form onSubmit={handleSubmit} className="admin__product">
            <Link className="admin__back" href="/admin/products">НАЗАД</Link>
                <p>id: {newProduct.id}</p>
                <p>More: {
                        newProduct.more.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="more" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("more", index);}}/>
                            </Fragment>
                        })
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("more")}/>
                </p>
                <p>Тип: {<input name="type" defaultValue={newProduct.type}/>}</p>
                <p>Назва: {<input name="title" defaultValue={newProduct.title}/>}</p>
                <p>Бренд: {<input name="brand" defaultValue={newProduct.brand}/>}</p>
                <p>Зображення: {newProduct.image.map((el2,index) => <Fragment key={index}>
                    <input name="image" defaultValue={el2}/>
                    <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("image", index)}}/>
                </Fragment>)}
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("image")}/>
                </p>
                <p>Спосіб застосування: {
                        newProduct.usage.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="usage" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("usage", index)}}/>
                            </Fragment>
                        })
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("usage")}/>
                </p>
                <p>Ціна: {<input name="price" defaultValue={newProduct.price}/>}</p>
                <div>
                    <p>Колір:</p>
                    {Object.entries(newProduct.color).map(([objectKey, objectValue], index) => {
                        return (<p key={index}>
                            <input name="colorKey" defaultValue={objectKey}/> 
                            <input name="colorValue" defaultValue={objectValue}/>
                            <input type="color" defaultValue={objectValue}/>
                            <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("color", index)}}/>
                        </p>)
                    })}
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("color")}/>
                </div>
                <p>Кількість: {<input name="quantity" defaultValue={newProduct.quantity}/>}</p>
                <p>Категорія: {<input name="category" defaultValue={newProduct.category}/>}</p>
                <p>Знижка: {<input name="discount" defaultValue={newProduct.discount}/>}</p>
                <p>Склад: {
                        newProduct.ingredient.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="ingredient" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("ingredient", index)}}/>
                            </Fragment>
                        })
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("ingredient")}/>
                </p>
                <p>Опис: {
                        newProduct.description.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="description" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("description", index)}}/>
                            </Fragment>
                        })
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("description")}/>
                </p>
                <button type="submit">ЗБЕРЕГТИ</button>
            </form>
    </section>:""}
    </>)
}

export default AdminEditProduct