//
// Axios Functions
//
export async function postRestaurant(restaurant)
{
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3002/restaurants',
        headers: {'Content-Type': 'application/json'},
        data: restaurant
    })

    return;
};

//
// Button Press Handlers
//
export const claimRestaurant = async function()
{
    let restaurant = {};
    let name = $("#restaurantName").val();
    let city = $("#city").val();
    let state = $("#state").val();;
    let zip = $("#zip").val();;
    let address = $("#address").val();;
    let cuisine = $("#cuisine").val();;
    let id = parseInt(222 + "" + Date.now());
    let ownerId = (JSON.parse(localStorage.getItem("account")).id);

    if ((name == "") || (city == "") || (state == "") || (zip == "") || (address == "") || (cuisine == ""))
    {
        alert("Form must be filled out completely");
        return;
    }

    restaurant = 
    {
        "id": id,
        "ownerId": ownerId,
        "rating": 3,
        "name": name,
        "city": city,
        "state": state,
        "zip": zip,
        "address": address,
        "cuisine": cuisine,
        "items": []
    };

    postRestaurant(restaurant);
    localStorage.setItem("restaurant", restaurant);
    alert("Restaurant successfully added, try searching for it!");
    window.location.href = "http://localhost:3000/src/client/html/explore.html";
    return;
}

//
// Main function to be executed upon page loading
//
$(async function()
{
    if (localStorage.getItem("loggedIn").toString() == "false")
    {
        alert("Not logged in!");
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    }

    if (JSON.parse(localStorage.getItem("account")).isOwner.toString() == "false")
    {
        alert("Only verified restaurant owners can add restaurants.")
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    }

    $(document).on("click", "#submit", function()
    {
        claimRestaurant();
        return;
    })
})