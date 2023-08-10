// error handling

function err404(error, res) {
	return res.status(404).send(error.message);
}

export function errHandler(error, res) {
	err404(error, res);
}
