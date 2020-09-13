import { Router } from "express";
import { getPosts, getSinglePost, addComment, reactPost } from "../controllers/posts";
import { createUser, logInUser, logOutUser, changePassword, authCheck } from "../controllers/auth";
import { changeNameDisplay, changeDarkMode } from "../controllers/settings";

import { verifyJWT, deleteAcc } from "../middleware/authMiddleware";
import { reactUser } from "../middleware/postsMiddleware";

const router: Router = Router();

router.get("/api/posts", getPosts);

router.get("/api/posts/:id", getSinglePost);

router.put("/api/posts/:id", addComment);

router.put("/api/react", reactUser, reactPost);

router.post("/api/auth/signup", createUser);

router.post("/api/auth/login", logInUser);

router.get('/api/auth/logout', logOutUser);

router.post('/api/auth/changepass', changePassword);

router.post('/api/auth/deleteacc', deleteAcc, logOutUser);

router.get("/api/auth/token", verifyJWT, authCheck);

router.put("/api/settings/changenamedisplay", changeNameDisplay);

router.put("/api/settings/changedarkmode", changeDarkMode);

//SET ALL THE COOKIES TO SECURE: TRUE (HTTPS CONNECTION)

export default router