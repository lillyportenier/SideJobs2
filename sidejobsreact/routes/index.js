const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
var express = require('express');
var auth = require("../controllers/AuthControllers.js");

// API Routes
router.use("/api", apiRoutes);
console.log("into first index")

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});




module.exports = router;



