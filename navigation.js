'use strict';

// Handles the various navigation elements in the app:
//  getStartedButton: Button displayed on introductory landing card
//  - When clicked, loads the landing card's Matchup Comparison Form
//  navButtons: One in the header (technically an anchor element) and
//    one floating in the lower right-hand corner of small screens.
//    - When clicked, make the navDrawer appear
//  navDrawer: Sidebar that includes the Matchup Comparison Form
//  hideNavButton: Button on the navDrawer
//  - When pressed, hides the navDrawer
//  ALSO:
//  Responsive breakpoints trigger jQuery events to reset navigation
//    visibility settings

/* =========================== 
   = EVENT HANLDER FUNCTIONS =
   =========================== */

/* === Initialize nav display system on page load === */

function pageLoadNavSystem() {
  // Detects the initial screen width, and updates the nav drawer display
  //  variables accordingly.
  
  // Set initial screenIsNarrow value
  checkScreenWidthStatus();
  
  // Set initial narrowScreenNav value
  wideNavScreenGlobal = screenIsWideGlobal; //Note: Both boolean
  
  // Hide the navDrawer on page load
  hideNavDrawer();
  hideNavButtons();
  
}

/* === HANDLE CHANGING SCREEN SIZE EVENTS === */

function handlePageResize() {
  
  // When the page resizes...
  $(window).on('resize', function(e) {
    
    // Update screenIsWideGlobal
    checkScreenWidthStatus();
    
    // If the screen & nav are no longer aligned...
    if (screenIsWideGlobal != wideNavScreenGlobal) {
      
      // Only change if the landing page has already been dismissed
      if (landingPageDismissedGlobal) {

        // If the screen became wide...
        if (screenIsWideGlobal) {
          showNavDrawer();
          hideNavButtons();
        // Otherwise...
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

/* === HANDLE NAV BUTTON CLICKS === */

function handleNavButtonClicks() {
  // Handle actions when a user clicks the show/hide nav drawer element
  
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

/* ====================
   = HELPER FUNCTIONS =
   ==================== */

  function checkScreenWidthStatus() {
    // Checks the screen width in comparison to the screenThresholdGlobal,
    // and updates screenIsWideGlobal, if necessary
  
    screenIsWideGlobal = (window.innerWidth >= screenThresholdGlobal);
    
  }
  
  function showNavDrawer() {
    // Triggers transitions to make navDrawer visible


    // TODO: How to prevent .show() from interrupting transitions?
    
    $('.js-nav-shim').show();
    $('.js-nav-shim').css('left', '0px');
    $('.js-nav-shim').css('background', 'rgba(0,0,0,.3)');

  }
  
  function hideNavDrawer() {
    // Triggers transitions to hide navDrawer and show toggleButtons

    $('.js-nav-shim').css('background', 'rgba(0,0,0,.3');
    $('.js-nav-shim').css('left', '-9999px');

  }
  
  function showNavButtons() {
    // Display the nav buttons
    
    // Only works if screen is NOT wide
    if(!screenIsWideGlobal) {
      $('.js-show-nav-drawer').show().css('transform', 'scale(1)'); 
    }
  }
  
  function hideNavButtons() {
    // Hide the nav buttons
    
    $('.js-show-nav-drawer').css('transform', 'scale(0)').hide();
  }

/* ================
   = LAUNCH CODES =
   ================ */

$(pageLoadNavSystem());
$(handlePageResize);
$(handleNavButtonClicks);