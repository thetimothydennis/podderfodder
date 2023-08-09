// certificate options for https server
export const ssl_options = {
	key: process.env.SSL_KEY,
	cert: process.env.SSL_CERT,
	ca: process.env.SSL_CA,
};
