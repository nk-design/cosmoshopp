import "./Header.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import UsersContext from "../../Context";
import video_desktop from "./IMG_2064.mov";
import video_mobile from "./IMG_0679.mov";
import video_desktop_mp4 from "./IMG_2064.mp4";
import video_mobile_mp4 from "./IMG_0679.mp4";

const Header = () => {

    const {sliderData, fetchSlider} = useContext(UsersContext);

    useEffect(()=>{
        fetchSlider()
    },[fetchSlider])

    return (
        <div className="header__slider">
            <Carousel autoplay={false} dragging={false} speed={1500} wrapAround={true} pauseOnHover={true} renderBottomCenterControls={false}>
                {sliderData.map((el)=>{
                    return (
                        <div key={el.id}>
                            <div className="header__slider__text">
                                <h1>{el.title}</h1>
                                <p>{el.description}</p>
                                <Link to={el.buttonLink} className="grey__button">{el.button}</Link>
                            </div>
                            {window.innerWidth>750?<video width="100%" height="100%" autoPlay loop muted playsInline preload="none">
                                <source src={video_desktop_mp4} type="video/mp4" />
                                <source src={video_desktop} type="video/MOV" />
                            </video>:<video width="100%" height="100%" autoPlay loop muted playsInline preload="none">
                                <source src={video_mobile_mp4} type="video/mp4" />
                                <source src={video_mobile} type="video/MOV" />
                            </video>}
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Header;