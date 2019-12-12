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

//
// Template for rendering html for each restaurant
//
export const renderMatchingRestaurant = function(restaurant)
{
    let format = 
    `<tr>
    <td>${restaurant.restaurant.name}</td>
    <td>${restaurant.restaurant.location.address}</td>
    <td> <button class="claimBtn">Claim</button></td>
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

    $(document).on("click", ".selectCity", function()
    {
        let cityId = this.parentNode.parentNode.className;

        localStorage.setItem("cityId", cityId);
        window.location.href = "http://localhost:3000/html/processclaim.html";
        return;
    })
})