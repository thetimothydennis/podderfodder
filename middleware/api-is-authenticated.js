// middlewsre for determining whether a request is authenticated or not
export default function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        let userId = req.headers.cookie.match(/userId=.{24}/)[0].split("=")[1];
        let requestedUser = req.url.split('/');
        let verifiedAuthorizedUser = requestedUser.find(item => item == userId);
        if (verifiedAuthorizedUser) {
            next();
        } else {
            res.status(401).send("You cannot access another user's account.")
        }
    } else {
        res.status(401).send('You must be logged in to make API requests.');
    };
};