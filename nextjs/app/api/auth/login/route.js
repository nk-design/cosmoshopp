import User from './../../../models/users'; // Adjust path as needed
import jwt from 'jsonwebtoken';
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function POST(req) {
    const { email, password } = await req.json(); // Get data from the request

    try {
        const user = await User.findOne({ email }).exec();
        console.log("USER EXISTS", user);

        if (!user) return new Response("ТАКОГО КОРИСТУВАЧА НЕ ІСНУЄ", { status: 400 });

        // Use the updated comparePasswords function that returns a Promise
        const match = await user.comparePasswords(password);

        if (!match) return new Response("НЕПРАВИЛЬНИЙ ПАРОЛЬ", { status: 400 });

        console.log("GENERATE A TOKEN THEN SEND RESPONSE TO A CLIENT");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return new Response(JSON.stringify({ token, user }), { status: 200 });
    } catch (err) {
        console.log("LOGIN ERROR", err);
        return new Response("ПОМИЛКА ЛОГІНУ", { status: 400 });
    }
}
