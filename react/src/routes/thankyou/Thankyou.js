import "./Thankyou.scss";
import { Link } from "react-router-dom";

const Thankyou = () =>{
    return (
        <section className="thankyou">
            <h1>ДЯКУЄМО, ЩО ОБРАЛИ COSMOSHOPP</h1>
            <Link to={"/"}>Перейти до головної</Link>
        </section>
    )
}

export default Thankyou