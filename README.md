# NoSQL-Social-Network-API

## Description

This application is an API for a social network built with a NoSQL database (MongoDB) using Mongoose. It allows for managing large amounts of unstructured data efficiently. Users can share thoughts, react to friends' thoughts, and manage their friend list. The API supports typical CRUD operations for users, thoughts, and reactions.

## User Story

AS A social media startup,  
I WANT an API for my social network that uses a NoSQL database,  
SO THAT my website can handle large amounts of unstructured data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AlejnadroVill/challenge-18

   ```

2. Install Dependencies:
   npm install

3. Start the server:
   npm start

## Visual reference of project

The following video demonstrates the app's appearance: <https://drive.google.com/drive/folders/1hBt8znqaZ_FleU7TzOHt_TqQat6xe2w3?usp=sharing>

## Usage

Once the server is running, use Insomnia (or Postman) to interact with the following API endpoints.

### User Routes

- **GET** `/api/users`  
  Retrieves all users.

- **GET** `/api/users/:userId`  
  Retrieves a single user by its `_id`, along with populated thought and friend data.

- **POST** `/api/users`  
  Creates a new user.  
  Example:

  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

- **PUT** `/api/users/:userId`  
  Updates a user by its `_id`.
- **DELETE** `/api/users/:userId`  
  Deletes a user by its `_id` and removes the user's associated thoughts.
- **POST** `/api/users/:userId/friends/:friendId`  
  Adds a new friend to the user's friend list.
- **DELETE** `/api/users/:userId/friends/:friendId`  
  Removes a friend from the user's friend list.

### Thought Routes

- **GET** `/api/thoughts`  
  Retrieves all thoughts.

- **GET** `/api/thoughts/:thoughtId`  
  Retrieves a single thought by its `_id`.

- **POST** `/api/thoughts`  
  Creates a new thought and pushes the created thought's `_id` to the associated user's `thoughts` array.  
  Example:

  ```json
  {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```

- **PUT** `/api/thoughts/:thoughtId`  
  Updates a thought by its `_id`.

- **DELETE** `/api/thoughts/:thoughtId`  
  Deletes a thought by its `_id`.

### Reaction Routes

- **POST** `/api/thoughts/:thoughtId/reactions`  
  Creates a reaction stored in a single thought's `reactions` array.

- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`  
  Removes a reaction by its `reactionId` from the thought's `reactions` array.

## License

This project uses the MIT license.
