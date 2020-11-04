// Basic version: uses Window.confirm(), no Bootstrap modal, and 100% reliable
// Remove data-toggle and data-target from card Delete buttons if using this - they bring up the modal
// $(function() {
//     $(".accordion").on("click", ".btn.delete-pokemon", function() {
//         var delete_card = $(this).parent().parent().parent().parent()
//         var delete_poke_no = delete_card.attr("id")
//         var delete_django_url = $(this).attr("data-url")

//         if (confirm("Are you sure you want to delete this Pokémon?")) {
//             $.ajax({
//                 method: "DELETE",
//                 url: delete_django_url.replace("0", delete_poke_no),
//                 success: function(data, textStatus, jqXHR) {
//                     if (data.success) {
//                         console.log("Ajax DELETE request: " + textStatus)
//                         delete_card.hide("slow", function() {
//                             $(this).remove()
//                         })
//                     }
//                 },
//                 error: function(jqXHR, textStatus, errorThrown) {
//                     alert("Ajax DELETE request: " + textStatus + ": " + errorThrown)
//                 }
//             })
//         }
//     })
// })


// Pretty version: uses Bootstrap modal
// Always works for Pokémon cards that are made on template render
// Had issues with dynamically added Pokémon cards
// https://stackoverflow.com/a/14533243
$(function() {
    $(".accordion").on("click", ".btn.delete-pokemon", function() {
        var modal_delete_confirm = $("#modal-delete-pokemon")
        var trigger

        modal_delete_confirm.on("show.bs.modal", function(e) {
            // The specific "Delete" button within a Pokémon card
            // This is outside of the modal and caused the modal to open
            // We need this to find the ID (no) for the Pokemon object
            trigger = e.relatedTarget
        })

        modal_delete_confirm.on("click", ".btn.delete", function(e) {
            var delete_card = $(trigger).parent().parent().parent().parent()
            var delete_poke_no = delete_card.attr("id")
            var delete_django_url = $(trigger).attr("data-url")

            $.ajax({
                method: "DELETE",
                url: delete_django_url.replace("0", delete_poke_no),
                success: function(data, textStatus, jqXHR) {
                    if (data.success) {
                        console.log("Ajax DELETE request: " + textStatus)
                        delete_card.hide("slow", function() {
                            $(this).remove()
                        })
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Ajax DELETE request: " + textStatus + ": " + errorThrown)
                }
            })
            modal_delete_confirm.modal("hide")
        })
    })
})
