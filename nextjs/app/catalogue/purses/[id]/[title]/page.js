import Product from "@/components/product/Product";

export async function generateMetadata({params}) {
    const product = await fetch(`http://localhost:3000/api/db/${params.id}/findProduct`).then(response => response.json()).then(data => data.product);
    const generate_url = (str) => {
        let url = str.replace(/[\s]+/gi, '-');
        url = translit(url);
        url = url.replace(/[^0-9a-z_-]+/gi, '').toLowerCase();	
        return url;
      }
      
    const translit = (str) => {
    const ua=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
    const en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
        let res = '';
    for(let i=0, l=str.length; i<l; i++)
    { 
        const s = str.charAt(i), n = ua.indexOf(s); 
        if(n >= 0) { res += en[n]; } 
        else { res += s; } 
        } 
        return res;  
    }

    const productId = product.id;
    const productType = product.type;
    const productName = generate_url(product.title);

    return {
        title: "COSMOSHOPP - " + product.title + " | " + product.price + " UAH | " + product.description[0],
        description: product.description,
        robots: "index, follow", // Robots directives (optional)
        canonical: `https://www.cosmoshopp.com/catalogue/${productType}/${productId}/${productName}`,
        icons: {
            // Standard favicon for the browser tab
            icon: "/favicon.ico",  // Default favicon for browsers
        
            // 32x32 favicon for browsers and other devices
            favicon32x32: "/favicon-32x32.png",  // Favicon 32x32 for better resolution
        
            // Apple touch icon for iOS devices when added to the home screen
            apple: "/apple-touch-icon.png", // Icon used by iOS devices for home screen
        
            // Optional: Define other icon sizes
            icon32x32: "/favicon-32x32.png",  // For clarity, add explicit 32x32 icons
        
            // Manifest icons for Android and Progressive Web App (PWA) support
            android: "/android-icon-192x192.png", // Android home screen icon (recommended for PWA)
            apple: "/apple-touch-icon.png",  // For iOS devices (used when the site is added to the home screen)
        },
        openGraph: {
            title: "COSMOSHOPP - " + product.title + " | " + product.price + " UAH | " + product.description[0],
            description: product.description,
            url: `https://www.cosmoshopp.com/catalogue/${productType}/${productId}/${productName}`,
            site_name: "COSMOSHOPP - Магазин брендової косметики", // Site name
            images: [
                {
                  url: product.image[0], // OG image
                  width: 1200,
                  height: 630,
                  alt: product.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image", // Twitter card type
            title: "COSMOSHOPP - " + product.title + " | " + product.price + " UAH | " + product.description[0],
            description: product.description,
            image: product.image[0], // Twitter image
        },
    };
}

export default async function Page({params}){
    const product = await fetch(`http://localhost:3000/api/db/${params.id}/findProduct/`)
        .then((response) => response.json())
        .then((data) => data.product);

    return <Product product={product}/>
}