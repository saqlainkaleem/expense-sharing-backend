const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
	const { username, password, email, name, mobileNumber } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			password: hashedPassword,
			email,
			name,
			mobileNumber,
		});
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Login user
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Retrieve user details
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
