import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

const app = express();

// Route imports 
import authRoutes from './route/auth.route.js';

//middlewares will be added here

app.use(cors()); // Enable CORS for all requests

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


//All routes will be defined here
app.use("/api/auth", authRoutes);
app.use('/',(req,res)=>{
    res.send('Server is running on port 5000! :)');
})

export {app}