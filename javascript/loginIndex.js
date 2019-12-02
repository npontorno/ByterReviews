//
// Appends account into the DOM
//
export const loadAccountIntoDOM = function()
{
    let account = JSON.parse(localStorage.getItem("account"));
    
    $("#profile").text(account.first + " " + account.last);
    $("#pemail").text(account.email);
    $("#numOfReviews").text(account.postCount);
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    if (localStorage.getItem("loggedIn").toString() == "false")
    {
        alert("Not logged in!");
        window.location.href = "http://localhost:3000/";
    }
});