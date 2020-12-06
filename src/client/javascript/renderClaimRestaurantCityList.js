//
// Template for rendering html for each city
//
export const renderMatchingRestaurant = function(city)
{
    let format = 
    `<tr class="${city.id}">
    <td>${city.name}</td>
    <td>${city.country_name}</td>
    <td> <button class="selectCity">Select</button></td>
    </tr>`;

    return format;
};

//
// Appends matching cities into the DOM
//
export const loadCitiesIntoDOM = async function()
{
    const $root = $("#root");
    let html = "";
    let cities = JSON.parse(localStorage.getItem("cities"));

    cities.forEach(city =>
    {
        html += renderMatchingRestaurant(city);
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
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    }

    if (JSON.parse(localStorage.getItem("account")).isOwner.toString() == "false")
    {
        alert("Only verified restaurant owners can add restaurants.")
        window.location.href = "http://localhost:3000/src/client/html/home.html";
    }

    loadCitiesIntoDOM();

    $(document).on("click", ".selectCity", function()
    {
        let cityId = this.parentNode.parentNode.className;

        localStorage.setItem("cityId", cityId);
        window.location.href = "http://localhost:3000/src/client/html/claimRestaurantSearchResults.html";
        return;
    })
})