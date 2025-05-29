import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function POST(req) {
    const { email, password } = await req.json();
    const firstBuy = 1;
    const cashback = 0;
    const bday = null;
    
    // Check for email and password
    if (!email) {
        return new Response("ЕЛЕКТРОННА АДРЕСА ПОВИННА БУТИ ПРИСУТНЯ", { status: 400 });
    }
    if (!password || password.length < 6) {
        return new Response("ПАРОЛЬ ПОВИНЕН БУТИ ПРИСУТНІМ І БІЛЬШЕ НІЖ 6 СИМВОЛІВ", { status: 400 });
    }

    // Check if user already exists
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
        return new Response("КОРИСТУВАЧ ВЖЕ ІСНУЄ", { status: 400 });
    }

    // Create new user
    const user = new User({ email, password, firstBuy, cashback, bday }); // Ensure you pass the required fields

    try {
        await user.save();
        console.log("КОРИСТУВАЧА СТВОРЕНО", user);
        return new Response(JSON.stringify({ ok: true }), { status: 201 });
    } catch (err) {
        console.log("ХИБНА СПРОБА СТВОРЕННЯ КОРИСТУВАЧА", err);
        return new Response("ПОМИЛКА", { status: 400 });
    }
}
