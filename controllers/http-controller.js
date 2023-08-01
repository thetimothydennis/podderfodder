const PORT = process.env.PORT;

export const httpRedirectAll = (req, res) => {
    res.redirect(`https://${req.headers.host}:${PORT}${req.path}`);
};