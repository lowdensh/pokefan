// Basic version: no Bootstrap modal
$(function() {

    $(".btn.cancel-edit").on("click", function() {
        // Reset form
        $("form#edit-pokemon").trigger("reset")

        // Hide form and scroll to top of cards accordion
        $(".container.edit-pokemon").hide("slow")
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".accordion").offset().top
        }, 1000)
    })

    $(".accordion").on("click", ".btn.edit-pokemon", function() {
        // Show form and scroll to it
        $(".container.edit-pokemon").show("slow")
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".container.edit-pokemon").offset().top
        }, 1000);

        var trigger = $(this)
        var edit_card = $(trigger).parent().parent().parent().parent()
        var edit_poke_no = edit_card.attr("id")

        // Finds the Pokemon object using Ajax GET,
        // Then fills out the edit form with its info
        getPokemon(edit_poke_no)
    })

    $("form#edit-pokemon").submit(function(e) {
        e.preventDefault()
        
        var form_name = $("#edit-name").val().trim()
        var form_name_jp = $("#edit-name-jp").val().trim()
        var form_type_1 = $("#edit-type-1 option:selected").text()
        var form_type_2 = $("#edit-type-2 option:selected").text()
        var form_description = $("#edit-description").val()

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

            // This has a hardcoded url for a Django view!
            var edit_poke_no = $("#edit-no").val().trim()
            var edit_django_url = "api/pokemon/edit/" + edit_poke_no

            $.ajax({
                method: "PUT",
                url: edit_django_url,
                data: JSON.stringify({
                    "name": form_name,
                    "name_jp": form_name_jp,
                    "type_1": form_type_1,
                    "type_2": form_type_2,
                    "description": form_description
                }),
                success: function(data, textStatus, jqXHR) {
                    if (data.success) {
                        console.log("Ajax PUT request: " + textStatus)

                        editPokemonCard(data.pokemon)

                        // Reset form
                        $("form#edit-pokemon").trigger("reset")

                        // Hide form and scroll to top of cards accordion
                        $(".container.edit-pokemon").hide("slow")
                        $([document.documentElement, document.body]).animate({
                            scrollTop: $(".accordion").offset().top
                        }, 1000)
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Ajax PUT request: " + textStatus + ": " + errorThrown)
                }
            })
        }
    })
})

// Fetch a Pokemon object and then call fillEditForm()
function getPokemon(no) {
    // This has a hardcoded url for a Django view!
    var get_django_url = "api/pokemon/get/" + no

    $.ajax({
        method: "GET",
        url: get_django_url,
        success: function(data, textStatus, jqXHR) {
            if (data.success) {
                console.log("Ajax GET request: " + textStatus)
                fillEditForm(data.pokemon)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Ajax GET request: " + textStatus + ": " + errorThrown)
        }
    })
}

// Pre-fill the edit form with Pokémon information
function fillEditForm(pokemon) {
    var form_parent = ".container.edit-pokemon"

    $(form_parent).find("#edit-no").val(pokemon["no"])
    $(form_parent).find("#edit-name").val(pokemon["name"])
    $(form_parent).find("#edit-name-jp").val(pokemon["name_jp"])
    $(form_parent).find("#edit-type-1").val(pokemon["type_1"])
    if (pokemon["type_2"] == "") {
        $(form_parent).find("#edit-type-2").val("Select a type")
    } else {
        $(form_parent).find("#edit-type-2").val(pokemon["type_2"])
    }
    $(form_parent).find("#edit-description").val(pokemon["description"])
}

// Update the text on the edited Pokémon's card
function editPokemonCard(pokemon) {
    var card = $(".card#" + pokemon["no"])

    $(card).find(".card-name").text(pokemon["name"])
    $(card).find(".card-name-jp").text(pokemon["name_jp"])
    $(card).find(".card-type-1").text(pokemon["type_1"])
    if (pokemon["type_2"] == "") {
        $(card).find(".card-type-2").text("")
    } else {
        $(card).find(".card-type-2").text(pokemon["type_2"])
    }
    $(card).find(".card-description").text(pokemon["description"])
}

// Pretty version: uses Bootstrap modal
// Will not work - variables printed many times, delete has similar issue
// Correctly gets poke_no but the final one is undefined
// $(function() {
//     $(".btn.edit-pokemon").on("click", function() {
//         var modal_edit_pokemon = $("#modal-edit-pokemon")
//         var trigger

//         modal_edit_pokemon.on("hide.bs.modal", function(e) {
//             $("form#edit-pokemon").trigger("reset")
//         })

//         modal_edit_pokemon.on("show.bs.modal", function(e) {
//             // The specific "Edit" button within a Pokémon card
//             // This is outside of the modal and caused the modal to open
//             // We need this to find the ID (no) for the Pokemon object
//             trigger = e.relatedTarget
//             console.log(trigger)

//             var edit_card = $(trigger).parent().parent().parent().parent()
//             var edit_poke_no = edit_card.attr("id")

//             // Finds the Pokemon object using Ajax GET,
//             // Then fills out the edit form with its info
//             getPokemon(edit_poke_no)
//         })

//         $("form#edit-pokemon").submit(function(e) {
//             e.preventDefault()
            
//             var form_name = $("#edit-name").val().trim()
//             var form_name_jp = $("#edit-name-jp").val().trim()
//             var form_type_1 = $("#edit-type-1 option:selected").text()
//             var form_type_2 = $("#edit-type-2 option:selected").text()
//             var form_description = $("#edit-description").val()

//             if (form_type_1 == "Select a type") {
//                 alert("Please select an option for Type 1.")
//                 return false
//             }
//             else if (form_type_2 == form_type_1) {
//                 alert("Please select different options for Type 1 and Type 2.")
//                 return false
//             }
//             else {
//                 if (form_type_2 == "Select a type") {
//                     form_type_2 = null
//                 }
//                 var edit_card = $(trigger).parent().parent().parent().parent()
//                 var edit_poke_no = edit_card.attr("id")
//                 var edit_django_url = $(trigger).attr("data-url")
//                 console.log(edit_poke_no)
//                 console.log(edit_django_url.replace("0", edit_poke_no))
//                 // $.ajax({
//                 //     method: "PUT",
//                 //     url: edit_django_url.replace("0", edit_poke_no),
//                 //     data: {
//                 //         "name": form_name,
//                 //         "name_jp": form_name_jp,
//                 //         "type_1": form_type_1,
//                 //         "type_2": form_type_2,
//                 //         "description": form_description
//                 //     },
//                 //     success: function(data, textStatus, jqXHR) {
//                 //         if (data.success) {
//                 //             console.log("Ajax PUT request: " + textStatus)
//                 //             editPokemonCard(data.pokemon)
//                 //             modal_edit_pokemon.modal("hide")
//                 //         }
//                 //     },
//                 //     error: function(jqXHR, textStatus, errorThrown) {
//                 //         alert("Ajax PUT request: " + textStatus + ": " + errorThrown)
//                 //     }
//                 // })
//             }
//         })
//     })
// })
