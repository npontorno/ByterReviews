//
// Axios Functions
//
export async function getCities(city)
{
    const result = await axios({
        method: 'get',
        url: 'https://developers.zomato.com/api/v2.1/cities?q=' + city,
        headers:
        {
            "user-key": "ffa399745f3e1bfe2aff527fad6794f9",
            "content-type": "application/json"
        }
    })

    return result.data.location_suggestions;
};

//
// Button Press Handlers
//
export const handleClaimButtonPress1 = async function()
{
    let city = $("#city").val().replace(/\s+/g, '%20');

    await getCities(city).then(cities => handleClaimButtonPress2(cities));
    return;
};

export const handleClaimButtonPress2 = async function(cities)
{
    localStorage.setItem("cities", JSON.stringify(cities));
    window.location.href = "http://localhost:3000/html/listcities.html";
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
        alert("Only verified restaurant owners can add restaurants.");
        window.location.href = "http://localhost:3000/";
    }

    $(document).on("click", ".signupbtn", function()
    {
        handleClaimButtonPress1();
    })
});