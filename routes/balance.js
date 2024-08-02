const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const router = express.Router();

// Get balance sheet
router.get("/", auth, async (req, res) => {
	const userId = req.user.id;
	try {
		const expenses = await Expense.find({ "sharedWith.user": userId });
		const paidExpenses = await Expense.find({ paidBy: userId });

		let balance = 0;
		expenses.forEach((expense) => {
			const userShare = expense.sharedWith.find(
				(share) => String(share.user) === userId
			);
			balance += userShare.amount;
		});

		paidExpenses.forEach((expense) => {
			balance -= expense.amount;
		});

		res.json({ balance });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Download balance sheet
router.get("/download", auth, async (req, res) => {
	const userId = req.user.id;
	try {
		const expenses = await Expense.find({ "sharedWith.user": userId });
		const paidExpenses = await Expense.find({ paidBy: userId });

		const doc = new PDFDocument();
		doc.pipe(fs.createWriteStream("balance_sheet.pdf"));

		doc.fontSize(18).text("Balance Sheet", { align: "center" });

		expenses.forEach((expense) => {
			const userShare = expense.sharedWith.find(
				(share) => String(share.user) === userId
			);
			doc
				.fontSize(12)
				.text(`Expense: ${expense.description}, Amount: ${userShare.amount}`);
		});

		paidExpenses.forEach((expense) => {
			doc
				.fontSize(12)
				.text(
					`Paid Expense: ${expense.description}, Amount: ${expense.amount}`
				);
		});

		doc.end();
		res.download("balance_sheet.pdf");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
