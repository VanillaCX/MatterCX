const {Matter} = require("@VanillaCX/Matter")

const request_matter = async (req, res) => {

    // Need to validate before using in code
    const params = {
        model: req.params.model,
        matter: req.params.matter
    }

    try {
        const matter = Matter.open(params)

        const data = matter.latest

        res.render("matter/display/", {data, authenticated: req.session.userData.authenticated});


    } catch(e) {
        if (e.name === "ErrorResourceNotFound") {
            if(req.session.userData.authenticated){
                res.render("matter/create", {params});

            } else {
                res.render("matter/request", {params});

            }

        } else {
            res.render("common/errors/404");

        }
    }
    
}

const get_branches = async (req, res) => {

    // Need to validate before using in code
    const params = {
        model: req.params.model,
        matter: req.params.matter
    }

    try {
        const matter = Matter.open(params)

        const data = matter.latest
        res.render("matter/display", {data});

    } catch(e) {
        if (e.name === "ErrorResourceNotFound") {
            res.redirect(`/${params.model}/${params.matter}`);

        } else {
            res.render("common/errors/404");

        }
    }

}

const get_branch = async (req, res) => {
        
    // Need to validate before using in code
    const params = {
        model: req.params.model,
        matter: req.params.matter,
        branch: req.params.branch
    }

    try {
        const matter = Matter.open(params)

        const data = matter.latest
        res.render("matter/display", {data});

    } catch(e) {
        console.log(e.details)
        if (e.name === "ErrorResourceNotFound") {
            if (e.details.model && e.details.matter) {
                // Matter exists. Propose new branch
                res.render("branches/create", {params});

            } else {
                res.redirect(`/${params.model}/${params.matter}`);
            }

        } else {
            res.render("common/errors/404");

        }
    }
    
}

module.exports = {get_matter, get_branches, get_branch}