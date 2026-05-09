import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.post("/addSchool", (req, res) => {
    res.send("new school data is added");
})

app.get("/listSchool", (req, res) => {
    res.send("fetch schools from database");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})