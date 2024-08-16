$(document).ready(function() {
    $(".accordion-header").on("click", function() {
        var $button = $(this);
        var $content = $button.next(".accordion-content");
        var isOpen = $button.attr("aria-expanded") === "true";

        // Close all accordion items
        $(".accordion-header").attr("aria-expanded", false);
        $(".accordion-content").attr("hidden", true);

        // Open the clicked accordion item if it was not already open
        if (!isOpen) {
            $button.attr("aria-expanded", true);
            $content.attr("hidden", false);
        }
    });
});

$(document).ready(function() {
    $(".open-btn").on("click", function() {
        $(".overlay").addClass("visible");
    });

    $(".off-canvas-menu a").on("click", function() {
        $(".overlay").removeClass("visible");
    });
});