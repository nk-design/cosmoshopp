import Catalogue from "@/components/catalogue/Catalogue";

export const metadata = {
    title: "COSMOSHOPP - Магазин брендової косметики, сторінка каталогу нашого асортименту", // Page title
    description: "На цій сторінці ви можете ознайомитись з нашими продуктами. Ми пропонуємо тільки найкращі товари брендової косметики", // Meta description
    robots: "index, follow", // Robots directives (optional)
    canonical: "https://www.cosmoshopp.com/catalogue", // Canonical URL
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
      title: "COSMOSHOPP - Магазин брендової косметики, сторінка каталогу нашого асортименту", // OG title
      description: "На цій сторінці ви можете ознайомитись з нашими продуктами. Ми пропонуємо тільки найкращі товари брендової косметики", // OG description
      url: "https://www.cosmoshopp.com/catalogue", // OG URL
      site_name: "COSMOSHOPP - Магазин брендової косметики, сторінка каталогу нашого асортименту", // Site name
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
      title: "COSMOSHOPP - Магазин брендової косметики, сторінка каталогу нашого асортименту", // Twitter title
      description: "На цій сторінці ви можете ознайомитись з нашими продуктами. Ми пропонуємо тільки найкращі товари брендової косметики", // Twitter description
      image: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // Twitter image
    },
  };

const CataloguePage = () => {
    return <Catalogue type="" pathName=""/>
}

export default CataloguePage;