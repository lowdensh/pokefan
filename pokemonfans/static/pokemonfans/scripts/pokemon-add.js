$(function() {
    $("#modal-add-pokemon").on("hide.bs.modal", function(e) {
        $("form#add-pokemon").trigger("reset")
    })

    $("form#add-pokemon").submit(function(e) {
        e.preventDefault()
        var modal_add_pokemon = $(this).parent().parent().parent().parent()

        var django_url = $(this).find(".btn.add-pokemon").attr("data-url")
        var form_no = $("#add-no").val().trim()
        var form_name = $("#add-name").val().trim()
        var form_name_jp = $("#add-name-jp").val().trim()
        var form_type_1 = $("#add-type-1 option:selected").text()
        var form_type_2 = $("#add-type-2 option:selected").text()
        var form_description = $("#add-description").val()

        var image = $("#add-description").val()

        if (form_type_1 == "Select a type") {
            alert("Please select an option for Type 1.")
            return false
        }
        else if (form_type_2 == form_type_1) {
            alert("Please select different options for Type 1 and Type 2.")
            return false
        }
        else {
            if (form_type_2 == "Select a type") {
                form_type_2 = ""
            }
            $.ajax({
                method: "POST",
                url: django_url,
                data: {
                    "no": form_no,
                    "name": form_name,
                    "name_jp": form_name_jp,
                    "type_1": form_type_1,
                    "type_2": form_type_2,
                    "description": form_description
                },
                success: function(data, textStatus, jqXHR) {
                    if (data.success) {
                        console.log("Ajax POST request: " + textStatus)
                        addPokemonCard(data.pokemon)
                        addPokemonToMultiselects(data.pokemon)
                        $("form#add-pokemon").trigger("reset")
                        modal_add_pokemon.modal("hide")
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Ajax POST request: " + textStatus + ": " + errorThrown)
                }
            })
        }
    })
})

function addPokemonToMultiselects(pokemon) {
    image_url = "media/pokemon_images/default.png"
    number = pokemon["number"]
    name = pokemon["name"]

    html = `<option value="${image_url}">${number} ${name}</option>`

    $("#t-add-fan-of").append(html)
    $("#t-edit-fan-of").append(html)
}

function addPokemonCard(pokemon) {
    // first, we create the card based on the pokemon info

    ///////////////
    // card header
    var image
    if (pokemon["image"]) {
        image = '<img class="float-left card-image" src="' + pokemon["image"] + '"></img>'
    } else {
        image = '<img class="float-left card-image" src="media/pokemon_images/default.png"></img>'
    }

    var card_header = '<!--card header-->'
        + '<div class="card-header">'
        + '<div class="row">'
        + '<div class="col-1">'
        + image
        + '</div>'
        + '<div class="col-11">'
        + '<h3 class="card-name">' + pokemon["name"] + '</h3>'
        + '</div>'
        + '</div>'
        + '</div>'

    /////////////
    // card body

    var image_large
    if (pokemon["image_large"]) {
        image_large = '<img class="card-image-large" src="' + pokemon["image_large"] + '"></img>'
    } else {
        image_large = '<img class="card-image-large" src="media/pokemon_images/default_large.webp"></img>'
    }

    var row_pokemon_info = '<!-- first row: pokémon info -->'
        + '<div class="row">'
        + '<!--left column: text-->'
        + '<div class="col-8">'
        + '<!--details-->'
        + '<div class="row m-1">'
        + '<div class="col-2 text-left">'
        + '<h5 class="card-number">' + pokemon["number"] + '</h5>'
        + '</div>'
        + '<div class="col-4 text-center">'
        + '<h5 class="card-name-jp">' + pokemon["name_jp"] + '</h5>'
        + '</div>'
        + '<div class="col-6 text-center">'
        + '<h5>'
        + '<span class="type card-type-1">' + pokemon["type_1"] + '</span>'
        + '<span class="type card-type-2">' + pokemon["type_2"] + '</span>'
        + '</h5>'
        + '</div>'
        + '</div>'
        + '<!--description-->'
        + '<div class="row m-1 text-justify">'
        + '<span class="card-description">' + pokemon["description"] + '</span>'
        + '</div>'
        + '</div>'
        + '<!--right column: image-->'
        + '<div class="col-4">'
        + image_large
        + '</div>'
        + '</div>'
        + '<!-- END first row -->'

    // This has hardcoded urls for a Django views!
    // + 'data-url="api/pokemon/edit/0"'
    // + 'data-url="api/pokemon/delete/0"'
    // Django template language will not render the urls for dynamically added HTML
    var row_buttons = '<!-- second row: buttons -->'
        + '<div class="row mt-3 mb-3">'
        + '<div class="col text-center">'
        + '<button type="button"'
        + 'data-id="' + pokemon["no"] + '"'
        + 'class="btn pokemon-fans btn-outline-info"'
        + 'data-toggle="modal"'
        + 'data-target="#modal-fans">'
        + 'Fans'
        + '</button>'
        + '<button type="button"'
        + 'data-url="api/pokemon/edit/0"'
        + 'class="btn edit-pokemon btn-outline-warning ml-2">'
        // + 'data-toggle="modal"'
        // + 'data-target="#modal-edit-pokemon">'
        + 'Edit'
        + '</button>'
        + '<button type="button"'
        + 'data-url="api/pokemon/delete/0"'
        + 'class="btn delete-pokemon btn-outline-danger ml-2"'
        + 'data-toggle="modal"'
        + 'data-target="#modal-delete-pokemon">'
        + 'Delete'
        + '</button>'
        + '</div>'
        + '</div>'
        + '<!-- END second row -->'

    var card_body = '<!--card body-->'
        // + '<div class="card-body container">'
        + '<div class="card-body container" style="display: none;">'
        + row_pokemon_info
        + row_buttons
        + '</div>'

    /////////////////
    // complete card
    var card = '<div class="card bg-dark" id="' + pokemon["no"] + '">'
        + card_header
        + card_body
        + '</div>'

    // then, we add the card to the page
    $(".accordion").append(card)
}