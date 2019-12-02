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
    if (localStorage.getItem("loggedIn").toString() == "true")
    {
        loadAccountIntoDOM();
    }

    else
    {
        alert("Not logged in!");
    }
});