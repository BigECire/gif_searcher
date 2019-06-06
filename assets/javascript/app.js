$(document).ready(function () {

    var theFruit = ["Apple", "Pear", "Bannana"]

    renderButtons()

    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < theFruit.length; i++) {

            var btn = $("<button>");
            btn.addClass("fruit-btn");
            btn.attr("data-name", theFruit[i]);
            btn.text(theFruit[i]);
            $("#buttons").append(btn);
        }
    }

    $(".enter").on("click", function () {
        event.preventDefault();
        var fruit = $(".form-control").val().trim();

        theFruit.push(fruit);

        renderButtons();

        $(".form-control").val("")
    })

    $(document).on("click", ".fruit-btn", function () {
        var fruit = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=whnvAYPOeg8eePOOYtW4c5amJIVJgvXx";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response)
            for (let i = 0; i < 10; i++) {
                var div = $("<div>")

                div.attr("style", "float:left")

                var fruitImage = $("<img>");

                fruitImage.attr("src", response.data[i].images.fixed_height_small_still.url);
                fruitImage.attr("data-still", response.data[i].images.fixed_height_small_still.url);
                fruitImage.attr("data-animated", response.data[i].images.fixed_height_small.url);
                fruitImage.attr("data-state", "still");
                fruitImage.addClass("gif")
                fruitImage.attr("alt", "fruit image");

                div.append(fruitImage)

                var p = $("<p>")

                p.text("Rating: " + response.data[i].rating)

                div.append(p)

                $("#gifs").prepend(div);

            }


        })

    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animated"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

})