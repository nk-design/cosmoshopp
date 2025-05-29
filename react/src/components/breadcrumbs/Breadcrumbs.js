import "./Breadcrumbs.scss"
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {ReactComponent as RightArrow} from "./../../resources/right_arrow.svg"

const Breadcrumbs = ({links}) => {

    return (
        <div className="breadcrumb">
            <Link to="/">Головна</Link>

            {links?links.map((el,index) => {
                return(<Fragment key={index}>
                    <RightArrow />
                    <Link  to={el.path}>{el.linkName}</Link>
                    </Fragment>
                )
            }):""}
        </div>
    )
}

export default Breadcrumbs;