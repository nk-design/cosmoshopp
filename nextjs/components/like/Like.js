import { useContext } from "react"
import Link from "next/link";
import Image from "next/image";
import UsersContext from "@/context/Context";
import "./Like.scss";

const Like = () => {

    const {like, productsData} = useContext(UsersContext);

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


    return(
        <div className="like">
            {like.length>0?productsData.filter(element => like.find(likeel => element.id === likeel)).map(product => {
                return <Link href={"/catalogue/" + product.type + "/" + product.id + "/" + generate_url(product.title)}
                className={(product.quantity>0?"":"catalogue__products--inactive ")+"catalogue__products--card"} key={product.id}>
                    <Image src={product.image.split("/br")[0]} width={400} height={400} alt="LIKEIMAGE" />
                    <h2>{product.title}</h2>
                    {product.discount?<p>{Math.round(product.price - (product.price * (product.discount/100)))} UAH</p>:<p>{product.price} UAH</p>}
                </Link>
            }):<h2>Тут будуть ваші обрані товари</h2>}
        </div>
    )

}

export default Like