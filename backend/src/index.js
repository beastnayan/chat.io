import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


import connectDb from "./db/index.js";
import server from "./app.js";

import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});


connectDb()
.then(() => {
    console.log("Database connected successfully");
    // Start the server on port 3000
    server.listen( 3000, () => {
    console.log("Server is running on port 3000"); 
});


})
.catch((error) => {
    console.log("catch: ");
    console.log("Database connection error: ", error);
});    


