const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

//
// Read JSON Files
//
let accounts = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/accounts.json")));
let restaurants = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/restaurants.json")));

//
// Initialize Server And Related Packages
//
let app = express();
let server = app.listen(3002, console.log("The server is listening on port 3002."));
app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

//
// Handle Methods From Client
//
app.get("/accounts", getAccounts);
app.get("/restaurants", getRestaurants);
app.get("/emails", getEmails);
app.post("/accounts", postAccount);
app.post("/restaurants", postRestaurant);
app.post("/items", postItem);
app.post("/posts", postReview);
app.put("/accounts", updateAccount);
app.delete("/posts", deletePost);

//
// Handler Callback Functions
//
function getAccounts(request, response)
{
    response.send(accounts);
    return;
}

function getRestaurants(request, response)
{
    response.send(restaurants);
    return;
}

function getEmails(request, response)
{
    let emails = [];

    for (i in accounts)
    {
        emails.push(accounts[i].email);
    }

    response.send(emails);
    return;
}


function postAccount(request, response)
{
    let account = request.body;
    
    accounts.push(account);
    fs.writeFile(path.resolve(__dirname, "./data/accounts.json"), JSON.stringify(accounts, null, 2), () => {console.log("Wrote new account.")});
    return;
}

function postRestaurant(request, response)
{
    let restaurant = request.body;
    
    restaurants.push(restaurant);
    fs.writeFile(path.resolve(__dirname, "./data/restaurants.json"), JSON.stringify(restaurants, null, 2), () => {console.log("Wrote new restaurant.")});
    return;
}

function postItem(request, response)
{
    let item = request.body.item;
    let restaurantId = request.body.restaurantId;
    
    for (i in restaurants)
    {
        if (restaurants[i].id == restaurantId)
        {
            restaurants[i].items.push(item);
            fs.writeFile(path.resolve(__dirname, "./data/restaurants.json"), JSON.stringify(restaurants, null, 2), () => {console.log("Added menu item.")});
            return;
        }
    }
}

function postReview(request, response)
{
    let post = request.body.post;
    let accountId = request.body.accountId;
    
    for (i in accounts)
    {
        if (accounts[i].id == accountId)
        {
            accounts[i].posts.push(post);
            fs.writeFile(path.resolve(__dirname, "./data/accounts.json"), JSON.stringify(accounts, null, 2), () => {console.log("Posted new review.")});
            return;
        }
    }
}

function updateAccount(request, response)
{
    let account = request.body;

    for (i in accounts)
    {
        if (accounts[i].id == account.id)
        {
            accounts[i] = account;
            fs.writeFile(path.resolve(__dirname, "./data/accounts.json"), JSON.stringify(accounts, null, 2), () => {console.log("Updated account.")});
            return;
        }
    }

    return;
}

function deletePost(request, response)
{
    let postId = request.body[0];
    for (i in accounts)
    {
        for (j in accounts[i].posts)
        {
            if (accounts[i].posts[j].id == postId)
            {
                accounts[i].posts.splice(j, 1);
                fs.writeFile(path.resolve(__dirname, "./data/accounts.json"), JSON.stringify(accounts, null, 2), () => {console.log("Deleted a post.")});
                return;
            }
        }
    }
}