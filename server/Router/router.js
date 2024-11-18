import { L, R, UserDetails, UserReference, about } from "../Controllers/controllers.js";
import express from "express";
const route = express.Router();

route.get("/", about);
route.post("/Register", R);
route.post("/Login", L);
route.route("/:id").post(UserReference);  // Ensure this matches with the URL pattern
route.get("/:id/details", UserDetails); 

export default route;
