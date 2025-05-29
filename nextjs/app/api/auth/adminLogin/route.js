import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection
import jwt from 'jsonwebtoken';


export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();

    if (email !== "cosmoshopp@cosmoshopp.com") {
        return new Response("Неправильний email", { status: 400 });
    }

    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return new Response("Користувача не існує", { status: 400 });
        }

        // Use the comparePasswords method
        const match = await user.comparePasswords(password);

        if (!match) {
            return new Response("Неправильний пароль", { status: 400 });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        
        return new Response(JSON.stringify({ ok: true, token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error("LOGIN ERROR", err);
        return new Response("Помилка логіну", { status: 500 });
    }
}