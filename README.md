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


# Front-end documentation:

This is Single Page application built with React,Redux,Axios.

## It has:
<h3>Web Responsive Design</h3>
<h3>CSS flexbox layout</h3>
<h3>Pagination managed by Redux</h3>
<h3>Loading Spinner managed by Redux and axios http interceptor</h3>
<h3>Authorization Bearer Token</h3>
<h3>Form Validations</h3>
<h3>Displays errors from back-end</h3>


### Folder structure:
`components` - it contains reusable React Components

`pages` - it contains React components that represent different pages or views

`services` - it contains the logic related to http requests,http interceptors

`store` - manages the state in React.It contains the following folders: `Actions`,`Reducers`,`Selectors`


### Requirements:
   - "@fortawesome/fontawesome-svg-core": "^6.4.2",
   - "@fortawesome/free-brands-svg-icons": "^6.4.2",
   - "@fortawesome/free-regular-svg-icons": "^6.4.2",
   - "@fortawesome/free-solid-svg-icons": "^6.4.2",
   - "@fortawesome/react-fontawesome": "^0.2.0",
   - "@testing-library/jest-dom": "^5.17.0",
   - "@testing-library/react": "^13.4.0",
   - "@testing-library/user-event": "^13.5.0",
   - "axios": "^1.6.1",
   - "react": "^18.2.0",
   - "react-dom": "^18.2.0",
   - "react-redux": "^8.1.3",
   - "react-router-dom": "^6.18.0",
   - "react-scripts": "5.0.1",
   - "redux": "^4.2.1",
   - "redux-thunk": "^2.4.2",
   - "reselect": "^4.1.8",
   - "web-vitals": "^2.1.4"


### Installation:
6. Make sure you completed the above mentioned backend installation
7. Go to folder client: `cd client`
8. Install dependancies: `npm install`
9. Start the application: `npm start`


### Tests:
To run tests: `npm run test`


### Routes:

Here are the available routes:


- `/` : homepage which redirects to `/watches`
- `/users/login` : display login page
- `/users/register` : display register page
- `/users/cart` : display user's cart page
- `/users/purchaseHistory` : display user's purchase history
- `/users/adminHistory` : display all bought products by users (only the owner of the shop can see this)
- `/watches` : display the watch catalog
- `/watches/create` : the owner can add new watch to his catalog
- `/watches/:watchId` : displays specific watch
- `/watches/:watchId/edit` : the owner can edit watch details
- `/watches/search` : Display only watches by the searched brand


### Images:

<p align="center">
Redux state chart

 ![18 reduxStateChart](https://github.com/igachev/WatchShop-React/assets/102420254/83bcc099-ccb8-4eba-a06b-22442a8bdede)

</p>

<p align="center">
 Watch Catalog

 ![01 watchesPage](https://github.com/igachev/WatchShop-React/assets/102420254/4e8f5224-39b6-4a41-8b5b-2a4be75e492e)

</p>

<p align="center">
 Guest Menu View

 ![02 guestMenu](https://github.com/igachev/WatchShop-React/assets/102420254/5cbc24db-df0c-4553-8eb3-b6e8453b39a8)

</p>

<p align="center">
 Logged In User Menu View

 ![03 loggedInUserMenu](https://github.com/igachev/WatchShop-React/assets/102420254/17118de7-28d8-4149-9892-17b8ef19b78f)

</p>

<p align="center">
 Admin User View

 ![04 adminMenu](https://github.com/igachev/WatchShop-React/assets/102420254/e47e8d22-c0ab-4fa1-8c3c-444b24767be6)

</p>

<p align="center">
 Login Validation

 ![05 loginValidation](https://github.com/igachev/WatchShop-React/assets/102420254/286b155d-dbef-48f1-9dec-9195128ac950)

</p>

<p align="center">
 Search Page

 ![06 search](https://github.com/igachev/WatchShop-React/assets/102420254/a11f7c95-a7fb-4c58-a6c8-6bf3fa482ec0)

</p>

<p align="center">
 Guest Watch Details View

 ![07 guestWatchDetails](https://github.com/igachev/WatchShop-React/assets/102420254/2a7c11b7-246c-4dde-af40-7fde0c034c92)

</p>

<p align="center">
 Logged In User Watch Details View

 ![08 loggedWatchDetails](https://github.com/igachev/WatchShop-React/assets/102420254/d2e7ed6d-aa9c-4983-ac1e-1dc48322eb64)

</p>

<p align="center">
 Admin User Watch Details View

 ![09 adminWatchDetails](https://github.com/igachev/WatchShop-React/assets/102420254/462cd21f-2852-4ef7-b66b-935097269acc)

</p>

<p align="center">
 Create Watch Page

 ![10 adminCreate](https://github.com/igachev/WatchShop-React/assets/102420254/666db4d3-c1dd-4940-be35-0839caac90fb)

</p>

<p align="center">
 Edit Watch Page

 ![11 adminEdit](https://github.com/igachev/WatchShop-React/assets/102420254/339a54bb-fa3a-4dc0-8889-fa9bdc9a2be2)

</p>

<p align="center">
 Admin View to All Purchases made by users and their details

 ![12 adminPurchases](https://github.com/igachev/WatchShop-React/assets/102420254/03e3d3c8-5568-4215-940a-228335d7e81d)

</p>

<p align="center">
 User View to his User Purchase History

 ![13 userPurchases](https://github.com/igachev/WatchShop-React/assets/102420254/ebe96b31-7074-442f-a9db-46647d085fcb)

</p>

<p align="center">
 User Cart View

 ![14 userCart](https://github.com/igachev/WatchShop-React/assets/102420254/1d579a0a-c67e-43ef-a95a-84de4d3a103f)

</p>

<p align="center">
 Logged in User can evaluate watch from 1-5

 ![15 userRate](https://github.com/igachev/WatchShop-React/assets/102420254/014f73e1-15be-4961-8651-b6b497eabb86)

</p>

<p align="center">
 Redux State Actions.

 ![16 reduxState](https://github.com/igachev/WatchShop-React/assets/102420254/cccdd6ba-4e80-4dee-8f75-16b2eb4fd5c6)

</p>

<p align="center">
 Loading Spinner

 ![17 loadingSpinner](https://github.com/igachev/WatchShop-React/assets/102420254/d9250b67-199e-47d5-9e79-f876c06895ea)

</p>


<p align="center">
 Unit Tests with Jest and React Testing Library

![19 test1](https://github.com/igachev/WatchShop-React/assets/102420254/753a4e6a-24ff-4897-9dc7-1efe2acf9df6)
![20 test2](https://github.com/igachev/WatchShop-React/assets/102420254/50d6e48b-1eb1-4645-a53c-a6a2cf6e7640)

</p>
