import BLOG from "@/db_blog.json";
import Image from "next/image";
import Link from "next/link";
import "./../../Blog.scss";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";

export async function generateMetadata({ params }) {
    // Fetch the post data based on the dynamic `id` from the URL
    const post = BLOG.blog.find(el => el.id === Number(params.id));
    if (!post) {
        return {
            title: "COSMOSHOPP - Магазин брендової косметики", // Page title
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
              title: "COSMOSHOPP - Магазин брендової косметики", // OG title
              description: "Відкрийте світ краси з нашим косметичним блогом! Читайте про останні тренди в макіяжі, отримуйте поради щодо догляду за шкірою та знайомтеся з рецензіями на популярні косметичні продукти. Станьте експертом у світі краси разом з нами!", // OG description
              url: "https://www.cosmoshopp.com/blog", // OG URL
              site_name: "COSMOSHOPP - Магазин брендової косметики", // Site name
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
              title: "COSMOSHOPP - Магазин брендової косметики", // Twitter title
              description: "Відкрийте світ краси з нашим косметичним блогом! Читайте про останні тренди в макіяжі, отримуйте поради щодо догляду за шкірою та знайомтеся з рецензіями на популярні косметичні продукти. Станьте експертом у світі краси разом з нами!", // Twitter description
              image: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // Twitter image
            },
        };
      }
    
      // If the post exists, return dynamic metadata
    return {
        title: "COSMOSHOPP - " + post.title,
        description: post.description,
        robots: "index, follow", // Robots directives (optional)
        canonical: `https://www.cosmoshopp.com/blog/${params.title}`,
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
            title: "COSMOSHOPP - " + post.title,
            description: post.description,
            url: `https://www.cosmoshopp.com/blog/${params.title}`,
            site_name: "COSMOSHOPP - Магазин брендової косметики", // Site name
            images: [
                {
                  url: post.image, // OG image
                  width: 1200,
                  height: 630,
                  alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image", // Twitter card type
            title: "COSMOSHOPP - " + post.title,
            description: post.description,
            image: post.iamge, // Twitter image
        },
    };
}

const BlogPost = ({params}) => {
    const post = BLOG.blog.find(el => el.id === Number(params.id));
    
    return <>
        <section className="blog">
        <Breadcrumbs links={[{path:"/blog", linkName: "Блог"}, {path:`/blog/${params.id}/${params.title}`, linkName: `${post.title}`}]} />
            <div className="blog__post" key={post.id}>
                <div className="blog__post__image">
                    <Image src={post.image} alt="POSTIMAGE" fill/>
                </div>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                {post.paragraphs.map((el2, index) => <div key={index}>
                    <h2>{post.headings[index]}</h2>
                    <p>{el2}</p>
                </div>)}
                <Link href={post.buttonLink}>{post.button}</Link>
            </div>
        </section>
    </>

}

export default BlogPost