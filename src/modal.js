jQuery(document).ready(function ($) {
    $(".cd-popup").on("click", function (event) {
        if (
            $(event.target).is(".cd-popup-close") ||
            $(event.target).is(".cd-popup")
        ) {
            event.preventDefault();
            $(this).removeClass("is-visible");
        }
    });
    $(document).keyup(function (event) {
        if (event.which == "27") {
            $(".cd-popup").removeClass("is-visible");
        }
    });
});
function OpenModal(_blah) {
    if (_blah) {
        $(".cd-popup-text").text(_blah);
    }
    $(".cd-popup").addClass("is-visible");
}
