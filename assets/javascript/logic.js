$(document).ready(function () {

    // Array of Movie Stars to begin with

    var topics = ["Will Smith", "Mel Gibson", "Samuel Jackson", "Scarlett Johansson", "Robert Downey Jr", "Martin Lawrence", "Kevin Hart", "Charlize Theron"];

    //Display the gif buttons

    function displayButtons() {
        $("#gifsView").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("MovieStar");
            gifButton.addClass("btn btn-primary");
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifsView").append(gifButton);
        }
    }

    //Add new GIF button

    function addButton() {
        $("#addGif").on("click", function () {
            var MovieStar = $("#topicInput").val().trim();
            if (MovieStar == "") {
                return false;
            }
            topics.push(MovieStar);

            displayButtons();
            return false;
        });

    }
    //Remove last button

    function removeButton() {
        $("#removeGif").on("click", function () {
            topics.pop(MovieStar);
            displayButtons();
            return false;
        })

    }

    //Function to display the GIFs

    function displayGifs() {
        var MovieStar = $(this).attr("data-name");
        var APIKey = "&api_key=9VXGzcztZ8rcKgRjy7szsIaVBTcPXdb8"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + MovieStar + "&limit=10" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Results
            //put GIFs in a div

            var results = response.data;
            if (results == "") {
                alert("No giffy for this MovieStar!");
            }
            for (var i = 0; i < results.length; i++) {
                // gifs in a div
                var gifDiv = $("<div1>");
                // get the Rating
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);

                // pull the GIF

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);

                // still images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                // animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);

                // requested images are paused upon coming
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                // add new div
                $("#gifsView").append(gifDiv);
            }
        });
    }

    //list already created Movie Star buttons

    displayButtons();
    addButton();
    removeButton();


    //event listeners

    $(document).on("click", ".MovieStar", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});