//
// Axios Functions
//
export async function getRestaurant()
{
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3002/restaurants',
    })

    return result.data[0];
};

//
// Button Press Handlers
//

//
// Appends account into the DOM
//
export const loadRestaurantIntoDOM1 = async function()
{
    await getRestaurant().then(restaurant => loadRestaurantIntoDOM2(restaurant));
    return;
};

export const loadRestaurantIntoDOM2 = function(restaurant)
{
    console.log(JSON.stringify(restaurant));

    $("#profile").text(restaurant.name);
    $("#pemail").text(restaurant.cuisine + " Cuisine");
    $("#numOfReviews").text(restaurant.address + ", " + restaurant.city + ", " + restaurant.state + " " + restaurant.zip);
    return;
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    loadRestaurantIntoDOM1();
});