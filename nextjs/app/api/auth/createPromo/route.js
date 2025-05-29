import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

await connectDB();

export async function PUT(req) {
    const { promocodes } = await req.json(); // Expecting promocodes in the request body
    const email = "cosmoshopp@cosmoshopp.com";

    try {
        let user = await User.findOne({ email }).exec();
        if (!user) {
            return new Response("КОРИСТУВАЧ НЕ ЗНАЙДЕНО", { status: 404 });
        }

        user.promocodes = promocodes;
        await user.save();

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.log("ERROR OCCURED", err);
        return new Response("ПОМИЛКА ЮЗЕРІВ", { status: 400 });
    }
}
