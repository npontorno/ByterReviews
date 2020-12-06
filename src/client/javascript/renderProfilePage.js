//
// Axios Functions
//
export async function updateAccount(account)
{
    const result = await axios({
        method: 'put',
        url: 'http://localhost:3002/accounts',
        headers: {'Content-Type': 'application/json'},
        data: account
    })

    return;
};

//
// Button Press Handlers
//
export const editAccount1 = async function()
{
    let account = JSON.parse(localStorage.getItem("account"));
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let pass1 = $('#pswS').val();
    let pass2 = $('#rpswS').val();

    if ((fname == "") && (lname == "") && (pass1 == "") && (pass2 == ""))
    {
        alert("No changes made.");
        return;
    }

    if (((pass1 != pass2) || (pass1.length < 6) || (pass2.length < 6)) && ((pass1.length > 0) || (pass2.length > 0)))
    {
        alert("Make sure your passwords match. Passwords must be atleast 6 characters.");
        return;
    }

    if (fname != "")
    {
        account.first = fname;
    }

    if (lname != "")
    {
        account.last = lname;
    }

    if ((pass1 == pass2) && (pass1.length > 5))
    {
        account.password = pass1;
    }

    await updateAccount(account).then(editAccount2(account));
    return;
}

export const editAccount2 = async function(account)
{
    localStorage.setItem("account", JSON.stringify(account));
    alert("Account successfully updated.");
    location.reload();
    return;
}

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
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    }

    $(document).on("click", "#logout", function()
    {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("account", {});
        alert("User logged out!");
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    })

    $(document).on("click", "#editform .signupbtn", function()
    {
        editAccount1();
    })
});