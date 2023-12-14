const express = require('express')
const router = express.Router()
const {StoreCX} = require("@VanillaCX/Store");

router.use((req, res, next) => {
    console.log(`Public Access Request at :${Date.now()}`)
   
    next()
})

router.get("/", (req, res) => {
    const sessionStore = new StoreCX(req, "sessionStore");
    const user = sessionStore.get("user");

    const screenname = (user && user.data && user.data.screenname) ? user.data.screenname : "Guest";

    console.log();

    res.render("public/index", {screenname});
})

module.exports = router
