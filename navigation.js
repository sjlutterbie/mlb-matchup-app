'use strict';

/* === HANLDER FUNCTIONS === */

// Ways to make the navigation drawer appear:
function handleNavDrawerShow() {
  
  // When the user clicks on the "drawer icon" or the "float button" in the page header
  $('html').on('click', '.js-nav-toggle', function(e) {
    e.preventDefault();

    showNavDrawer();
    
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
    $('.js-nav-shim').css('transform', 'translateX(-100%');
    $('.js-nav-shim').css('background', 'rgba(0,0,0,0)');
    
  }
  
  function showNavDrawer() {
    // Hide the drawer icon and float button
    $('.js-nav-toggle').css('transform', 'scale(0)').hide();
    
    // Make the nav drawer slide in
    $('.js-nav-shim').css('transform', 'translateX(0%');
    $('.js-nav-shim').css('background', 'rgba(0,0,0,.3)');
  }
 
  
/* === LAUNCH CODES === */

$(handleNavDrawerShow);
$(handleNavDrawerHide);