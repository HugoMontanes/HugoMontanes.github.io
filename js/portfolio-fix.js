/**
 * Portfolio Enhancement JavaScript
 * Ensures isotope filtering works correctly with the enhanced portfolio
 */

$(document).ready(function() {
    
    // Make sure isotope is fully initialized after images load
    $(window).on('load', function() {
        
        // Re-initialize the gallery isotope with proper configuration
        var $gallery = $('.gallery').isotope({
            itemSelector: '.items',
            layoutMode: 'masonry',
            percentPosition: true,
            masonry: {
                columnWidth: '.width2',
                gutter: 0
            },
            // Add animation
            transitionDuration: '0.5s'
        });
        
        // Ensure filtering works
        $('.filtering').on('click', 'span', function() {
            var filterValue = $(this).attr('data-filter');
            $gallery.isotope({ filter: filterValue });
        });
        
        // Ensure active class switching works
        $('.filtering').on('click', 'span', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
        
        // Add default active class to "All" if not present
        if ($('.filtering span.active').length === 0) {
            $('.filtering span[data-filter="*"]').addClass('active');
        }
        
        console.log('Portfolio isotope initialized successfully');
    });
    
});
