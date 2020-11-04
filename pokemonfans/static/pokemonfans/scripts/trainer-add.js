$(function() {

    $("#modal-add-trainer").on("hide.bs.modal", function() {
        $("#t-add-fan-of-preview").empty()
        $("form#add-trainer").trigger("reset")
        var avatar_url = "media/" + $("#t-add-avatar").find(":selected")[0].value
        $("#t-add-avatar-preview").attr("src", avatar_url)
    })
    
    // Update avatar image on selection
    $("#t-add-avatar").change(function() {
        var avatar_url = "media/" + $("#t-add-avatar").find(":selected")[0].value
        $("#t-add-avatar-preview").attr("src", avatar_url)
    })

    // Update set of Pokémon images on selection
    $("#t-add-fan-of").change(function() {
        var selected_mons = $("#t-add-fan-of").val()

        $("#t-add-fan-of-preview").empty()
        $.each(selected_mons, function(value) {
            $("#t-add-fan-of-preview").append(
                '<img height="42" src="' + selected_mons[value] + '">'
            )
        })
    })

    $("form#add-trainer").submit(function(e) {
        e.preventDefault()
        var modal_add_trainer = $("#modal-add-trainer")

        var django_url = $(this).find(".btn.add-trainer").attr("data-url")
        var form_name = $("#t-add-name").val().trim()
        var form_avatar = $("#t-add-avatar").find(":selected")[0].value
        var form_region = $("#t-add-region").find(":selected")[0].value
        var form_series = $("#t-add-series").find(":selected")[0].value
        var form_mons = []
        $('#t-add-fan-of :selected').each(function(i){
            // text() values are of this format: pokemon.number pokemon.name
            // here we extract pokemon.no from number by removing the # and any 0
            // form_mons[i] = $(this).text().split(" ")[0].replace("#", "").replace("0", "")
            form_mons[i] = $(this).attr("data-id")
        })
        console.log(form_mons)

        $.ajax({
            method: "POST",
            url: django_url,
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
                    addTrainerToList(data.trainer)
                    $("form#add-trainer").trigger("reset")
                    modal_add_trainer.modal("hide")
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Ajax POST request: " + textStatus + ": " + errorThrown)
            }
        })
    })
})

function addTrainerToList(trainer) {
    id = trainer["id"]
    name = trainer["name"]
    html = `<h3 class="card-header mb-3 text-center vt323 rounded" data-id=${id}>${name}</h3>`
    $(".trainer-list").append(html)
}