/** OffCanvas Menu */

$(document).ready(function() {
    // Select the menu toggle and off-canvas menu
    const menuToggle = $('.menu-toggle');
    const offCanvasMenu = $('.off-canvas-menu');
    const closeBtn = $('.close-btn');

    // Show the off-canvas menu when the toggle button is clicked
    menuToggle.on('click', function() {
        offCanvasMenu.addClass('active');
    });

    // Hide the off-canvas menu when the close button is clicked
    closeBtn.on('click', function() {
        offCanvasMenu.removeClass('active');
    });
});

/** Date ****/

const today = new Date().getFullYear();

$(document).ready(function() {
    $("#date").text(today);
});