import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import "./Shipping.scss";

export const metadata = {
    title: "COSMOSHOPP - Магазин брендової косметики, сторінка доставки", // Page title
    description: "На цій сторінці ви можете ознайомитись з умовами та способами доставки по Україні та світу", // Meta description
    robots: "index, follow", // Robots directives (optional)
    canonical: "https://www.cosmoshopp.com/shipping", // Canonical URL
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
      title: "COSMOSHOPP - Магазин брендової косметики, сторінка доставки", // OG title
      description: "На цій сторінці ви можете ознайомитись з умовами та способами доставки по Україні та світу", // OG description
      url: "https://www.cosmoshopp.com/shipping", // OG URL
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
      title: "COSMOSHOPP - Магазин брендової косметики, сторінка доставки", // Twitter title
      description: "На цій сторінці ви можете ознайомитись з умовами та способами доставки по Україні та світу", // Twitter description
      image: "https://lh3.googleusercontent.com/pw/AP1GczN223SFlatZiTb60MgsWkt9j0l5nWtn5IrsAXuXAQpX1mXYylpP7J8iOLCrwsllLIn2RffYvq7niUODOoCKKOlEos_4AxacHRZYGPuBTY0F00BSHG-6Ocg-ZI9iBoHx8Nec28aXiy0Zzrk4Y_kq8P4C=w683-h909-s-no", // Twitter image
    },
  };


const Shipping = () => {

    return <section className="shipping">
        <Breadcrumbs links={[]} />

        <h1>Доставка і оплата</h1>


        <h2>Доставка:</h2>

        <p>Доставка товарів доступна двома зручними способами: самовивіз з нашого магазину або доставка через службу `Нова Пошта`.</p>

        <h3>Самовивіз з магазину:</h3>

        <p>Адреса: вулиця Гоголя, 8 </p>
        <p>Графік роботи: щоденно з 10:00 до 20:00</p>
        <p>Замовлення, зроблені онлайн, можна буде забрати в магазині за вказаною адресою під час його робочого часу.</p>

        <h3>Доставка `Новою Поштою`:</h3>

        <p>Зручна та надійна доставка через службу `Нова Пошта` доступна для всіх наших клієнтів. </p>
        <p>Терміни та вартість доставки розраховуються автоматично при оформленні замовлення.</p>


        <h2>Оплата:</h2>

        <p>Ми надаємо два варіанти оплати:</p>

        <h3>Оплата при отриманні:</h3>

        <p>Ви можете оплатити своє замовлення готівкою при отриманні товару під час самовивозу або кур`єру `Нової Пошти`.</p>

        <h3>Переказ на картку:</h3>

        <p>Для зручності наших клієнтів ми приймаємо оплату замовлень за допомогою переказу на банківську картку. </p>
        <p>Реквізити для оплати будуть надані під час оформлення замовлення.</p> <br/>

        <p>Якщо у вас виникнуть будь-які питання або потрібна додаткова інформація, будь ласка, звертайтеся до нашої служби підтримки.</p>
        <p>Дякуємо, що обрали нас! Бажаємо приємних покупок.</p>
    </section>
}

export default Shipping;