'use strict';

/* === HANLDER FUNCTIONS === */

// When the page loads...
function showNavDrawerWideScreen() {
  
  // If the window is wider than the 660px responsive threshold...
  if (window.innerWidth >= 660) {
    
    // Show the nav drawer
    $('.js-nav-shim').removeClass('nav-shim-hidden');
    $('.js-nav-shim').addClass('nav-shim-shown');
    
    // Hide the nav toggle buttons
    $('.js-nav-toggle').hide();
  }
  
}

// Ways to make the navigation drawer appear:
function handleNavDrawerShow() {
  
  // When the user clicks on the "drawer icon" or the "float button" in the page header
  $('html').on('click', '.js-nav-toggle', function(e) {
    e.preventDefault();
    
    showNavDrawer();
    
  });
  
  // Handle responsive design transitions  
  $(window).on('resize', function(e) {
    
    // As long as window is wider than 660px responsive threshold...
    if (window.innerWidth >= 660) {
      
      // Make sure the nav drawer is visible
      if (!$('.js-nav-shim').hasClass('nav-shim-shown')) {
        $('.js-nav-shim').removeClass('nav-shim-hidden');
        $('.js-nav-shim').addClass('nav-shim-shown');
        $('.js-nav-toggle').hide();
      }
    }
  });

}

// Ways to make the navigation drawer disappear:
function handleNavDrawerHide() {
  
  // When the user clicks on the "hide navigation button"
  $('html').on('click', '.js-hide-nav-button', function(e){
    e.preventDefault();
    
    hideNavDrawer();

  });

  // NOTE: User submitting the matchup form handled in index.js

}    

  /* === HELPER FUNCTIONS === */
  
  function hideNavDrawer() {
    // Show the drawer icon and float button
    $('.js-nav-toggle').show().css('transform', 'scale(1)');
    
    // Make the nav drawer slide out
    $('.js-nav-shim').removeClass('nav-shim-shown');
    $('.js-nav-shim').addClass('nav-shim-hidden');


  }
  
  function showNavDrawer() {
    // Hide the drawer icon and float button
    $('.js-nav-toggle').css('transform', 'scale(0)').hide();
    
    // Make the nav drawer slide in
    $('.js-nav-shim').removeClass('nav-shim-hidden');
    $('.js-nav-shim').addClass('nav-shim-shown');

  }

  
/* === LAUNCH CODES === */

$(showNavDrawerWideScreen());
$(handleNavDrawerShow);
$(handleNavDrawerHide);