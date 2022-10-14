// Require packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");

// Create App
const app = express();

// App settings
app.use(express.json()); // App reads JSON
app.use(cors()); // App enables CORS
dotenv.config(); // Reads .env file
app.use(passport.initialize()); // App uses passport


// JSON web token modules
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// JSON web token options
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwt_secret
}

// JSON web token strategy
const strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next){
    const user = await User.findOne({_id: jwt_payload._id});
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

// Passport settings
passport.use(strategy); // Passport use strategy

// App port
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

// Connect to mongodb database
const url = "mongodb://localhost:27017/web2022";
mongoose.connect(url).catch(error => console.log(error));

// Require Schemas
const TD = require("./schemas/td.js");
const User = require("./schemas/user.js");

// User sign up
app.post("/auth/signup", async (req,res) => {
    const user = new User ({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });

    user.save((err, savedData) => {
        if (err) {
            console.log(err)
            res.status(500).send("Something went wrong!");   
        } else {
            console.log(savedData)
            res.status(201).json(savedData);
        }
    });
});

// User login
app.post("/auth/login", (req, res) => {
    User.find({$or: [{userName: req.body.userName},{email: req.body.email}]}, async (err, foundData) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        } else {
            if (foundData.length == 0) {
                let responseObject = undefined;
                console.log(responseObject);
                res.status(404).json(responseObject);
            } else {
                // Decrypt password and validate
                const isValid = await bcrypt.compare(req.body.password, foundData[0].password);
                if (isValid) {
                    const token = jwt.sign({_id: foundData[0]._id}, process.env.jwt_secret);
                    console.log({user: foundData[0], token: "Bearer " + token})
                    res.status(200).json({user: foundData[0], token: "Bearer " +  token});
                } else {
                    res.status(401).json("Login failed!");
                }
            }
        }
    });
});

// Create new document
app.post("/travel-destination", (req,res) => {
    const tD = new TD ({
        title: req.body.title,
        description: req.body.description,
        dateFrom: new Date(req.body.dateFrom),
        dateTo: new Date(req.body.dateTo),
        country: req.body.country,
        location: req.body.location,
        latitude: Number(req.body.latitude),
        longitude: Number(req.body.longitude)
    });

    tD.save((err, savedData) => {
        if (err) {
            console.log(err)
            res.status(500).send("Something went wrong!");   
        } else {
            console.log(savedData)
            res.status(201).json(savedData);
        }
    });
});

// Get all documents
app.get("/travel-destination", (req,res) => {
    TD.find({}, (err, foundData) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        } else {
            if (foundData.length == 0) {
                let responseObject = undefined;
                console.log(responseObject);
                res.status(404).json(responseObject);
            } else {
                let responseObject = foundData;
                console.log(responseObject);
                res.status(200).json(responseObject);
            }
        }
    }); 
});

// Get specific document by id
app.get("/travel-destination/:tDId", (req,res) => {
    TD.findOne({_id: req.params.tDId}, (err, foundData) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        } else {
            if (foundData.length == 0) {
                let responseObject = undefined;
                console.log(responseObject);
                res.status(404).json(responseObject);
            } else {
                let responseObject = foundData;
                console.log(responseObject);
                res.status(200).json(responseObject);
            }
        }
    }); 
});

// Update document
app.put('/travel-destination/:tDId', (req, res) => {
    TD.findOne({_id: req.params.tDId}, (err, foundObject) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        } else {
            if (!foundObject) {
                let responseObject = undefined;
                console.log(responseObject);
                res.status(404).json(responseObject);
            } else {
                let responseObject = foundObject;

                // Replace values with new values
                responseObject.title = req.body.title;
                responseObject.description = req.body.description;
                responseObject.dateFrom = req.body.dateFrom;
                responseObject.dateTo = req.body.dateTo;
                responseObject.country = req.body.country;
                responseObject.location = req.body.location;
                responseObject.latitude = req.body.latitude;
                responseObject.longitude = req.body.longitude;

                responseObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send("Something went wrong!");   
                    } else {
                        console.log(updatedObject)
                        res.status(201).json(updatedObject);
                    }
                });
            }
        }
    });
});

// Delete document
app.delete("/travel-destination/:tDId", passport.authenticate("jwt", {session: false}), (req,res) => {
    TD.findOneAndRemove({_id: req.params.tDId}, (err) => {
        if (err) {
            console.log(err)
            res.status(500).send("Something went wrong!");
        } else {
            console.log("Document is deleted")
            res.status(200).send("Document is deleted");
        }
    }); 
});