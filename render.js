/*
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

//
// Button Press Handlers
//
export const handleLikeButtonPress = function(event, postData)
{  
    let post = postData.filter(x => x.id == event.id)[0];

    like(post.id);
    return;
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

//
// Main function to be executed upon page loading
//
$(async function()
{
    let postData = await index();
    loadPostsIntoDOM(postData);

    $(document).on("click", ".class", function()
    {
        handleLikeButtonPress(this, postData);
    })
});
*/