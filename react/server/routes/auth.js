import express from "express";
import { register, login, userDelete, firstBuyRedeem, sendOrder, changePassword, adminLogin, listUsers, createPromo, getGeneralPromo, updatePromo } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/adminLogin/', adminLogin)
router.delete('/userDelete/:id', userDelete);
router.put('/firstBuyRedeem/:id', firstBuyRedeem);
router.put('/sendOrder/:id', sendOrder);
router.put('/createPromo/', createPromo);
router.put('/updatePromo/', updatePromo);
router.put('/changePassword/', changePassword);
router.get('/listUsers/', listUsers);
router.get('/getGeneralPromo/', getGeneralPromo);

module.exports = router;