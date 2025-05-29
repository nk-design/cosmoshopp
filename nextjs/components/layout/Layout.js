// components/Layout.js
import Head from 'next/head';

const Layout = ({ children, title, description }) => {
    return (
        <>
            <Head>
                <title>{title || "Default Title"}</title>
                <meta name="description" content={description || "Default description."} />
            </Head>
            <main>{children}</main>
        </>
    );
};

export default Layout;