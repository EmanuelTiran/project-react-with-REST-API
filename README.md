
----

# React Application with JSONPlaceholder API

This React application is designed to work with data from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) through a REST API. The application includes authentication, a user homepage, a todos page with add/delete, search, and sort functionality, a posts page displaying the active user's posts, and an albums page showing album titles and associated photos.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/EmanuelTiran/project-react-with-REST-API.git
```

2. Run the JSON server by executing the following command in the project directory:

```bash
json-server --watch db.json --port 3500
```

This will start the server on port 3500 and serve the data from the `db.json` file.

3. Install dependencies:

```bash
npm install
```

4. Run the React application:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Pages

### 1. Login Page

- In order to connect you must be an authorized user
The authorized user must enter his details as follows
  - Username field according to the username
  - password according to the websit field (specified in the db.json file).

### 2. Home Page

- Access the user's home page at `/home`.
- Authorized users can view personalized content.

### 3. Todos Page

- Access the todos page at `/todos`.
- Features include:
  - Add new todos
  - Delete todos
  - Search todos
  - Sort todos

### 4. Posts Page

- Access the posts page at `/posts`.
- Displays a list of posts belonging to the active user.

### 5. Albums Page

- Access the albums page at `/albums`.
- Displays album titles and associated photos.

## Note

Make sure to run the JSON server on port 3500 as specified to properly fetch data from the API.


---
# created by emanuel tiran & itzhak shif


