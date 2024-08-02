const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Add an expense
router.post("/", auth, async (req, res) => {
	const { amount, description, date, splitMethod, sharedWith } = req.body;
	const userId = req.user.id;

	if (splitMethod === "percentage") {
		const totalPercentage = sharedWith.reduce(
			(acc, share) => acc + share.percentage,
			0
		);
		if (totalPercentage !== 100) {
			return res
				.status(400)
				.json({ message: "Total percentage must equal 100%" });
		}
	}

	try {
		const expense = new Expense({
			amount,
			description,
			date,
			paidBy: userId,
			splitMethod,
			sharedWith,
		});
		await expense.save();
		res.status(201).json(expense);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Retrieve individual user expenses
router.get("/user/:userId", auth, async (req, res) => {
	try {
		const expenses = await Expense.find({
			"sharedWith.user": req.params.userId,
		});
		res.json(expenses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Retrieve overall expenses
router.get("/", auth, async (req, res) => {
	try {
		const expenses = await Expense.find();
		res.json(expenses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
