// npm start
const express = require('express');
const cors = require("cors");
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(cors({
  // origin: 'http://localhost:5173', // Allow requests from this origin
  origin: 'https://msa-frontend-git-master-anubhav-anands-projects.vercel.app',
  // https://msa-frontend-git-master-anubhav-anands-projects.vercel.app/
  // https://msa-two.vercel.app/
  methods: 'GET,POST',              // Allow only GET and POST requests
  allowedHeaders: 'Content-Type',   // Allow only specified headers
}));

app.post('/api/text', async (req, res) => {
  try {
    const { text } = req.body;
    console.log('received text from frontend with value:', text);
    // Send text to Flask microservice
    const response = await axios.post('http://localhost:5000/process', { text });

    console.log('sending response to frontend:', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
