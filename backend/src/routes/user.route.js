import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getReccomendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(protectRoute); //applies protected routes to every route we use here
router.get("/",getReccomendedUsers)
router.get("/friend",getMyFriends)

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
