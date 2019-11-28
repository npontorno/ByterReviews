import {array} from "../data/accounts.js";

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

//
// Axios Functions
//
export async function index()
{
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    })

    return result.data;
};

export async function like(id)
{
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/like',
        withCredentials: true,
    })

    location.reload();
    return;
};

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
*/

//
// Button Press Handlers
//
export const createAccount = async function()
{  
    let account = {};
    let fname = $('#id01 .fname').val();
    let lname = $('#id01 .lname').val();
    let email = $('#id01 .email').val();
    let pass1 = $('#id01 .psw').val();
    let pass2 = $('#id01 .psw-repeat').val();

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
        id: 1111,
        first: fname,
        last: lname,
        email: email,
        password: pass1,
        isOwner: false,
        postCount: 0,
        posts: []
    };

    console.log(account);
    await array.push(account);
    console.log(array);
    return;
};

/*
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