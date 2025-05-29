import UsersContext from "../../Context";
import { Fragment, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import AccountAdmin from "../../components/account/AccountAdmin";

const AdminEditProduct = () => {
    const {productsData, handleEdit, admin, currentProduct} = useContext(UsersContext);
    
    let location = useLocation();
    let productId = location.pathname.split("/")[location.pathname.split("/").length-1];
    let product = productsData.filter(el => el.id === Number(productId))[0] || currentProduct;
    console.log(currentProduct)


      const gatherData = (inputName) => {
        return Array.from(document.querySelectorAll(`input[name=${inputName}]`)).map(el => el.value);
      }

      console.log(Object.keys(product.color))

    const handleSubmit = (event) => {
        event.preventDefault();

        const colorKeys = gatherData("colorKey");
        const colorValues = gatherData("colorValue");
        const colorObject = {}
        colorKeys.forEach((element, index) => {
          colorObject[element] = colorValues[index];
        });

        let newProduct = {
            "id": productId,
            "title": event.target.title.value,
            "brand": event.target.brand.value,
            "price": Number(event.target.price.value),
            "like": product.like,
            "cart": product.cart,
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
          }

          console.log(newProduct)

        handleEdit(productId, newProduct, "products", productsData);
        window.location.reload()
    }

    const handleCreate = (section) => {
        let newProduct = {
            ...product,
        };

        section === "color"?newProduct[section].new = "#000000"
        :newProduct[section].push("")

        handleEdit(productId, newProduct, "products", productsData)
    }

    const handleDelete = (section, index) => {
        let newProduct = {
            ...product,
        };

        
        if(section === "color"){
            let keys = Object.keys(newProduct.color)
            delete newProduct.color[keys[index]]
            
        }else{

            delete newProduct[section][index]
        }

        handleEdit(productId, newProduct, "products", productsData)

        // window.location.reload();
    }

    
    return (<>

        <AccountAdmin />
    
        {admin?<section className="admin">
            <form onSubmit={handleSubmit} className="admin__product">
            <Link className="admin__back" to="/admin/products">НАЗАД</Link>
                <p>id: {productId}</p>
                <p>More: {
                        product.more.length>0?product.more.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="more" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("more", index);}}/>
                            </Fragment>
                        }):""
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("more")}/>
                </p>
                <p>Тип: {<input name="type" defaultValue={product.type}/>}</p>
                <p>Назва: {<input name="title" defaultValue={product.title}/>}</p>
                <p>Бренд: {<input name="brand" defaultValue={product.brand}/>}</p>
                <p>Зображення: {product.image.map((el2,index) => <Fragment key={index}>
                    <input name="image" defaultValue={el2}/>
                    <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("image", index)}}/>
                </Fragment>)}
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("image")}/>
                </p>
                <p>Спосіб застосування: {
                        product.usage.length>0?product.usage.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="usage" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("usage", index)}}/>
                            </Fragment>
                        }):""
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("usage")}/>
                </p>
                <p>Ціна: {<input name="price" defaultValue={product.price}/>}</p>
                <div>
                    <p>Колір:</p>
                    {Object.entries(product.color).map(([objectKey, objectValue], index) => {
                        return (<p key={index}>
                            <input name="colorKey" defaultValue={objectKey}/> 
                            <input name="colorValue" defaultValue={objectValue}/>
                            <input type="color" defaultValue={objectValue}/>
                            <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("color", index)}}/>
                        </p>)
                    })}
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("color")}/>
                </div>
                <p>Кількість: {<input name="quantity" defaultValue={product.quantity}/>}</p>
                <p>Категорія: {<input name="category" defaultValue={product.category}/>}</p>
                <p>Знижка: {<input name="discount" defaultValue={product.discount}/>}</p>
                <p>Склад: {
                        product.ingredient.length>0?product.ingredient.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="ingredient" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("ingredient", index)}}/>
                            </Fragment>
                        }):""
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("ingredient")}/>
                </p>
                <p>Опис: {
                        product.description.length>0?product.description.map((el, index) => {
                            return <Fragment key={index}>
                                <input name="description" defaultValue={el}/>
                                <input className="admin__product__delete" type="button" defaultValue={"ВИДАЛИТИ"} onClick={() => {handleDelete("description", index)}}/>
                            </Fragment>
                        }):""
                    } 
                    <input type="button" defaultValue={"ДОДАТИ"} onClick={() => handleCreate("description")}/>
                </p>
                <button type="submit">ЗБЕРЕГТИ</button>
            </form>
    </section>:""}
    </>)
}

export default AdminEditProduct