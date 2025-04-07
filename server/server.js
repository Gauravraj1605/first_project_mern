import connectDB from './db/config.js';
import color from 'colors';
import { app } from './app.js';


const PORT = process.env.PORT || 3000;


// Connect to the database before starting the server
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`.yellow.underline);
    });
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});
