const express = require('express')
const router = express.Router()
const {StoreCX} = require("@VanillaCX/Store");

const authentication_controller = require("../../controllers/authentication.js")
const model_controller = require("../../controllers/model.js")

const authenticated = true;

router.use((req, res, next) => {
    console.log(`Public Access Request at :${Date.now()}`)
    //const sessionStore = new StoreCX(req, "sessionStore");
    //const userData = sessionStore.get("userData");

    next()
})

/**
 * router.get("/", (req, res) => {
    //const sessionStore = new StoreCX(req, "sessionStore");
    //const user = sessionStore.get("user");

    //const screenname = (user && user.data && user.data.screenname) ? user.data.screenname : "Guest";
     const screenname = "Hey"
    console.log();

    res.render("public/index", {screenname});
})
 */



/**
 * // Setup entry point routing
app.use("/", publicRoute)
 */

class ErrorResourceNotFound extends Error {
    constructor(message, details = {}){
        super(message)

        this.name = "ErrorResourceNotFound"
        this.code = 404
        this.details = details
    }
}

class Model {
    constructor(){

    }

    static open({model} = {}){
        const data = null;

        if (!data) {
            throw new ErrorResourceNotFound()
        }

        return data
    }
}

class Matter {
    constructor(){

    }

    static open({matter, model} = {}){
        const data = "Hey";

        if (!data) {
            throw new ErrorResourceNotFound(false, {
                model: true,
                matter: true,
                branch: false,
            })
        }

        return data
    }
}


router.route("/")
    .get((req, res) => {
        res.render("finder/home");
    })
    .post((req, res) => {
        // Logic for handling POST requests to "/"
    });

/**
 * AUTHENTICATION (FAKE)
 */
router.route("/login")
    .get(authentication_controller.login)

router.route("/logout")
    .get(authentication_controller.logout)



/**
 * MODEL
 */
router.route("/:model")
    .get(model_controller.get_model);

/**
 * MATTER
 */
router.route("/:model/:matter")
    .get(matter_controller.get_matter);

router.route("/:model/:matter/branches")
    .get(matter_controller.get_branches);

router.route("/:model/:matter/branches/:branch")
    .get(matter_controller.get_branch);


module.exports = router
