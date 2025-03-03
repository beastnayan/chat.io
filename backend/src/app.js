import express from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/user.routes.js";








const app = express();
const server = createServer(app);   

app.use(cors()); // Allow frontend requests

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());





app.get("/", (req, res) => {
    res.send("Server is running on port 3000");
});


app.use("/api/v1", otpRoutes);




export default server;
