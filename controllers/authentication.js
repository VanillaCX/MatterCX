const {StoreCX} = require("@VanillaCX/Store");

const login = async (req, res, next) => {
    try {
        console.log("Authenticating ...");
        const userData = new StoreCX(req, "userData");
        await userData.set("authenticated", true);
        console.log("Authenticated !!");
        res.redirect("/")
    
    } catch(error) {
        // Handle Error
    }
}

const logout = async (req, res, next) => {
    try {
        console.log("Logging out ...");
          const userData = new StoreCX(req, "userData");
          await userData.set("authenticated", false);
          console.log("Logged out !!");
          res.redirect("/")
    
    } catch(error) {
        // Handle Error
    }
}

module.exports = {login, logout}