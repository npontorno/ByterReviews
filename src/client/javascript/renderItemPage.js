//
// Axios Functions
//
export async function postReview(post, accountId)
{
    let data =
    {
        "post": post,
        "accountId": accountId
    }

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3002/posts',
        headers: {'Content-Type': 'application/json'},
        data: data
    })

    return;
};

export async function getAccounts()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/accounts',
    })

    return result.data;
};

export async function deletePost(postId)
{
    let id = [postId];

    const result = await axios({
        method: 'delete',
        url: 'http://localhost:3002/posts',
        data: id
    })

    return;
};

//
// Button Press Handlers
//
export const handlePostButtonPress = async function()
{
    let post = {};
    let body = $('#data_8').val();
    let rating = 3;
    let upvotes = 0;
    let timeStamp = new Date().toLocaleString();
    let reviewId = parseInt(444 + "" + Date.now());

    let account = JSON.parse(localStorage.getItem("account"));
    let accountId = account.id;
    
    let item = JSON.parse(localStorage.getItem("item"));
    let itemId = item.id;
    
    if (body == "")
    {
        alert("You must fill out the entire form.");
        return;
    }

    post = 
    {
        id: reviewId,
        itemId: itemId,
        body: body,
        rating: rating,
        upvotes: upvotes,
        timeStamp: timeStamp,
    };

    postReview(post, accountId);
    alert("Review Posted!");
    return;
};

export const handleDeleteButtonPress1 = async function(postId)
{
    await getAccounts().then(accounts => handleDeleteButtonPress2(accounts, postId));
    return;
}


export const handleDeleteButtonPress2 = async function(accounts, postId)
{
    let accountId = (JSON.parse(localStorage.getItem("account"))).id;
    let myAccount = {};
    let postCheck = 0;

    accounts.forEach(account =>
    {
        if (account.id == accountId)
        {
            myAccount = account;
        }
    })

    myAccount.posts.forEach(post => 
    {
        if (post.id == postId)
        {
            postCheck = 1;
        }
    })

    if (postCheck == 0)
    {
        alert("You cannot delete someone else's post!");
        return;
    }
    
    deletePost(postId);
    alert("Post successfully deleted.")
    location.reload();
    return;
}


//
// Template for loading each menu item
//
export const renderPost = function(postInfo)
{
    let accountName = postInfo.account.first + " " + postInfo.account.last;
    let postId = postInfo.post.id;
    let body = postInfo.post.body;
    let rating = postInfo.post.rating;
    let upvotes = postInfo.post.upvotes;
    let timeStamp = postInfo.post.timeStamp;

    let format =
        `<div id="${postId}" class="w3-container w3-card w3-white w3-round w3-margin"><br>
        <i class="fa fa-user" aria-hidden="true"></i>
        <span class="w3-right w3-opacity">${timeStamp}</span>
        <h4>${accountName}</h4><br>
        <hr class="w3-clear">
        <p>${body}</p>
        <p>Rating: ${rating}/5</p>
        <p>Upvotes: ${upvotes}</p>
        <div class="w3-row-padding" style="margin:0 -16px">
        </div>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button>
        <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom deletePost"> Delete Post</button> 
        </div>`

    return format;
};

//
// Appends item and posts into the DOM
//
export const loadItemIntoDOM = async function()
{
    let item = JSON.parse(localStorage.getItem("item"));

    $("#itemName").text(item.name);
    $("#avgRating").text("Average Rating: " + item.rating + "/5");
    return;
};

export const loadPostsIntoDOM1 = async function()
{
    await getAccounts().then(accounts => loadPostsIntoDOM2(accounts));
    return;
}

export const loadPostsIntoDOM2 = function(accounts)
{
    const $root = $("#root");
    let html = "";
    let item = JSON.parse(localStorage.getItem("item"));
    let posts = [];

    accounts.forEach(account =>
    {
        account.posts.forEach(post =>
        {
            if (post.itemId == item.id)
            {
                let postInfo =
                {
                    account: account,
                    post: post
                }

                posts.push(postInfo);
            }
        });
    });

    posts.forEach(postInfo =>
    {
        html += renderPost(postInfo);
    });

    $root.html(html);
    return;
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    loadItemIntoDOM();
    loadPostsIntoDOM1();

    $(document).on("click", ".postbtn", function()
    {
        let loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn == "false")
        {
            alert("You must be logged in to do that.");
            return;
        }

        handlePostButtonPress();
    })

    $(document).on("click", ".deletePost", function()
    {
        let loggedIn = localStorage.getItem("loggedIn").toString();

        if (loggedIn == "false")
        {
            alert("You must be logged in to do that.");
            return;
        }

        handleDeleteButtonPress1(this.parentNode.id);
    })
});