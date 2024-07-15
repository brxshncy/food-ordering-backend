import express from "express";
import { jwtCheck, jwtParser } from "./../middleware/auth";
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController";
import { validateMyUserRequest } from "../middleware/validation";

const myUserRoute = express.Router();

// Create User Route associated with User Controller
myUserRoute
  .route("/")
  .post(jwtCheck, createCurrentUser)
  .get(jwtCheck, jwtParser, getCurrentUser)
  .put(jwtCheck, jwtParser, validateMyUserRequest, updateCurrentUser);

export default myUserRoute;
