/*
//
// Test Axios Request
//
export async function index()
{
    const result = await axios({
        method: 'get',
        url: 'https://developers.zomato.com/api/v2.1/cities?q=new%20york',
        headers:
        {
            'user-key': 'ffa399745f3e1bfe2aff527fad6794f9',
            'content-type': 'application/json'
        },
    })

    console.log(result.data);
    return;
};
*/

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
    let id = Date.now();

    /*let emails = getEmails();

    if (emails.includes(email))
    {
        console.log("Email address already exists.");
        return;
    }*/

    if ((fname == "") || (lname == "") || (email == "") || (pass1 == "") || (pass2 == ""))
    {
        console.log("You must fill out the entire form.");
        return;
    }

    if ((!email.includes("@")) || (!email.includes(".")))
    {
        console.log("Make sure your email is formatted correctly.");
        return;
    }

    if (pass1.length < 6)
    {
        console.log("Passwords must have a length of atleast 6 characters.");
        return;
    }

    if (pass1 != pass2)
    {
        console.log("Passwords do not match.");
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
    return;
};

/*
//
// Template for loading each post
//
export const renderPost = function(post)
{
    let format =
        `<div id = "${post.id}" class = "obj">
        </div>`

    return format;
};

//
// Appends each selected post into the DOM
//
export const loadPostsIntoDOM = function(posts) {
    let post = "";
    const $root = $("#root");

    posts.forEach(x => {post += renderPost(x)});
    $root.html(post);
};
*/

//
// Main function to be executed upon page loading
//
$(async function()
{
    $(document).on("click", "#id01 .signupbtn", function()
    {
        createAccount();
    })
});