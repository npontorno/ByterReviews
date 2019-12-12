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

    if (JSON.parse(localStorage.getItem("account")).isOwner.toString() == "false")
    {
        alert("Only verified restaurant owners can add restaurants.");
        window.location.href = "http://localhost:3000/";
    }

    $(document).on("click", ".signupbtn", function()
    {
        let loggedIn = localStorage.getItem("loggedIn").toString();

        if (loggedIn == "false")
        {
            alert("You must be logged in to do that.");
            return;
        }

        handlePostButtonPress();
    })
});