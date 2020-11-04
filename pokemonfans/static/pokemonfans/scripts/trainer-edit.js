$(function() {

    // Finds the Trainer object using Ajax GET,
    // Then fills out the edit form with its info
    $("#trainer-card").on("click", ".btn.edit-trainer", function() {
        resetEditTrainerForm()

        var trainer_id = $("#trainer-card").find("#tc-name").attr("data-id")
        getTrainerForForm(trainer_id)
    })

    // Update avatar image on selection
    $("#t-edit-avatar").change(function() {
        var avatar_url = "media/" + $("#t-edit-avatar").find(":selected")[0].value
        $("#t-edit-avatar-preview").attr("src", avatar_url)
    })

    // Update set of Pokémon images on selection
    $("#t-edit-fan-of").change(function() {
        var selected_mons = $("#t-edit-fan-of").val()

        $("#t-edit-fan-of-preview").empty()
        $.each(selected_mons, function(value) {
            $("#t-edit-fan-of-preview").append(
                '<img height="42" src="' + selected_mons[value] + '">'
            )
        })
    })

    $("form#edit-trainer").submit(function(e) {
        e.preventDefault()

        var trainer_id = $("#trainer-card").find("#tc-name").attr("data-id")
        var header_edit = $(".trainer-list .card-header[data-id='" + trainer_id + "']")

        var form_name = $("#t-edit-name").val().trim()
        var form_avatar = $("#t-edit-avatar").find(":selected")[0].value
        var form_region = $("#t-edit-region").find(":selected")[0].value
        var form_series = $("#t-edit-series").find(":selected")[0].value
        var form_mons = []
        $('#t-edit-fan-of :selected').each(function(i){
            form_mons[i] = $(this).attr("data-id")
        })

        // This has a hardcoded url for a Django view!
        var edit_django_url = "api/trainer/edit/" + trainer_id

        $.ajax({
            method: "PUT",
            url: edit_django_url,
            data: JSON.stringify({
                "name": form_name,
                "avatar": form_avatar,
                "region": form_region,
                "series": form_series,
                "mons": form_mons
            }),
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    console.log("Ajax POST request: " + textStatus)

                    $(header_edit).text(data.trainer["name"])

                    // Get Trainer info and then call fillTrainerCard()
                    // Defined in trainer-card-display.js
                    getTrainer(trainer_id)

                    // Reset form and close modal
                    resetEditTrainerForm()
                    $("#modal-edit-trainer").modal("hide")
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Ajax POST request: " + textStatus + ": " + errorThrown)
            }
        })
    })

})

function resetEditTrainerForm() {
    $("form#edit-trainer").trigger("reset")
    var avatar_url = "media/" + $("#t-edit-avatar").find(":selected")[0].value
    $("#t-edit-avatar-preview").attr("src", avatar_url)
    $("#t-edit-fan-of-preview").empty()
}

function getTrainerForForm(id) {
    // This has a hardcoded url for a Django view!
    var get_django_url = "api/trainer/get/" + id

    $.ajax({
        method: "GET",
        url: get_django_url,
        success: function(data, textStatus, jqXHR) {
            if (data.success) {
                console.log("Ajax GET request: " + textStatus)
                fillEditTrainerForm(data.trainer, data.pokemon_urls)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ajax GET request: " + textStatus + ": " + errorThrown)
        }
    })
}

// Fill the form with Trainer information
function fillEditTrainerForm(trainer, urls) {
    $("#t-edit-name").val(trainer["name"])

    $("#t-edit-avatar-preview").attr("src", trainer["avatar_url"])
    var url = trainer["avatar_url"]
    url = url.slice(7, url.length)  // remove "/media/"
    $("#t-edit-avatar").val(url)

    var region_val = $(`#t-edit-region option:contains(${trainer["region"]})`).val()
    $("#t-edit-region").val(region_val)

    var series_val = $(`#t-edit-series option:contains(${trainer["series"]})`).val()
    $("#t-edit-series").val(series_val)

    $("#t-edit-fan-of").val(urls)
    $.each(urls, function(value) {
        $("#t-edit-fan-of-preview").append(
            '<img height="42" src="' + urls[value] + '">'
        )
    })
}