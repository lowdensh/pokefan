$(function() {
    $("#trainer-card").on("click", ".btn.delete-trainer", function() {
        var modal_delete_confirm = $("#modal-delete-trainer")
        var trainer_card = "#trainer-card"

        modal_delete_confirm.on("click", ".btn.delete", function(e) {
            var trainer_id = $(trainer_card).find("#tc-name").attr("data-id")
            var header_remove = $(".trainer-list .card-header[data-id='" + trainer_id + "']")

            // This has a hardcoded url for a Django view!
            var delete_django_url = "api/trainer/delete/" + trainer_id

            $.ajax({
                method: "DELETE",
                url: delete_django_url,
                success: function(data, textStatus, jqXHR) {
                    if (data.success) {
                        console.log("Ajax DELETE request: " + textStatus)
                        header_remove.hide("slow", function() {
                            $(this).remove()
                        })
                        
                        // defined in trainer-card-display.js
                        displayFirstTrainer()
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
