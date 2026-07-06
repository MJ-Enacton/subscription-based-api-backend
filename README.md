# Subscription-Based API

A production-ready REST API built with **Node.js**, **Express.js**, and **MongoDB**, featuring authentication, authorization, subscription management, and rate limiting.

---

## Features

* User Registration & Login
* JWT Authentication
* Role-Based Authorization
* Subscription Plans
* Protected Premium Endpoints
* Rate Limiting
* Secure Password Hashing with bcrypt
* MongoDB Database Integration
* Environment-Based Configuration
* Centralized Error Handling
* RESTful API Design

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Cookie Parser
* Express Rate Limit

---

## Project Structure

```text
src/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── app.js
└── server.js
```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd <folder-name>
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
---

## Authentication

### Registration

```http
POST /api/auth/register
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Authenticates a user and grants access to protected resources.

### Logout

```http
POST /api/auth/logout
```

Ends the authenticated user's session.

---

## Subscription System

The API supports multiple subscription tiers.

### Example Plans

| Plan       | Daily Requests |
| ---------- | -------------- |
| Free       | 10             |
| Pro        | 100            |
| Enterprise | 1000           |

Users can access endpoints based on their active subscription.

### Protected Premium Endpoint

```http
GET /api/data
```

Requires:

* Valid JWT
* Active Subscription

---

## Rate Limiting

Rate limiting is enabled to protect the API from abuse and excessive requests.

Example:

```text
100 requests per 15 minutes
```

The limits can be configured through middleware based on application requirements.

---

## Error Handling

Consistent API response format.

### Error Response

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Security Measures

* Password Hashing
* JWT Authentication
* Rate Limiting
* Input Validation
* Secure Environment Variables
* Centralized Error Handling

---

## API Testing

The API can be tested using:

* Postman
* Thunder Client

---

## Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm start
```

Runs the production server.

## License

This project is licensed under the MIT License.

---

## Author

Mann Jariwala
Built with Node.js, Express.js, and MongoDB as a scalable subscription-based API solution.
