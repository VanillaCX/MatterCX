const {Model} = require("@VanillaCX/Model")


const get_model = (req, res, next) => {
    // Need to validate before using in code
    const params = {
        model: req.params.model
    }

    try {
        const model = Model.open(params)

        const data = model.latest
        res.render("model/display", {data});

    } catch(e) {
        if (e.name === "ErrorResourceNotFound") {
            res.render("model/create", {params});

        } else {
            res.render("common/errors/404");

        }
    }
}

module.exports = {get_model}