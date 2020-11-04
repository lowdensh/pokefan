$(function() {
    // for initial cards loaded on template render
    $(".type").each(function() {
        var pokemon_type = $(this).text().trim().toLowerCase()
        $(this).addClass(pokemon_type)
        if (pokemon_type == "") {
            $(this).css("border", "none")
        }
    })

    // for dynamically added cards
    $(document).on("DOMNodeInserted", function(e) {
        $(".type").each(function() {
            var pokemon_type = $(this).text().trim().toLowerCase()
            $(this).addClass(pokemon_type)
        })
    })
})
