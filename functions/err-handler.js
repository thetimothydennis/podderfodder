// error handling
function errConsole(error) {
	// eslint-disable-next-line no-console
	return console.log(error);
}

function err404(error, res) {
	return res.status(404).send(error.message);
}

export function errHandler(error, res) {
	errConsole(error);
	err404(error, res);
}
