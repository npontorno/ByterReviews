//
// Axios Functions
//
export async function postAccount(account)
{
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3002/accounts',
        headers: {'Content-Type': 'application/json'},
        data: account
    })

    return;
};

export async function getEmails()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/emails',
    })

    return result.data;
};

export async function getAccounts()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/accounts',
    })

    return result.data;
};

export async function getRestaurants()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/restaurants',
    })

    return result.data;
};

//
// Button Press Handlers
//
export const createAccount = async function()
{
    let account = {};
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let email = $('#emailS').val();
    let pass1 = $('#pswS').val();
    let pass2 = $('#rpswS').val();
    let id = parseInt(111 + "" + Date.now());

    /*let emails = getEmails();

    if (emails.includes(email))
    {
        console.log("Email address already exists.");
        return;
    }*/

    if ((fname == "") || (lname == "") || (email == "") || (pass1 == "") || (pass2 == ""))
    {
        alert("You must fill out the entire form.");
        return;
    }

    if ((!email.includes("@")) || (!email.includes(".")))
    {
        alert("Make sure your email is formatted correctly.");
        return;
    }

    if (pass1.length < 6)
    {
        alert("Passwords must have a length of atleast 6 characters.");
        return;
    }

    if (pass1 != pass2)
    {
        alert("Passwords do not match.");
        return;
    }
    
    account = 
    {
        id: id,
        first: fname,
        last: lname,
        email: email,
        password: pass1,
        isOwner: false,
        postCount: 0,
        posts: []
    };

    postAccount(account);
    alert("Account successfully created.");
    return;
};

export const login1 = async function()
{
    let email = $('#emailL').val();
    let pass = $('#pswL').val();

    await getAccounts().then(accounts => login2(accounts, email, pass));
    return;
};

export const login2 = async function(accounts, email, pass)
{
    let loggedIn = false;
    let account = JSON.stringify({});

    for (let i = 0; i < accounts.length; i++)
    {
        if ((accounts[i].email == email) && (accounts[i].password == pass))
        {
            loggedIn = true;
            account = JSON.stringify(accounts[i]);
        }
    }

    if (loggedIn)
    {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("account", account);
        window.location.href = "http://localhost:3000//html/loginindex.html";
        alert("Successfully logged in!");
        return;
    }

    else
    {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("account", JSON.stringify({}));
        alert("Login failed");
        return;
    }
};

export const search1 = async function()
{
    await getRestaurants().then(restaurants => search2(restaurants));
    return;
}

export const search2 = async function(restaurants)
{
    let matchingRestaurants = [];
    let searchTerm = $('.searchTerm').val();

    restaurants.forEach(restaurant =>
    {
        if (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            matchingRestaurants.push(restaurant); 
        }
    });

    matchingRestaurants.forEach(restaurant =>
    {
        //console.log(restaurant.name);
    })

    localStorage.setItem("matchingRestaurants", JSON.stringify(matchingRestaurants)); 
    return;
}

//
// Template for loading each matching restaurant
//
export const renderMatchingRestaurant = function(restaurant)
{
    let format = `<option value="${restaurant.name}" class="${restaurant.name}" id="${restaurant.id}">`

    return format;
};

//
// Appends matching restaurants into the DOM
//
export const loadMatchingRestaurantsIntoDOM = async function(matchingRestaurants)
{
    const $root = $("#browsers");
    let html = "";

    matchingRestaurants.forEach(restaurant =>
    {
        html += renderMatchingRestaurant(restaurant);
    })

    $root.html(html);
    return;
}

//
// Main function to be executed upon page loading
//
$(async function()
{
    if (localStorage.getItem("loggedIn").toString() == "true")
    {
        window.location.href = "http://localhost:3000/html/loginindex.html";
    }

    $(document).on("click", "#id01 .signupbtn", function()
    {
        createAccount();
    })

    $(document).on("click", "#id02 .signupbtn", function()
    {
        login1();
    })

    $(document).on("keypress", ".searchTerm", function()
    {
        search1();
        let matchingRestaurants = JSON.parse(localStorage.getItem("matchingRestaurants"));
        loadMatchingRestaurantsIntoDOM(matchingRestaurants);
    })
});