

export default function isAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    };
};