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

//
// Button Press Handlers
//
export const handlePostButtonPress = async function()
{
    let post = {};
    let body = $('#data_8').val();
    let rating = 3;
    let upvotes = 0;
    let timeStamp = new Date();
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

//
// Appends item into the DOM
//
export const loadItemIntoDOM = async function()
{
    let item = JSON.parse(localStorage.getItem("item"));

    $("#itemName").text(item.name);
    $("#avgRating").text("Average Rating: " + item.rating + "/5");
    return;
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    loadItemIntoDOM();

    $(document).on("click", ".postbtn", function()
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