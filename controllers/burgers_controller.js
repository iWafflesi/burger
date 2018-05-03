var burger = require('../models/burger.js');
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
	burger.selectAll(function (data) {
		var burgerObj = {
			burgers: data
		};
		res.render("index", burgerObj);
	});
});

router.post("/burgers/create", function (req, res) {
	burger.insertOne(["burger_name"], [req.body.burger_name], function () {
		res.redirect("/burgers");
	});
});

router.put("/burgers/:id", function (req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function () {
		res.redirect("/burgers");
	});
});


module.exports = router;