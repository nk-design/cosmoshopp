import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

await connectDB();

export async function GET() {
    const email = "cosmoshopp@cosmoshopp.com";
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return new Response("КОРИСТУВАЧ НЕ ЗНАЙДЕНО", { status: 404 });
        }

        return new Response(JSON.stringify({
            ok: true,
            user: user.promocodes
        }), { status: 200 });
    } catch (err) {
        console.log("ERROR OCCURED", err);
        return new Response("ПОМИЛКА АДМІНА", { status: 400 });
    }
}
