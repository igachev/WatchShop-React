# WatchShop-React
React Single Page App. Online store for watches


## Link to WatchShop Website: https://watch-shop-react.onrender.com


## Link to WatchShop API: https://watch-shop-iwta.onrender.com/watches


## Test Accounts:
`Admin account login details` - email : `adminW@abv.bg` password : `1234`


`User account login details` - email : `test@abv.bg` password : `1234`


## How it works:
- `Admin` : The admin is able to add,edit,delete watches,see all purchases made in the website.In the <strong>All Purchases</strong> section he can see customer details which are required in order to send the products to the respective addresses.
- `logged in user` : The user is able to search watches, evaluate watches from 1-5,add watches to his cart,remove watches from his cart,buy watches,check his own purchase history
- `guest user` : He can only check watches and their rating,search watches,login,register

<strong>In this file I will provide documentation for back-end and front-end</strong>


# Back-end documentation for Watch Shop API

This is back-end application built with Node.js and Express.


### Requirements:
 - Node.js (v12 or later)
 - npm (v6 or later)
 - express
 - cors
 - mongoose
 - bcrypt
 - jsonwebtoken
 - nodemon
 - dotenv

### Configuration:
This application uses a `.env` file to store configuration variables. You can create a `.env` file
in the server directory of the project and add the following variables:

DATABASE_DEVELOPMENT = 

DATABASE_PRODUCTION =

JWT_SECRET =

ADMIN_EMAIL =   


<strong>Example values of each variable(Keep in mind these are just example values and you must add your own values):</strong>


DATABASE_DEVELOPMENT='mongodb://127.0.0.1:27017/watchShop' // local database


DATABASE_PRODUCTION=  // provide a link for MongoDB Atlas Database


JWT_SECRET=my-secret-123 // provide a secret for JsonWebToken


ADMIN_EMAIL=adminW@abv.bg // You must register in the website with the email you type here in order to be able to login as admin


### Installation:

1. Clone this repository: `git clone https://github.com/igachev/WatchShop-React.git`
2. Go to folder server: `cd server`
3. Install dependencies: `npm install`
4. Make sure you created <strong>.env</strong> file in server folder and populate it with correct variables.
5. Start the server: `npm start`


### Usage:

The server listens on port 5000 by default. Here are the endpoints:


- `POST /users/register` : Creates a new user
- `POST /users/login` : Sign in user with valid information
- `GET /users/logout` : Sign out logged in user
- `GET /users/isAdmin` : Check if user is admin or not
- `GET /users/:userId/cart` : Get all watches which the user added to his cart
- `DELETE /users/:userId/cart/:watchId` : Remove a watch from the user's cart
- `POST /users/:userId/cart/:watchId` : Buy a watch from the user's cart
- `GET /users/:userId/purchaseHistory` : Display all bought watches by the user
- `GET /users/purchaseHistory` : Display all bought watches from the website to the admin only
- `POST /watches/create` : Add new watch to the catalog
- `GET /watches` : Display all available watches for buying
- `GET /watches/search` : Get all available watches
- `POST /watches/search` : Display only watches by the searched brand
- `GET /watches/:watchId` : Get a specific watch by id
- `POST /watches/:watchId` : Add a specific watch to user's cart
- `DELETE /watches/:watchId` : Only the admin can delete a watch from his catalog
- `PUT /watches/:watchId` : Only the admin can edit watch details 
- `POST /watches/:watchId/rating` : Rate a specific watch by id with a rating value from 1 to 5
- `GET /watches/:watchId/rating` : Get the current rating of a specific watch


### Folder Structure:
- `models` : Contains the database models
- `controllers` : Used for creating the endpoints,handle requests and responses
- `services` : Handle database model operations
- `index.js` : Entry point of the application
