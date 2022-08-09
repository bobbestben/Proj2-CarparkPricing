// Initialization Instructions
// npm init -y
// npm i express
// npm install nodemon (globally installed)
// npm i body-parser
// npm i method-override
// npm i ejs
// npm i mongoose
// npm i joi - for validation
// npm i bcrypt - for hasing passwords
// npm i express-session - for creating a session
// npm install dotenv --save

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = 3000;

//Connection to DB
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.imxw3.mongodb.net/?retryWrites=true&w=majority`;

//Set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Apply middlewares
const productController = require('./controllers/product_controller')
const userController = require('./controllers/users_controllers')
const dataController = require('./controllers/data_controller')

// Product Routes - list, show, create, edit, delete
app.get("/", productController.listCarparks) // ok for now
app.get('/:carpark_id', productController.getCarpark)
app.get('/carparks/:carpark_id:/edit', productController.showEditCarparkForm)
app.post('/:carpark_id', productController.editCarpark)
app.post('/products', productController.createCarpark)
app.delete('/:carpark_id', productController.deleteCarpark)

// Users Routes - show, login, logout, create
app.get('/users/:user_id', userController.showUser)
app.get('/users/register', userController.showRegistrationForm)
app.post('/users/register', userController.register)
app.get('/users/login', userController.showLoginForm)
app.post('/users/login', userController.login)
app.post('/users/logout', userController.logout)

// Seed Route - Visit ONCE to populate database
app.get('/seed/carparkdata', dataController.alternateSeedData)

//These routes with authentication, can create a router - Refer to Kiong's
// app.get('/users/dashboard', autMiddleware.isAuthenticated, userController.showDashboard)
// app.get('/users/profile', autMiddleware.isAuthenticated, userController.showProfile)

//Rating Routes
// app.post('/products/:product_id/ratings', productRatingController.createRatings)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: "carpark_pricing" });
    } catch (err) {
        console.log("Failed to connect to DB");
        process.exit(1); //so that we wont run the application
    }

    console.log(`Example app listening on port ${port}`);
});