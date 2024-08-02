const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const balanceRoutes = require("./routes/balance");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/expense-sharing", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/balance", balanceRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
