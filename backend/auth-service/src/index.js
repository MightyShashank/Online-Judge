import express from 'express'; // type module, require() would be commonjs
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js'; // whenever importing local file in BE folder do this .js (since type="module")
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser'; // cookie parser lets you extract cookie from your browser (useful when extracting our jwt token)

dotenv.config(); // this is imp else your file cant read the .env variables 
const app = express();
const PORT = process.env.PORT || 5000;

// .use is for middleware functions
// app.use([path], middleware) mounts middleware on this path
app.use(express.json()); // this allows one to parse incoming requests: req.body
app.use(cookieParser()); // to extract our jwt token, this allows us to parse incoming cookies

/*
It parses incoming application/json request bodies (i.e., raw JSON sent from client).
After parsing, it attaches the resulting object to req.body.

app.post('/api/users', (req, res) => {
  console.log(req.body); // { name: "Shashank", age: 21 }
  res.send('User received');
});

*/
app.use('/api/auth', authRoutes);



// Global error handler for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  // Other errors
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
    connectDB();
    console.log("Connected to DB");
    console.log("BE server is running on port 5000");
});