//
// Axios Functions
//
export async function getRestaurants(cityId)
{
    const result = await axios({
        method: 'get',
        url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityId + '&entity_type=city',
        headers:
        {
            "user-key": "ffa399745f3e1bfe2aff527fad6794f9",
            "content-type": "application/json"
        }
    })

    return result.data.restaurants;
};

export async function getRestaurantById(restaurantId)
{
    const result = await axios({
        method: 'get',
        url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + restaurantId,
        headers:
        {
            "user-key": "ffa399745f3e1bfe2aff527fad6794f9",
            "content-type": "application/json"
        }
    })

    return result.data;
};

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
export const claimRestaurant1 = async function(restaurantId)
{
    await getRestaurantById(restaurantId).then(restaurant => claimRestaurant2(restaurant));
    return;
}

export const claimRestaurant2 = async function(apiRestaurant)
{
    let restaurant = {};
    let name = apiRestaurant.name;
    let city = apiRestaurant.location.city;
    let state = "";
    let zip = apiRestaurant.location.zipcode;
    let address = apiRestaurant.location.address;
    let cuisine = apiRestaurant.cuisines;
    let id = parseInt(222 + "" + Date.now());
    let ownerId = (JSON.parse(localStorage.getItem("account")).id);

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
    window.location.href = "http://localhost:3000/html/explore.html";
    return;
}

//
// Template for rendering html for each restaurant
//
export const renderMatchingRestaurant = function(restaurant)
{
    let format = 
    `<tr class="${restaurant.restaurant.R.res_id}">
    <td>${restaurant.restaurant.name}</td>
    <td>${restaurant.restaurant.location.address}</td>
    <td>Cusine: ${restaurant.restaurant.cuisines}</td>
    <td><button class="claimBtn">Claim</button></td>
    </tr>`;

    return format;
};

//
// Appends possible restaurants into the DOM
//
export const loadRestaurantsIntoDOM1 = async function()
{
    let cityId = localStorage.getItem("cityId");
    
    await getRestaurants(cityId).then(restaurants => loadRestaurantsIntoDOM2(restaurants));
    return;
}

export const loadRestaurantsIntoDOM2 = async function(restaurants)
{
    const $root = $("#root");
    let html = "";

    restaurants.forEach(restaurant =>
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

    if (JSON.parse(localStorage.getItem("account")).isOwner.toString() == "false")
    {
        alert("Only verified restaurant owners can add restaurants.")
        window.location.href = "http://localhost:3000/";
    }

    loadRestaurantsIntoDOM1();

    $(document).on("click", ".claimBtn", function()
    {
        let restaurantId = this.parentNode.parentNode.className;

        claimRestaurant1(restaurantId);
        return;
    })
})