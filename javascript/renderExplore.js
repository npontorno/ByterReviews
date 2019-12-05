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
export const handleRestaurantButtonPress1 = function(event)
{
    let id = event.id;

    
}

//
// Template for loading each restaurant div
//
export const renderRestaurant = function(restaurant)
{
    let format =
        `<div class="w3-container w3-card w3-white w3-round w3-margin" id = "${restaurant.id}"><br>
        <img src="" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
        <h4><a href="">${restaurant.name}</a></h4><br>
        <hr class="w3-clear">
        <p></p>
        <div class="w3-row-padding" style="margin:0 -16px">
        <div class="w3-half">
        </div>
        </div>
        </div>`

    return format;
};

//
// Appends restaurants into the DOM
//
export const loadRestaurantsIntoDOM1 = async function()
{
    await getRestaurants().then(restaurants => loadRestaurantsIntoDOM2(restaurants));
    return;
};

export const loadRestaurantsIntoDOM2 = function(restaurants)
{
    const $root = $("#root");
    let html = "";

    restaurants.forEach(restaurant => {html += renderRestaurant(restaurant)});
    $root.html(html);
    return;
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    loadRestaurantsIntoDOM1();

    $(document).on("click", "#root a", function()
    {
        handleRestaurantButtonPress1(this.parentNode.parentNode);
    })
});