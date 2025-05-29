import BLOGPOSTS from "@/db_blog.json";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import "./Blog.scss";

export const metadata = {
    title: "COSMOSHOPP - Магазин брендової косметики, це сторінка блогу, тут ви можете ознайомитись з найактуальнішими новинками та оглядами на них і порадами від професіоналів", // Page title
    description: "Відкрийте світ краси з нашим косметичним блогом! Читайте про останні тренди в макіяжі, отримуйте поради щодо догляду за шкірою та знайомтеся з рецензіями на популярні косметичні продукти. Станьте експертом у світі краси разом з нами!", // Meta description
    robots: "index, follow", // Robots directives (optional)
    canonical: "https://www.cosmoshopp.com/blog", // Canonical URL
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
      title: "COSMOSHOPP - Магазин брендової косметики, це сторінка блогу, тут ви можете ознайомитись з найактуальнішими новинками та оглядами на них і порадами від професіоналів", // OG title
      description: "Відкрийте світ краси з нашим косметичним блогом! Читайте про останні тренди в макіяжі, отримуйте поради щодо догляду за шкірою та знайомтеся з рецензіями на популярні косметичні продукти. Станьте експертом у світі краси разом з нами!", // OG description
      url: "https://www.cosmoshopp.com/blog", // OG URL
      site_name: "COSMOSHOPP - Магазин брендової косметики, це сторінка блогу, тут ви можете ознайомитись з найактуальнішими новинками та оглядами на них і порадами від професіоналів", // Site name
      images: [
        {
          url: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // OG image
          width: 1200,
          height: 630,
          alt: "COSMOSHOPP candles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Twitter card type
      title: "COSMOSHOPP - Магазин брендової косметики, це сторінка блогу, тут ви можете ознайомитись з найактуальнішими новинками та оглядами на них і порадами від професіоналів", // Twitter title
      description: "Відкрийте світ краси з нашим косметичним блогом! Читайте про останні тренди в макіяжі, отримуйте поради щодо догляду за шкірою та знайомтеся з рецензіями на популярні косметичні продукти. Станьте експертом у світі краси разом з нами!", // Twitter description
      image: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // Twitter image
    },
  };

const Blog = () => {

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

    return <>
    <div className="blog__breadcrumbs">
        <Breadcrumbs links={[{path:"/blog", linkName: "Блог"}]} />
        <link rel="canonical" href="https://www.cosmoshopp.com/blog" />
    </div>
    <section className="blog">
        {BLOGPOSTS.blog.map(el => <div className="blog__item" key={el.id}>
            <Link className="blog__link" href={`/blog/${el.id}/${generate_url(el.title)}`}>
                <div className="blog_image_wrapper">
                    <Image fill src={el.image} alt="POSTIMAGE"/>
                </div>
                <h2>{el.title}</h2>
                <p>{el.paragraphs[0]}</p>
            </Link>
        </div>)}
    </section>
    </>
}

export default Blog;