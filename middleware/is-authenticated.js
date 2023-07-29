// middlewsre for determining whether a request is authenticated or not
export default function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    };
};