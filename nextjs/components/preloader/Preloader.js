import React from 'react';
import Image from 'next/image';
import Logo from "@/public/COSMOSHOP.svg";
import './Preloader.scss';

const Preloader = () => {
  return (
    <div className="preloader">
        <Image src={Logo} alt="LOGO" className="nav__content--logo" fill/>
      <div className="spinner"></div>
    </div>
  );
};

export default Preloader;