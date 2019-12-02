//
// Appends account into the DOM
//
export const loadAccountIntoDOM = function()
{
<<<<<<< HEAD
    let account = localStorage.getItem("account");
    console.log(JSON.parse(account));
=======
    let account = JSON.parse(localStorage.getItem("account"));
    
    $("#profile").text(account.first + " " + account.last);
    $("#pemail").text(account.email);
    $("#numOfReviews").text(account.postCount);
>>>>>>> ec1ef8a77a10b34b63fa22ad954ea603d1bcaf07
};

//
// Main function to be executed upon page loading
//
$(async function()
{
<<<<<<< HEAD
    if (localStorage.getItem("loggedIn"))
    {
        loadAccountIntoDOM();
    }
=======
    if (localStorage.getItem("loggedIn").toString() == "true")
    {
        loadAccountIntoDOM();
    }

    else
    {
        alert("Not logged in!")
    }
>>>>>>> ec1ef8a77a10b34b63fa22ad954ea603d1bcaf07
});