//
// Button Press Handlers
//
export const handleItemButtonPress = function(event)
{
    let id = event.id;
    let items = JSON.parse(localStorage.getItem("restaurant")).items;
    let item = {}

    for (let i in items)
    {
        if (items[i].id == id)
        {
            item = items[i];
        }
    }

    localStorage.setItem("item", JSON.stringify(item));
    return;
}

//
// Template for loading each menu item
//
export const renderItem = function(item)
{
    let format =
        `<div class="column" id="${item.id}" style="background-color:#aaa;">
        <a href="http://localhost:3000/html/Foodpage.html" >${item.name}</a>
        <p></p>
        </div>`

    return format;
};

//
// Appends account into the DOM
//

export const loadRestaurantIntoDOM = function()
{
    const $root = $("#root");
    let restaurant = JSON.parse(localStorage.getItem("restaurant"));
    let items = restaurant.items;
    let html = "";
    let counter = 1;

    items.forEach(item =>
        {
            if (counter == 1)
            {
                html += `<div class="row">`;
                html += renderItem(item);
                counter = 0;
            }

            else
            {
                html += renderItem(item);
                html += `</div>`;
                counter += 1;
            }
        });
    
    if (counter == 0)
    {
        html += `<div class="column" style="background-color:white">
                <button onclick="document.getElementById('addform').style.display='block'" style="width:auto; color:black;">Add Item</button>
                <p></p>
                </div>
                </div>`;
    }

    else
    {
        html += `<div class="row">
                <div class="column" style="background-color:white">
                <button onclick="document.getElementById('addform').style.display='block'" style="width:auto; color:black;">Add Item</button>
                <p></p>
                </div>
                </div>`;
    }

    $("#profile").text(restaurant.name);
    $("#pemail").text(restaurant.cuisine + " Cuisine");
    $("#numOfReviews").text(restaurant.address + ", " + restaurant.city + ", " + restaurant.state + " " + restaurant.zip);
    $root.html(html);
    return;
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    loadRestaurantIntoDOM();

    $(document).on("click", "#root a", function()
    {
        handleItemButtonPress(this.parentNode);
    })
});