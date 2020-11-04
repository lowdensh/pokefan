$(function() {

    $(".accordion").on("click", ".btn.pokemon-fans", function() {
        var no = $(this).attr("data-id")
        getPokemonFans(no)
    })

    function getPokemonFans(no) {
        // This has a hardcoded url for a Django view!
        var get_django_url = "api/pokemon/get/" + no
    
        $.ajax({
            method: "GET",
            url: get_django_url,
            success: function(data, textStatus, jqXHR) {
                if (data.success) {
                    console.log("Ajax GET request: " + textStatus)
                    fillFansModal(data.pokemon["name"], data.fans)
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Ajax GET request: " + textStatus + ": " + errorThrown)
            }
        })
    }
    
    function fillFansModal(pokemon_name, fans) {
        var plural = fans["count"] == 1 ? "" : "s"
        var new_title = `${pokemon_name} has ${fans["count"]} fan${plural}!`
        $("#modal-fans .modal-title").html(new_title)
    
        $("#modal-fans .modal-body").empty()
        if (fans["count"] == 0) {
            $("#modal-fans .modal-body").append(
                `<h3 class="mt-2 vt323">Nobody :(</h3>`
            )
        } else {
            var trainers = fans["trainers"]
            $.each(trainers, function(value) {
                $("#modal-fans .modal-body").append(
                    `<h3 class="mt-2 text-info vt323">${trainers[value]}</h3>`
                )
            })
        }
    }

})


