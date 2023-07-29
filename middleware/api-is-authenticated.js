// middlewsre for determining whether a request is authenticated or not
export default function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        let requestedUser = req.url.split('/')
        let userIdCheck = req.headers.cookie.split('userId=')[1];
        let verifiedAuthorizedUser = requestedUser.find(item => item == userIdCheck);
        if (verifiedAuthorizedUser) {
            next();
        } else {
            res.status(401).send("You cannot access another user's account.")
        }
    } else {
        res.status(401).send('You must be logged in to make API requests.');
    };
};