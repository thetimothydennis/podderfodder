import { Router } from "express";
// auth middleware import
import isAuthenticated from "../middleware/api-is-authenticated.js";
// other middleware imports
import * as MWusers from "../middleware/user.mw.js";
// controller imports
import * as CTRLusers from "../controllers/users-controller.js";
import { search } from "../controllers/search-pods-controller.js";

const router = Router();

// route for pod search function
router.get("/api/search/", search);

// attaches auth middleware to all API routes
router.use(isAuthenticated);

router
	.route("/api/user/:userid")
	// gets all podcasts for user
	.get(CTRLusers.getUserPods)
	// adds a podcast and episodes for a user in db
	.post(
		MWusers.addUserPods,
		MWusers.updateOnePodcast,
		CTRLusers.updateUserPod,
	);

router
	.route("/api/user/:userid/:podid")
	// gets a single podcast for a user
	.get(CTRLusers.getUserPod)
	// updates a single podcast for a user
	.put(MWusers.updateOnePodcast, CTRLusers.updateUserPod)
	// deletes a single podcast for a user
	.delete(CTRLusers.deleteUserPod);

router
	.route("/api/user/:userid/:podid/:epiid")
	// gets a single episode for a user
	.get(CTRLusers.getUserEpi)
	// deletes a single episode for a user
	.delete(CTRLusers.deleteUserEpi);

router
	.route("/api/allepisodes/:userid/")
	// sends episodes for all user podcasts
	.get(CTRLusers.getAllUserEpis);

export default router;
