import { Router } from "express";
import { getPosts, getSinglePost, addComment, reactPost } from "../controllers/posts";
import { createUser, logInUser, logOutUser, changePassword, authCheck } from "../controllers/auth";
import { changeNameDisplay, changeDarkMode } from "../controllers/settings";

import { verifyJWT, deleteAcc } from "../middleware/authMiddleware";
import { reactUser } from "../middleware/postsMiddleware";

const router: Router = Router();

router.get("/Rats/api/posts", getPosts);

router.get("/Rats/api/posts/:id", getSinglePost);

router.put("/Rats/api/posts/:id", addComment);

router.put("/Rats/api/react", reactUser, reactPost);

router.post("/Rats/api/auth/signup", createUser);

router.post("/Rats/api/auth/login", logInUser);

router.get('/Rats/api/auth/logout', logOutUser);

router.post('/Rats/api/auth/changepass', changePassword);

router.post('/Rats/api/auth/deleteacc', deleteAcc, logOutUser);

router.get("/Rats/api/auth/token", verifyJWT, authCheck);

router.put("/Rats/api/settings/changenamedisplay", changeNameDisplay);

router.put("/Rats/api/settings/changedarkmode", changeDarkMode);

//SET ALL THE COOKIES TO SECURE: TRUE (HTTPS CONNECTION)

export default router