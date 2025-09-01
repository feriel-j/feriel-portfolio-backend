import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cors from "cors"
import bodyParser from "body-parser";
import contactRouter from "./entities/contact/contactRoutes"


const app = express();
dotenv.config();

app.use(express.json());

app.use(bodyParser.json())
//------------- google auth config --------------------
app.use(
  cookieSession({
    name: "session",
    keys: ["KWK"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use(cors({
  origin: ["http://localhost:3000", "https://feriel.netlify.app"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
}));



// Simple route
app.get('/', (_req, res) => {
  res.send('🚀 Hello from TypeScript + Express!');
});

//------------- Contact --------------------
app.use("/api",contactRouter)




app.listen(process.env.APP_PORT || 5000, () => {
  console.log("server is running on " + process.env.APP_PORT || 5000);
});

