// Array of initial tv shows as the theme of topics to search gifs from
var topics = ["Game of Thrones", "Letterkenny", "The Office", "Frisky Dingo", "The X-Files", "Breaking Bad", "Mad Men", "Broad City", "Billions", "It's Always Sunny In Philadelphia", "Handmaid's Tale"]
// Loops through topics array and creates buttons for each show
for (var i = 0; i < topics.length; i++) {
    var b = $("<button class='gif'>");
    b.attr("data-tv-show", topics[i]);
    b.text(topics[i]);
    $("#buttons-appear-here").append(b);
}
$("#submit").on("click", function (event) {
    event.preventDefault();
    var search = $("#search").val();
    var b = $("<button class='gif'>");
    b.attr("data-tv-show", search);
    b.text(search);
    $("#buttons-appear-here").append(b);
})

$("body").on("click", ".gif", function () {
    // Grabbing and storing the data-animal property value from the button
    var tvShow = $(this).attr("data-tv-show");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=pjW1jJ0b2lObaJt5eZOka3bxBV5OP4wB&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var tvShowDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var tvShowImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                tvShowImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the tvShowDiv
                tvShowDiv.append(p);
                tvShowDiv.append(tvShowImage);

                // Prependng the tvShowDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(tvShowDiv);
            }
        });
    $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});