const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
	amount: { type: Number, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	splitMethod: {
		type: String,
		enum: ["equal", "exact", "percentage"],
		required: true,
	},
	sharedWith: [
		{
			user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			amount: { type: Number },
			percentage: { type: Number },
		},
	],
});

module.exports = mongoose.model("Expense", ExpenseSchema);
