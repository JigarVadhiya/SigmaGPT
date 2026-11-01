import dns from "dns";
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dns.setServers(["8.8.8.8"]);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Db", err);
    }
}

// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "x-goog-api-key": `${process.env.GEMINI_API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "gemini-3.6-flash",
//             input: message,
//         })
//     };

//     try {
//         const response = await fetch(" https://generativelanguage.googleapis.com/v1beta/interactions", options);
//         const data = await response.json();
//         // console.log(data.steps[1].content[0].text);
//         res.send(data.steps[1].content[0].text);
//     } catch (err) {
//         console.log(err);
//     }
// });
