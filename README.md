# Mooody Backend 

This is the backend for Mooody, a todo list web app that features sentiment analysis and crit assignation. The backend is built using Node.js with Express, and uses MongoDB for persistent storage, Redis for caching, and JWT for authentication.

## Installation

Clone the repository and install dependencies:

    git clone https://github.com/Araon/mooody.git
    cd mooody/backend
    npm install


### Set up environment variables:
 - Create a config.env file in the config folder.
 - Add the following environment variables:
 - NODE_ENV: set to "development" or "production".
 - PORT: set to the desired port number (default is 3000).
 - MONGO_URI: set to the MongoDB connection string.

### Run the server:
    npm run start

## API Endpoints

The following API endpoints are available:

**Register and Login:**

    POST /api/auth/register
    
    POST /api/auth/login

    POST /api/auth/logout


**Todo**:

    GET /api/todos (to retrieve all todos)
    
    POST /api/todos (to create a new todo)
    
    GET /api/todos/:id (to retrieve a specific todo)
    
    PUT /api/todos/:id (to update a specific todo)
    
    DELETE /api/todos/:id (to delete a specific todo)

  

**User**:

    GET /api/users (to retrieve all users)
    
    GET /api/users/:id (to retrieve a specific user)

  

**Analytics**:

    GET /api/analytics (to retrieve all analytics data)

  

## Database Models

The following database models are used:

User:

    name (String, required)
    email (String, required, unique)
    password (String, required)
    createdAt (Date, default: Date.now())

  
  

**Todo:**

    name (String, required)
    desc (Object, required)
    taskBy (String, required)
    deadline (Date, required)
    mood (Number, required)
    crit (Number, required)
    metadata (Object, optional)
    createdAt (Date, default: Date.now())
    updatedAt (Date, default: Date.now())
    updatedBy (String, optional)

