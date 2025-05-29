import "./App.scss";
import React from "react";
import {Routes, Route} from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./routes/homepage/Homepage";
import Catalogue from "./routes/catalogue/Catalogue";
import Product from "./routes/product/Product";
import NotFound from "./routes/notFound/NotFound";
import Admin from "./routes/admin/Admin";
import Checkout from "./routes/checkout/Checkout";
import Thankyou from "./routes/thankyou/Thankyou";
import AdminProducts from "./routes/admin/AdminProducts";
import AdminEditProduct from "./routes/admin/AdminEditProduct";
import AdminSlider from "./routes/admin/AdminSlider";
import AdminEditSlider from "./routes/admin/AdminEditSlider";
import Register from "./routes/register/Register";
import Profile from "./routes/profile/Profile";
import Shipping from "./routes/shipping/Shipping";
import { useState } from "react";
import Forgot from "./routes/forgot/Forgot";
import AdminUsers from "./routes/admin/AdminUsers";
import AdminEditUser from "./routes/admin/AdminEditUser";

function App() {
  const [accountIsOpen, openAccount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Navigation openAccount={openAccount} accountIsOpen={accountIsOpen}/>}>
        <Route index element={<Home/>}/>
        <Route path="/catalogue" element={<Catalogue/>}/>

        <Route path="/catalogue/sets" element={<Catalogue type="sets" pathName="Набори"/>}/>
        <Route path="/catalogue/hair" element={<Catalogue type="hair" pathName="Волосся"/>}/>
        <Route path="/catalogue/body" element={<Catalogue type="body" pathName="Тіло"/>}/>
        <Route path="/catalogue/makeup" element={<Catalogue type="makeup" pathName="Макіяж"/>}/>
        <Route path="/catalogue/purses" element={<Catalogue type="purses" pathName="Косметички"/>}/>
        <Route path="/catalogue/candles" element={<Catalogue type="candles" pathName="Свічки"/>}/>

        <Route path="/catalogue/:productType/:productId/:productName" element={<Product/>}/>

        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="/admin/products/:productId" element={<AdminEditProduct/>}/>
        <Route path="/admin/slider" element={<AdminSlider/>}/>
        <Route path="/admin/slider/:sliderId" element={<AdminEditSlider/>}/>
        <Route path="/admin/users" element={<AdminUsers/>}/>
        <Route path="/admin/users/:userId" element={<AdminEditUser/>}/>

        <Route path="/register" element={<Register/>}/>

        <Route path="/profile" element={<Profile/>}/>

        <Route path="/thankyou" element={<Thankyou/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/checkout" element={<Checkout openAccount={openAccount} accountIsOpen={accountIsOpen}/>}/>
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  )
}

export default App;
