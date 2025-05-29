import User from './../../../models/users'; // Adjust path as needed
import connectDB from './../../../lib/mongodb'; // Make sure to import your DB connection

// Connect to the database
await connectDB();

export async function PUT(req) {
    const { cart, formValue, user, orderSum, cashback } = await req.json(); // Expecting cart, formValue, and user in the request body

    let email = "cosmoshopp@cosmoshopp.com";

    if (user && user.user && user.user.email) {
        email = user.user.email;
    }

    try {
        let userFound = await User.findOne({ email }).exec();

        if (!userFound) {
            return new Response("КОРИСТУВАЧА НЕ ЗНАЙДЕНО", { status: 404 });
        }

        userFound.name = formValue.name;
        userFound.surName = formValue.surName;
        userFound.phone = formValue.phone;
        userFound.oblast = formValue.oblast;
        userFound.city = formValue.city;
        userFound.viddil = formValue.viddil;
        userFound.orders = cart ? [...userFound.orders, cart] : [...userFound.orders];
        userFound.cashback = cashback!==""?(userFound.cashback - cashback) + (orderSum/100*5):userFound.cashback + (orderSum/100*5);

        await userFound.save();
        console.log("ORDERS UPDATED", userFound);

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.log("ERROR", err);
        return new Response("ПОМИЛКА", { status: 500 });
    }
}
