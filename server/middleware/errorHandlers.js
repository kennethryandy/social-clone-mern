

exports.notFound = (req, res, next) => {
	const err = new Error(`Not found ${req.originalUrl}`);
	res.status(404);
	next(err);
}

exports.errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: err.stack,
		success: 0
	});
}