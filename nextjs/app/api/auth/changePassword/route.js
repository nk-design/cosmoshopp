import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function PUT(req) {
    const { email, password } = await req.json(); // Expecting email and password in the request body

    try {
        let user = await User.findOne({ email }).exec();
        if (!user) {
            return new Response("ТАКОГО КОРИСТУВАЧА НЕ ІСНУЄ", { status: 400 });
        }

        user.password = password; // Make sure to hash the password before saving in a real application
        await user.save();
        console.log("PASSWORD UPDATED", user);
        
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.log("ERROR", err);
        return new Response("ПОМИЛКА", { status: 500 });
    }
}
