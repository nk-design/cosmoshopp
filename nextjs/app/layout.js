import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Provider } from "@/context/Context";
import Navigation from "@/components/navigation/Navigation";
import Script from "next/script";

const inter = Montserrat({ 
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ["cyrillic"] 
});

export const metadata = {
  title: "COSMOSHOPP - Магазин брендової косметики", // Page title
  description: "Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні", // Meta description
  robots: "index, follow", // Robots directives (optional)
  canonical: "https://www.cosmoshopp.com", // Canonical URL
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
    description: "Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні", // OG description
    url: "https://www.cosmoshopp.com", // OG URL
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
    description: "Вітаємо в COSMOSHOPP – вашому магазині брендовоі косметики! Відкрийте для себе широкий асортимент високоякісних продуктів від провідних брендів. Замовляйте косметику для обличчя, тіла та волосся з доставкою по Україні", // Twitter description
    image: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // Twitter image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <head>
      <Script
          id="GTGScript"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KC8B5VPT');
              `,
            }}
          />
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KC8B5VPT"
height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
      </head>
      <body className={inter.className}>
        <Provider>
          <Navigation/>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
