import { body } from 'express-validator';

const schoolValidation = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3}).withMessage("Name must be at least 3 characters"),

    body("address")
        .notEmpty().withMessage("Address is required"),
    
    body("latitude")
        .notEmpty().withMessage("Latitude is required")
        .isFloat({ min: -90, max: 90 }).withMessage("Latitude must be between -90 and 90"),

    body("longitude")
        .notEmpty().withMessage("Longitude is required")
        .isFloat({ min: -180, max: 180 }).withMessage("Longitude must be between -180 and 180"),
    
];

export default schoolValidation;