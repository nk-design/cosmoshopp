'use client';

import "./Header.scss";
import Carousel from "nuka-carousel";
import Link from "next/link";
import SLIDER from "@/db_slider.json";
import { useEffect } from "react";
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import("./HeaderVideo"),
  { ssr: false }
)

const Header = () => {

    return (
        <div className="header__slider">
            <Carousel autoplay={false} dragging={false} speed={1500} wrapAround={true} pauseOnHover={true} renderBottomCenterControls={false}>
                {SLIDER.slider.map((el)=>{
                    return (
                        <div key={el.id}>
                            <div className="header__slider__text">
                                <h1>{el.title}</h1>
                                <p>{el.description}</p>
                                <Link href={el.buttonLink} className="grey__button">{el.button}</Link>
                            </div>
                            <DynamicComponentWithNoSSR/>
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default Header;