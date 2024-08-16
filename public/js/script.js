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
    $('.progress').each(function() {
        var percentage = $(this).data('percentage');
        $(this).css('width', percentage + '%');
    });
});

$(document).ready(function() {
    $(".open-btn").on("click", function() {
        $("#offCanvas").removeClass(".visibility-none");
        $("#offCanvas").addClass(".visibility");
    });

    $(".close-btn").on("click", function() {
        $("#offCanvas").removeClass(".visibility");
        $("#offCanvas").addClass(".visibility-none");
    });
});