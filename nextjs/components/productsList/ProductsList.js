import Link from "next/link";
import { useContext } from "react";
import UsersContext from "@/context/Context";
import Image from "next/image";
import "./ProductsList.scss";

const ProductsList = ({products}) => {
    const {like, setLike} = useContext(UsersContext);

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
            return (<Link href={"/catalogue/" + el.type + "/" + el.id + "/" + generate_url(el.title)}
             className={(el.quantity>0?"":"catalogue__products--inactive ")+"catalogue__products--card"} key={el.id}>
                <div>
                    {el.discount?<p className="catalogue__products--discount-number">-{el.discount}%</p>:""}
                    <div onClick={()=>{like.find(element => element === el.id )?
                        setLike(like.filter(element => element !== el.id)):
                        setLike([...like, el.id])}} className={(like.find(element => element === el.id )?"catalogue__products--filled ":"") + "catalogue__products--like"}>
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="catalogue__products--like"><path d="M10.2386 3.52152L10.8108 4.11688L11.383 3.52152C12.3002 2.56724 13.8052 1.37402 15.4503 1.37402C16.9786 1.37402 18.2307 1.90014 19.1003 2.76292C19.9706 3.62648 20.5042 4.874 20.5042 6.39888C20.5042 8.05803 19.8522 9.44205 18.8209 10.7198C17.7745 12.0162 16.3751 13.1596 14.9192 14.3453L14.9056 14.3564C13.5583 15.4532 12.0971 16.6427 10.9637 17.9742C10.9287 18.015 10.8822 18.0339 10.8393 18.0339H10.7841C10.7404 18.0339 10.6932 18.0145 10.6582 17.9736L10.6595 17.9752C9.53738 16.6544 8.08961 15.4741 6.75366 14.3848L6.70548 14.3455C5.24924 13.1595 3.84969 12.0155 2.80367 10.7192C1.77264 9.44146 1.12109 8.05765 1.12109 6.39888C1.12109 4.874 1.6548 3.62649 2.52518 2.76295C3.39479 1.90018 4.64727 1.37402 6.17599 1.37402C7.81973 1.37402 9.32074 2.5666 10.2386 3.52152Z" stroke="#FDFDFB"></path></svg>
                    </div>
                    {/* <Image src={Like}  alt="LIKE" onClick={()=>{like.find(element => element === el.id )?
                        setLike(like.filter(element => element !== el.id)):
                        setLike([...like, el.id])}} className={(like.find(element => element === el.id )?"catalogue__products--filled ":"") + "catalogue__products--like"} /> */}
                    <Image alt="PRODUCTIMAGE" width={500} height={500} src={el.image.split("/br")[0]}/>
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