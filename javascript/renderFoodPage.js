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
});