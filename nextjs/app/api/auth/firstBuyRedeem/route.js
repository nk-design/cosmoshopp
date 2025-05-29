import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function PUT(req) {
    const data = await req.json()
    const email = data.user.user.email; // Assuming you're sending the email in the request body

    try {
        let user = await User.findOne({ email }).exec();

        if (!user) {
            return new Response("КОРИСТУВАЧА НЕ ЗНАЙДЕНО", { status: 404 });
        }

        user.firstBuy = 0;
        await user.save();
        
        console.log("FIRST BUY REDEEMED", user);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.log("ERROR", err);
        return new Response("ПОМИЛКА", { status: 500 });
    }
}
