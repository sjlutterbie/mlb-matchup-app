'use strict';

/* =========================== 
   = EVENT HANLDER FUNCTIONS =
   =========================== */

/* === Initialize nav display system on page load === */

function pageLoadNavSystem() {
  // Detects the initial screen width, and updates the nav drawer display
  //  variables, accordingly
  
  // Set initial screenIsNarrow value
  checkScreenWidthStatus();
  
  // Set initial narrowScreenNav value
  wideNavScreenGlobal = screenIsWideGlobal;
  
  // Hide the navDrawer on page load
  hideNavDrawer();
  hideNavButtons();
  
}

/* === HANDLE CHANGING SCREEN SIZE EVENTS === */

function handlePageResize() {
  
  // When the page resizes...
  $(window).on('resize', function(e) {
    
    // Update screenIsNarrowGlobal
    checkScreenWidthStatus();
    
    // If the screen & nav are no longer aligned...
    if (screenIsWideGlobal != wideNavScreenGlobal) {
      
      // Only change if the landing page has been dismissed
      if (landingPageDismissedGlobal) {

        // If the screen became wide...
        if (screenIsWideGlobal) {
          showNavDrawer();
          hideNavButtons();
        } else {
          hideNavDrawer();
          showNavButtons();
        }
      }
      
      // Update wideScreenGlobal to match
      wideNavScreenGlobal = screenIsWideGlobal;

    }
  });
}

/* === HANDLE BUTTON CLICKS === */

function handleNavToggleClicks() {
  // Handle actions when a user clicks a show/hide nav drawer element
  
  $('html').on('click', '.js-show-nav-drawer', function(e) {

    e.preventDefault();
    showNavDrawer();
    hideNavButtons();
    
  });

  $('html').on('click', '.js-hide-nav-drawer', function(e) {
    
    e.preventDefault();
    hideNavDrawer();
    showNavButtons();
    
  });
  
}

  /* === HELPER FUNCTIONS === */

  function checkScreenWidthStatus() {
    // Checks the screen width in comparison to the screenThreshold, and
    //  updates screenIsNarrow, if necessary
  
    screenIsWideGlobal = (window.innerWidth >= screenThresholdGlobal);
    
  }
  

  function showNavDrawer() {
    // Triggers transitions to make navDrawer visible

    // Make the nav drawer slide in
    $('.js-nav-shim').attr('hidden', false);
    $('.js-nav-shim').removeClass('nav-shim-hidden');
    $('.js-nav-shim').addClass('nav-shim-shown');

  }
  
  function hideNavDrawer() {
    // Triggers transitions to hide navDrawer and show toggleButtons

    // Make the nav drawer slide out
    $('.js-nav-shim').removeClass('nav-shim-shown');
    $('.js-nav-shim').addClass('nav-shim-hidden');
    $('.js-nav-shim').attr('hidden', true);

  }
  
  function showNavButtons() {
    // Only works if screen is NOT wide
    if(!screenIsWideGlobal) {
      $('.js-show-nav-drawer').show().css('transform', 'scale(1)'); 
    }
  }
  
  function hideNavButtons() {
    $('.js-show-nav-drawer').css('transform', 'scale(0)').hide();
  }

/* === LAUNCH CODES === */

$(pageLoadNavSystem());
$(handlePageResize);
$(handleNavToggleClicks);
