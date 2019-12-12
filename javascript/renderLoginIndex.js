//
// Axios Functions
//
export async function getRestaurants()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/restaurants',
    })

    return result.data;
};

//
// Button Press Handlers
//
export const search1 = async function()
{
    await getRestaurants().then(restaurants => search2(restaurants));
    return;
}

export const search2 = async function(restaurants)
{
    let matchingRestaurants = [];
    let searchTerm = $('.searchTerm').val();

    restaurants.forEach(restaurant =>
    {
        if (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            matchingRestaurants.push(restaurant); 
        }
    });

    localStorage.setItem("matchingRestaurants", JSON.stringify(matchingRestaurants)); 
    return;
}

export const handleSearchButtonPress1 = async function(restaurantId)
{
    await getRestaurants().then(restaurants => handleSearchButtonPress2(restaurants, restaurantId));
    return;
}

export const handleSearchButtonPress2 = async function(restaurants, restaurantId)
{
    let target = {};

    restaurants.forEach(restaurant =>
    {
        if (restaurant.id == restaurantId)
        {
            target = restaurant;
            localStorage.setItem("restaurant", JSON.stringify(restaurant));
            return;
        }
    })
}

//
// Template for loading each matching restaurant
//
export const renderMatchingRestaurant = function(restaurant)
{
    let htmlClass = restaurant.name.replace(/\s+/g, '-');
    let format = `<option value="${restaurant.name}" class="${htmlClass}" id="${restaurant.id}">`;

    return format;
};

//
// Appends matching restaurants into the DOM
//
export const loadMatchingRestaurantsIntoDOM = async function(matchingRestaurants)
{
    const $root = $("#browsers");
    let html = "";

    matchingRestaurants.forEach(restaurant =>
    {
        html += renderMatchingRestaurant(restaurant);
    })

    $root.html(html);
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
        window.location.href = "http://localhost:3000/";
    }

    $(document).on("click", ".main ul .loginb", function()
    {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("account", {});
        alert("User logged out!");
        window.location.href = "http://localhost:3000/";
    })

    $(document).on("click", ".searchButton", function()
    {   
        let searchClass = $(".searchTerm").val().replace(/\s+/g, '-');
        let queryTerm = "." + searchClass;
        let searchTerm = $(queryTerm)[0];
        let restaurantId = searchTerm.id;

        handleSearchButtonPress1(restaurantId);
        window.location.href = "http://localhost:3000/html/ResturantPage.html"
    })

    $(document).on("keypress", ".searchTerm", function()
    {
        search1();

        let matchingRestaurants = JSON.parse(localStorage.getItem("matchingRestaurants"));
        loadMatchingRestaurantsIntoDOM(matchingRestaurants);
    })
});