# API Documentation

Welcome to the API Documentation for the Personal Blog project

<details>
<summary>Navigation</summary>

- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Security](#security)
- [Questions or Issues?](#questions-or-issues)
</details>

## Overview

the API provides endpoints for managing categories, posts, and comments. It allows users to interact with the data by performing CRUD (Create, Read, Update, Delete) operations.

## Base URL

_not yet implemented_

The base URL for accessing the API is `https://api.example.com`.

## Authentication

Authentication is required for certain endpoints. We use JSON Web Tokens (JWT) for authentication. To authenticate, include the JWT token in the `Authorization` header of your requests.

### Authentication Routes

- **POST /signup**: Create a new user account.
- **POST /login**: Authenticate and generate a JWT token.
- **POST /forgot-password**: Request to reset forgotten password.
- **PATCH /reset-password/:token**: Reset password using the token received after forgot password request.
- **PATCH /update-my-password**: Update Password For the current user

_After signing up or logging in, the API will provide a JWT token, which should be included in the `Authorization` header for subsequent requests._

<details>
<summary>Authentication Payloads</summary>

### 1. Signup

- **Route**: POST /signup
- **Description**: This route is used to create a new user account.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

### 2. Login

- **Route**: POST /login
- **Description**: This route is used to authenticate a user and generate a JWT token.

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Forgot Password

- **Route**: POST /forgot-password
- **Description**: This route is used to request to reset a forgotten password.

```json
{
  "email": "john@example.com"
}
```

### 4. Reset Password/:token

- **Route**: PATCH /reset-password/:token
- **Description**: This route is used to reset a password using the token received after forgot password request.

```json
{
  "password": "newpassword123",
  "passwordConfirm": "newpassword123"
}
```

### 5. Update My Password

- **Route**: PATCH /update-my-password
- **Description**: This route is used to update the password for the current user. It is a protected route, meaning the user has to be logged in to access it.

```json
{
  "passwordCurrent": "oldpassword123",
  "password": "newpassword123",
  "passwordConfirm": "newpassword123"
}
```

</details>

## Endpoints

### Categories

- **GET /categories**: Retrieve all categories.
- **POST /categories**: Create a new category.
- **GET /categories/:id**: Retrieve a specific category by ID.
- **PATCH /categories/:id**: Update a category.
- **DELETE /categories/:id**: Delete a category.

### Posts

- **GET /posts**: Retrieve all posts.
- **POST /posts**: Create a new post.
- **GET /posts/:id**: Retrieve a specific post by ID.
- **PATCH /posts/:id**: Update a post.
- **DELETE /posts/:id**: Delete a post.

### Comments

- **GET /comments**: Retrieve all comments.
- **POST /comments**: Create a new comment.
- **GET /comments/:id**: Retrieve a specific comment by ID.
- **PATCH /comments/:id**: Update a comment.
- **DELETE /comments/:id**: Delete a comment.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/abdulrahmanDev1/personal-blog.git
   ```

2. Navigate to the cloned repository directory:

   ```bash
   cd personal-blog
   ```

3. Create a `.env` file in the root directory of the project and fill it with your environment variables. You can use the provided `.env.example` file as a template:

   ```bash
   cp .env.example .env
   ```

   Fill in the necessary environment variables in the `.env` file.

4. Install the necessary dependencies:

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. The server will start running at `http://localhost:3000` by default.

## Usage

### Creating a Category

To create a new category, send a POST request to `/categories` with the following JSON payload:

```json
{
  "name": "Category Name"
}
```

### Creating a Post

To create a new post, send a POST request to `/posts` with the following JSON payload:

```json
{
  "title": "Post Title",
  "body": "Post Body",
  "category": "Category ID"
}
```

### Creating a Comment

To create a new comment, send a POST request to `/comments` with the following JSON payload:

```json
{
  "body": "Comment Body",
  "post": "Post ID"
}
```

## Error Handling

The API follows RESTful principles and returns appropriate HTTP status codes for each request. In case of errors, additional information will be provided in the response body.

## Security

### Rate Limiting

To prevent abuse and protect against DDoS attacks, the API implements rate limiting. Rate limiting restricts the number of requests a user can make within a certain time period.

We use the `express-rate-limit` middleware to implement rate limiting. The middleware is configured to allow a specified number of requests per minute. When the limit is exceeded, clients receive a `429 Too Many Requests` response.

### Protection Against NoSQL Injection

The API is protected against NoSQL injection attacks using `express-mongo-sanitize`. This middleware sanitizes user-supplied data to prevent MongoDB query injection attacks. It removes prohibited characters from input strings before they are passed to MongoDB queries.

## Questions or Issues?

If you have any questions or encounter any issues while using the API, please feel free to [raise an issue](https://github.com/abdulrahmanDev1/personal-blog/issues) in my GitHub repository.
