import User from "../models/users";
import jwt from "jsonwebtoken"


export const register = async (req,res) => {
    console.log(req.body)
    const {email, password} = req.body;

    if(!email) return res.status(400).send("ЕЛЕКТРОННА АДРЕСА ПОВИННА БУТИ ПРИСУТНЯ");
    if(!password || password.length < 6) return res.status(400).send("ПАРОЛЬ ПОВИНЕН БУТИ ПРИСУТНІМ І БІЛЬШЕ НІЖ 6 СИМВОЛІВ");

    let userExist = await User.findOne({email}).exec();

    if(userExist) return res.status(400).send("КОРИСТУВАЧ ВЖЕ ІСНУЄ");

    const user = new User(req.body)

    try{
        await user.save()
        console.log("КОРИСТУВАЧА СТВОРЕНО", user)
        return res.json({   
            ok: true
        })
    } catch(err){
        console.log("ХИБНА СПРОБА СТВОРЕННЯ КОРИСТУВАЧА", err)
        return res.status(400).send("ПОМИЛКА")
    }

}

export const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email}).exec();
        console.log("USER EXISTS", user)

        if(!user) return res.status(400).send("ТАКОГО КОРИСТУВАЧА НЕ ІСНУЄ");

        user.comparePasswords(password, (err,match) => {
            console.log("COMPARE PASSWORD IN LOGIN ERR", err)

            if(!match || err) return res.status(400).send("НЕПРАВИЛЬНИЙ ПАРОЛЬ");
            console.log("GENERATE A TOKEN THEN SEND RESPONSE TO A CLIENT");
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
            res.json({token, user})
        })
    } catch(err){
        console.log("LOGIN ERROR", err)

        res.status(400).send("ПОМИЛКА ЛОГІНУ")
    }
}

export const userDelete = async (req, res) => {
    const _id = req.params.id;
    try{
        await User.deleteOne({ _id }).exec(); 
        console.log("USER DELETED");
        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR", err)
    }
}

export const firstBuyRedeem = async (req, res) => {
    const email = req.body.user.user.email;
    try{
        let user = await User.findOne({email}).exec();
        user.firstBuy = 0;
        await user.save()
        console.log("FIRST BUY REDEEMED", user)
        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR", err)
    }
}

export const sendOrder = async (req, res) => {
    let email = "cosmoshopp@cosmoshopp.com";
    const cart = req.body.cart;
    const formValue = req.body.formValue;
    const cashback = req.body.cashback;
    const finalSum = req.body.finalSum;

    if(req.body.user !== null){
        email = req.body.user.user.email
    }

    try{
        let user = await User.findOne({email}).exec();
        user.name = formValue.name
        user.surName = formValue.surName
        user.phone = formValue.phone
        user.oblast = formValue.oblast
        user.city = formValue.city
        user.viddil = formValue.viddil
        user.orders = cart?[...user.orders, cart]:[...user.orders];
        user.cashback = cashback!==0?(user.cashback - cashback) + (finalSum/100*5):user.cashback + (finalSum/100*5);
        await user.save();
        console.log("ORDERS UPDATED", user);
        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR", err)
    }
}

export const changePassword = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        let user = await User.findOne({email}).exec();
        if(!user) return res.status(400).send("ТАКОГО КОРИСТУВАЧА НЕ ІСНУЄ");
        user.password = password;
        await user.save();
        console.log("PASSWORD UPDATED", user);
        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR", err)
    }
}

export const adminLogin = async (req,res) => {
    const {email, password} = req.body;

    try{
        if(email !== "cosmoshopp@cosmoshopp.com") return res.status(400).send("НЕПРАВИЛЬНИЙ EMAIL");
        let user = await User.findOne({email}).exec();

        user.comparePasswords(password, (err,match) => {
            console.log("COMPARE PASSWORD IN LOGIN ERR", err)

            if(!match || err) return res.status(400).send("НЕПРАВИЛЬНИЙ ПАРОЛЬ");
            return res.json({
                ok: true
            })
        })
    } catch(err){
        console.log("LOGIN ERROR", err)

        res.status(400).send("ПОМИЛКА ЛОГІНУ")
    }
}

export const listUsers = async (req,res) => {
    try{
        User.find().exec(function(err, users){
            console.log('users : ', users);
            console.log('err', err);
            return res.send(users);
        });
    } catch(err) {
        console.log("USERS LISTING ERROR", err)

        res.status(400).send("ПОМИЛКА ЮЗЕРІВ")
    }
}

export const createPromo = async (req, res) => {
    const {promocodes} = req.body;
    const email = "cosmoshopp@cosmoshopp.com"
    try{
        let user = await User.findOne({email}).exec();
        user.promocodes = promocodes;
        await user.save();

        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR OCCURED", err)
        res.status(400).send("ПОМИЛКА ЮЗЕРІВ")
    }

}

export const getGeneralPromo = async (req, res) => {
    const email="cosmoshopp@cosmoshopp.com";
    try{
        let user = await User.findOne({email}).exec();

        return res.json({
            ok: true,
            user: user.promocodes
        })
    } catch(err) {
        console.log("ERROR OCCURED", err)
        res.status(400).send("ПОМИЛКА АДМІНА")
    }

}

export const updatePromo = async (req, res) => {
    let {general, email, promocodes} = req.body;

    if(general){
        email = "cosmoshopp@cosmoshopp.com";
    }

    try{
        let user = await User.findOne({email}).exec();
        user.promocodes = promocodes;
        await user.save();

        return res.json({
            ok: true
        })
    } catch(err) {
        console.log("ERROR OCCURED", err)
        res.status(400).send("ПОМИЛКА ЮЗЕРІВ")
    }

}