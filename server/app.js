import express from "express"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

const app = express();

// Route imports 
import authRoutes from './route/auth.route.js';

//middlewares will be added here
// const allowedOrigin = process.env.CLIENT_URL;

const allowedOrigins = ['https://oul-corporation-main.onrender.com'];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable sending cookies and credentials if needed
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


//All routes will be defined here
app.use("/api/auth", authRoutes);
app.use('/',(req,res)=>{
    res.send('Server is running on port 5000! :)');
})

export {app}
