import { Link } from "react-router-dom";
import {ReactComponent as Like} from "../../resources/like.svg";
import { useContext } from "react";
import UsersContext from "../../Context";

const ProductsList = ({products}) => {
    const {setCurrentProduct, like, setLike} = useContext(UsersContext);

    function generate_url(str)
    {
      let url = str.replace(/[\s]+/gi, '-');
      url = translit(url);
      url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase();	
      return url;
    }
    
    function translit(str)
    {
      let ua=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
      let en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
         let res = '';
      for(let i=0, l=str.length; i<l; i++)
      { 
        let s = str.charAt(i), n = ua.indexOf(s); 
        if(n >= 0) { res += en[n]; } 
        else { res += s; } 
        } 
        return res;  
    }

    return <div className="catalogue__products--list">
        {products.length>0?products.map((el) => {
            return (<Link onClick={() => setCurrentProduct(el)} to={"/catalogue/" + el.type + "/" + el.id + "/" + generate_url(el.title)}
             className={(el.quantity>0?"":"catalogue__products--inactive ")+"catalogue__products--card"} key={el.id}>
                <div>
                    {el.discount?<p className="catalogue__products--discount-number">-{el.discount}%</p>:""}
                    <Like onClick={()=>{like.find(element => element === el.id )?
                        setLike(like.filter(element => element !== el.id)):
                        setLike([...like, el.id])}} className={(like.find(element => element === el.id )?"catalogue__products--filled ":"") + "catalogue__products--like"} />
                    <img alt="PRODUCTIMAGE" src={el.image[0]}/>
                    {/* <Bag onClick={(event) => {
                        event.preventDefault();
                        if(cart.find(el2 => el2.id === el.id) === undefined){
                            setCart([...cart, {id: el.id, title: el.title, price: el.price, discount: el.discount, quantity: 1, image: el.image[0], color: el.color, type: el.type}])
                        } else {
                            setCart(cart.map((cartObj) => {
                                if(cartObj.id === el.id){
                                    if(cartObj.quantity!==el.quantity){
                                        cartObj.quantity = cartObj.quantity + 1
                                    }
                                }

                                return cartObj
                            }))
                        }
                        }} className={(el.like?"catalogue__products--added ":"") + "catalogue__products--bag"}/> */}
                </div>
                <div>
                    <p>{el.title}</p>
                    {el.discount>0?
                    <div className="catalogue__products--discount">
                        <span>{el.price} UAH</span><span>{Math.round(el.price*(1-el.discount/100))} UAH</span>
                    </div>:
                    <span>{el.price} UAH</span>}
                </div>
            </Link>)
        }):<h4 className="catalogue__products--empty">Вибачте, але за вашим запитом немає продуктів</h4>}
    </div>
}

export default ProductsList;