$(function() {
    displayFirstTrainer()

    $(document).on("click", ".trainer-list .card-header", function() {
        // Indicate active header with style changes
        $(".trainer-list .card-header").removeClass("expanded orange")
        $(this).toggleClass("expanded orange")

        var active_trainer_id = $(this).attr("data-id")
        getTrainer(active_trainer_id)
    })
})

// Get Trainer info and then call fillTrainerCard()
function getTrainer(id) {
    // This has a hardcoded url for a Django view!
    var get_django_url = "api/trainer/get/" + id

    $.ajax({
        method: "GET",
        url: get_django_url,
        success: function(data, textStatus, jqXHR) {
            if (data.success) {
                console.log("Ajax GET request: " + textStatus)
                fillTrainerCard(data.trainer, data.pokemon_urls)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ajax GET request: " + textStatus + ": " + errorThrown)
        }
    })
}

// Find the first trainer in the list and display their info
function displayFirstTrainer() {
    var first_header = $(".trainer-list .card-header")[0]
    var first_id = $(first_header).attr("data-id")
    $(first_header).addClass("expanded orange")
    getTrainer(first_id)
}

// Fill the trainer card with Trainer information
function fillTrainerCard(trainer, urls) {
    var trainer_card = "#trainer-card"

    $(trainer_card).find("#tc-name").text(trainer["name"])
    $(trainer_card).find("#tc-name").attr("data-id", trainer["id"])

    $(trainer_card).find("#tc-join-date").text(trainer["join_date"])
    $(trainer_card).find("#tc-region").text(trainer["region"])
    $(trainer_card).find("#tc-series").text(trainer["series"])
    $(trainer_card).find("#tc-avatar").attr("src", trainer["avatar_url"])

    $(trainer_card).find("#tc-pokemon-set").empty()
    $.each(urls, function(value) {
        $(trainer_card).find("#tc-pokemon-set").append(
            '<img height="42" src="' + urls[value] + '">'
        )
    })
}