# Expense Sharing App

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/expense-sharing-app.git
   ```

2. Navigate to the project directory:

   ```sh
   cd expense-sharing-app
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Endpoints

- **Create User**: `POST /api/users/register`

  ```json
  {
  	"username": "exampleUser",
  	"password": "examplePass",
  	"email": "user@example.com",
  	"name": "John Doe",
  	"mobileNumber": "1234567890"
  }
  ```

- **Login User**: `POST /api/users/login`

  ```json
  {
  	"username": "exampleUser",
  	"password": "examplePass"
  }
  ```

- **Retrieve User Details**: `GET /api/users/:id`

### Expense Endpoints

- **Add Expense**: `POST /api/expenses`

  ```json
  {
  	"amount": 100,
  	"description": "Dinner",
  	"date": "2023-08-01",
  	"splitMethod": "equal", // or "exact" or "percentage"
  	"sharedWith": [
  		{ "user": "user1_id", "amount": 50 }, // for exact
  		{ "user": "user2_id", "percentage": 25 } // for percentage
  	]
  }
  ```

- **Retrieve Individual User Expenses**: `GET /api/expenses/user/:userId`
- **Retrieve Overall Expenses**: `GET /api/expenses`

### Balance Endpoints

- **Get Balance Sheet**: `GET /api/balance`
- **Download Balance Sheet**: `GET /api/balance/download`

## Data Validation

- **User Inputs**: Validate all required fields for user creation and login.
- **Expense Inputs**: Ensure that `amount`, `description`, `splitMethod`, and `sharedWith` fields are provided and valid.
  - For `splitMethod: percentage`, ensure the total percentage adds up to 100%.


