import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
import db from './config/db.js';
import schoolValidation from './validation.js';
import listSchoolValidation from './listSchoolValidation.js';
import { validationResult } from 'express-validator';

const port = process.env.PORT || 8000;

app.use(express.json());

//post route to create new school
app.post("/addSchool", schoolValidation, async (req, res) => {

    //check if validation gives any error
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()   
            });
        }
    
    const { name, address, latitude, longitude } = req.body;
    try {

        //check if school name is already exist
        const [existingSchool] = await db.execute(
            `SELECT id FROM school WHERE LOWER(name) = LOWER(?) AND LOWER(address) = LOWER(?)`,
            [name, address]
        );

        if(existingSchool.length > 0){
            return res.status(409).json({
                success: false,
                message: "School already exists"
            });
        }

        // create new School
        const [newSchool] = await db.execute(
            `INSERT INTO school (name, address, latitude, longitude) 
             VALUE (?, ?, ?, ?)`,
            [name, address, latitude, longitude]
        );
        res.status(200).json({
            success: true,
            message: newSchool,
            insertedId: newSchool.insertedId
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

app.get("/listSchool", async (req, res) => {

    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    const { latitude, longitude } = req.query;

    try {
        const [rows] = await db.execute(`
            SELECT *,
                SQRT(
                    POW(latitude - ?,2)+
                    POW(longitude- ?,2)
                    ) AS distance
                FROM school
                ORDER BY distance ASC;
            `, [latitude, longitude]);
        
        res.status(200).json({
            success: true,
            data: rows,
            message: "successfully fetched all data sorted based on proximity to the user's location"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running successfully ",
    endpoints: {
      addSchool: "/addSchool",
      listSchools: "/listSchools"
    }
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})