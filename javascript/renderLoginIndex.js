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

    $(document).on("click", ".main ul .loginb", function()
    {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("account", {});
        alert("User logged out!");
        window.location.href = "http://localhost:3000/";
    })
});