$(document).ready(function() {
    $(".accordion-header").on("click", function() {
        var $button = $(this);
        var $content = $button.next(".accordion-content");
        var isOpen = $button.attr("aria-expanded") === "true";

        $button.attr("aria-expanded", !isOpen);
        $content.attr("hidden", isOpen);
    });
});