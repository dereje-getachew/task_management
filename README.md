# task_management

2. Install Dependencies
Install all project dependencies using npm:

bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the project root and add the following environment variables:

plaintext
Copy code
PORT=5000                   # Server port
MONGO_URI=mongodb://localhost:27017/yourDatabaseName  # MongoDB URI
JWT_SECRET=your_jwt_secret   # Secret key for JWT token signing
Replace yourDatabaseName with your MongoDB database name.
Replace your_jwt_secret with a strong, unique secret for JWT signing.
4. Start the Server
Start the server by running:

bash
Copy code
npm start
The server should be running on http://localhost:5000.

API Endpoints
Method	Endpoint	Description	Authentication
POST	/api/register	Register a new user	No
POST	/api/login	User login to get a JWT token	No
POST	/api/tasks	Create a new task	Yes
GET	/api/tasks	Get all tasks for logged-in user with pagination, sorting, and filtering	Yes
PUT	/api/tasks/:id	Update a task by ID	Yes
DELETE	/api/tasks/:id	Delete a task by ID	Yes
Example Requests
User Registration:

http
Copy code
POST /api/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
User Login:

http
Copy code
POST /api/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
This will return a JWT token, which is required for accessing task-related routes.
Create Task (with authentication token):

http
Copy code
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <your_token_here>

{
    "title": "Finish project",
    "description": "Complete the task management API project",
    "dueDate": "2024-12-01T00:00:00.000Z",
    "status": false
}
Testing with Postman
Import the provided Postman collection in the project for testing.
Set the Authorization header with Bearer <your_token_here> for task-related requests.
Running Tests
To run the test cases, if you have them set up, you can use:

bash
Copy code
npm test
Project Structure
plaintext
Copy code
├── controllers/            # Controller logic for users and tasks
├── middleware/             # JWT authentication middleware
├── models/                 # Mongoose models for User and Task
├── routes/                 # API routes
├── db.js                   # MongoDB connection file
├── index.js                # Main entry point of the application
├── .env                    # Environment variables
└── README.md               # Documentation