// error handling
function errConsole (error) {
    return console.log(error.message)
};

function err404 (error, res) {
    return res.status(404).send(error.message)
};

export function errHandler (error, res) {
    errConsole(error)
    err404(error, res)
};