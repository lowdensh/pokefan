$(function() {
    // the below does not work for dynamically added HTML
    // $(".card-header").click(function() {

    $(document).on("click", ".accordion .card-header", function() {
        var card = $(this).parent()
        var poke_no = card.attr("id")

        card.find(".card-header").toggleClass("expanded")
        card.find(".card-header h3").toggleClass("orange")
        card.find(".card-body").toggle("slow")
    })
})
