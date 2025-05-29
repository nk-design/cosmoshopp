import "./Breadcrumbs.scss"
import { Fragment } from "react";
import Link from "next/link";

const Breadcrumbs = ({links}) => {

    return (
        <div className="breadcrumb">
            <Link href="/">Головна</Link>

            {links?links.map((el,index) => {
                return(<Fragment key={index}>
                    <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 14L0.999995 27" fill="#161209"></path>
                        <path d="M1 1L16 14L0.999995 27" stroke="#FDFDFB" strokeWidth="2"></path>
                    </svg>
                    <Link  href={el.path||""}>{el.linkName}</Link>
                    </Fragment>
                )
            }):""}
        </div>
    )
}

export default Breadcrumbs;