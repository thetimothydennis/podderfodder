// axios used for getting data from Apple Podcasts API into this API
import axios from "axios";
import { errHandler } from "../functions/err-handler.js";

// controller for new podcast search function
export const search = async (req, res) => {
	try {
		// assigns query parameter q to constant searchTerm
		const searchTerm = req.query.q;
		// axios queries the Apple Podcasts API using the query from client
		const searchPods = await axios.get(
			`https://itunes.apple.com/search?term=${searchTerm}&type=podcast&media=podcast`
		);
		// sends data from Apple Podcasts API back to client
		res.send(searchPods.data);
	} catch (error) {
		errHandler(error, res);
	}
};
