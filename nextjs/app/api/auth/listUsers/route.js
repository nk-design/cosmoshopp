import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

await connectDB();

export async function GET() {
    try {
        const users = await User.find().exec();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.log("USERS LISTING ERROR", err);
        return new Response("ПОМИЛКА ЮЗЕРІВ", { status: 400 });
    }
}
