# CODTECH-Task2

NAME : PRIYANKA JAISWAL

COMPANY : CODTECH IT SOLUTIONS

ID : CT08DS3261

DOMAIN : BACKEND

DURATION : JUNE 25th,2024 to JULY 25th,2024

MENTOR : SRAVANI GOUNI

Overview of the Project:

Project : User Authentication System with Node.js and Express using bcrypt for password hashing and JWT for token-based authentication.

Key Components

config/db.js: MongoDB connection setup.
models/User.js: Mongoose schema and model for user data.
routes/auth.js: Routes for user registration and login.
routes/protected.js: Protected route accessible only with valid JWT.
app.js: Main application file to set up the server and middleware.

Functionality Overview

User Registration
Endpoint: /register
Method: POST
Request Body: { "username": "your_username", "password": "your_password" }
Response: Success or error message indicating the result of the registration attempt.
User Login
Endpoint: /login
Method: POST
Request Body: { "username": "your_username", "password": "your_password" }
Response: JWT token if authentication is successful, or an error message if it fails.
Protected Route
Endpoint: /protected
Method: GET
Headers: Authorization: Bearer <your_jwt_token>
Response: Data accessible only to authenticated users, or an error message if authentication fails.

![Screenshot 2024-07-25 152408](https://github.com/user-attachments/assets/a43f338b-b5b9-4390-b7d5-75035b419e01)


