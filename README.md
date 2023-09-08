# Bookstore API

This is a Node.js application for managing a bookstore. It includes features like user authentication, managing books, and handling shopping carts and orders.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

git clone https://github.com/Anandhu09/BooksBackend.git

2. Install dependencies:

-cd BOOKSTORE BACKEND
-npm install

3. Set up environment variables:

- PORT=8082
- MONGODB_URI=<your_mongodb_connection_string>
- JWT_SECRET=<your_jwt_secret>
- JWT_ACCESS_EXPIRATION_MINUTES=<token_expiration_time_in_minutes>

### Usage

Start the application:

-npm start

The API will be available at `http://localhost:8082` ( Use the endpoints which is given below along with the API ;)

### Routes

- Authentication

* `POST /auth/register`: Register a new user.
* `POST /auth/login`: Log in an existing user.

### Books

- `GET /books`: Get all books.
- `GET /books/search`: Search books by title or author. (Request query is required)
  - Eg:- `/books/search?title=<title_of_the_book>`
  - Eg:- `/books/search?author=<author_of_the_book>`
- `POST /books`: Add a new book. ( Request body is required for Authentication)

  - Eg :- `json`
    {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "price": 12.99,
    "availability": true
    }

- `GET /books/search/:id`: Get a book by its ID. (Request params is required and it should be a valid mongo id)

### Cart

- `GET /cart`: Get all items in the cart. (Bearer Token Required for Authentication)
  **Input:**

  - Bearer Token (Authentication)

  **Output:**

  - JSON array of cart items.

- `POST /cart`: Add a book to the cart. (Bearer Token Required for Authentication)

  - Eg:-
    {
    "bookId":"64fb3749a954b5f9b1e5fa6d",  
    "quantity":15
    }
    **Input:**
  - Bearer Token (Authentication)
  - body with `bookId` and `quantity`

  **Output:**

  - JSON array of cart items.

- `PUT /cart`: Update a product in the cart. (Bearer Token Required for Authentication)

  - Eg:-
    {
    "bookId":"64fb3749a954b5f9b1e5fa6d",  
    "quantity":15
    }

- `PUT /cart/checkout`: Checkout the cart. (Bearer Token Required)

### Queries

- Feel free to contact at anandhu.vikraman007@gmail.com incase of any queries. Happy Coding!!! ANANDHU :)
