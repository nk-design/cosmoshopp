"use client";

import { useEffect, useState } from "react";
import "./InstaPosts.scss";
import Image from "next/image";

const InstaPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
      const insta = async () => {
        const response = await fetch("https://feeds.behold.so/zyUK0Wrowy0E3gF1x1wz");
        const instaResponse = await response.json();
        setPosts(instaResponse);
      }
    
      insta();
    },[])

    return (
        <div className='instagram__posts'>
            {posts.map((el,index) => {
                return (el.mediaUrl.indexOf("mp4")!==-1)?<a key={index} target='_blank' href={el.permalink} rel='noreferrer'><Image fill alt="INSTAPOST" src={el.thumbnailUrl}/></a>:
                <a key={index} target='_blank' href={el.permalink} rel='noreferrer'><Image fill alt="INSTAPOST" src={el.mediaUrl}/></a>
            })}
        </div>
    )
}

export default InstaPosts