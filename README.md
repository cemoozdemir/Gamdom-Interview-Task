# Betting Slip API

## Overview

This is a Betting Slip API built with Node.js, TypeScript, and PostgreSQL. The API allows users to register, log in, and perform CRUD operations only on their betting slips.

## Technologies Used

- Node.js
- TypeScript
- Express
- PostgreSQL
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js
- PostgreSQL
- Yarn

## Setup Instructions

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd Gamdom Interview Task
    ```

2. **Install dependencies:**

    ```sh
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    DB_USER=your_db_username
    DB_HOST=your_db_host
    DB_DATABASE=betting
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    JWT_SECRET=your_jwt_secret_key(You can add random characters here only on testing environment.)
    ```

4. **Set up PostgreSQL database:**

    Connect to your PostgreSQL database and create the necessary tables:

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE betting_slips (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        amount DECIMAL NOT NULL,
        winning_team_id INT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```

5. **Run database migrations:**

    ```sh
    yarn migrate
    ```

6. **Start the server:**

    ```sh
    yarn dev
    ```

7. **Test the API endpoints:**

    Use Postman to test the API endpoints. Import the provided Postman collection to get started.

## API Endpoints

### Authentication

- **Register:** `POST /api/users/register`
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

- **Login:** `POST /api/users/login`
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

### Betting Slips

- **Create Betting Slip:** `POST /api/betting-slips`
  - Request Header:
    ```json
    {
      "Authorization": "Bearer <your_token>"
    }
    ```
  - Request Body:
    ```json
    {
      "event_id": 101,
      "amount": 50,
      "winning_team_id": 500
    }
    ```

- **Get Betting Slip:** `GET /api/betting-slips/:id`
  - Request Header:
    ```json
    {
      "Authorization": "Bearer <your_token>"
    }
    ```

- **Update Betting Slip:** `PUT /api/betting-slips/:id`
  - Request Header:
    ```json
    {
      "Authorization": "Bearer <your_token>"
    }
    ```
  - Request Body:
    ```json
    {
      "amount": 100
    }
    ```

- **Delete Betting Slip:** `DELETE /api/betting-slips/:id`
  - Request Header:
    ```json
    {
      "Authorization": "Bearer <your_token>"
    }
    ```

- **List Betting Slips:** `GET /api/betting-slips`
  - Request Header:
    ```json
    {
      "Authorization": "Bearer <your_token>"
    }
    ```