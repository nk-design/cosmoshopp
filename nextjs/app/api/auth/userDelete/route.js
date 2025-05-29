import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function DELETE(req) {
    const { id } = await req.json(); // Assuming you're sending the ID in the request body

    try {
        const result = await User.deleteOne({ _id: id }).exec();
        
        if (result.deletedCount === 0) {
            return new Response("КОРИСТУВАЧ НЕ ЗНАЙДЕНО", { status: 404 });
        }

        console.log("USER DELETED");
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.log("ERROR", err);
        return new Response("ПОМИЛКА", { status: 500 });
    }
}