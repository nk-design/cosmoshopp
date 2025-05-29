import "./NotFound.scss";
import Breadcrumbs from "./../components/breadcrumbs/Breadcrumbs"

const NotFound = () => {
    return (
        <section className="notfound">
            <Breadcrumbs links={[]}/>
            <h1>404</h1>
            <p>Сторінку не знайдено</p>
        </section>
    )
}

export default NotFound;