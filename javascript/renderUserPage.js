//
// Appends account into the DOM
//
export const loadAccountIntoDOM = function()
{
    let account = localStorage.getItem("account");
    console.log(JSON.parse(account));
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    if (localStorage.getItem("loggedIn"))
    {
        loadAccountIntoDOM();
    }
});