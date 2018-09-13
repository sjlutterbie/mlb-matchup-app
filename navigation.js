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
  setNavDrawerDisplay(false);
  
}

/* === HANDLE CHANGING SCREEN SIZE EVENTS === */

function handlePageResize() {
  
  // When the page resizes...
  $(window).on('resize', function(e) {
    
    // Update screenIsNarrowGlobal
    checkScreenWidthStatus();
    
    // If the screen & nav are no longer aligned...
    if (screenIsWideGlobal != wideNavScreenGlobal) {
      
      // Only change display is landing page is gone
      if (!landingPageVisibleGlobal) {

       // Show navDrawer on wide screens, hide on narrow screens
       setNavDrawerDisplay(wideNavScreenGlobal)
        
      }
      
      // Update wideScreenGlobal to match
      wideNavScreenGlobal = screenIsNarrowGlobal;

    }
    
  });
    
}

/* === HANDLE BUTTON CLICKS === */

function handleNavToggleClicks() {
  // Handle actions when a user clicks a show/hide nav drawer element
  
  $('html').on('click', '.js-show-nav-drawer', function(e) {

    e.preventDefault();
    showNavDrawer();
    
  });

  $('html').on('click', '.js-hide-nav-drawer', function(e) {
    
    e.preventDefault();
    hideNavDrawer();
    
  });
  
}

  /* === HELPER FUNCTIONS === */

  function checkScreenWidthStatus() {
    // Checks the screen width in comparison to the screenThreshold, and
    //  updates screenIsNarrow, if necessary
  
    screenIsWideGlobal = (window.innerWidth >= screenThresholdGlobal);
    
  }
  
  function setNavDrawerDisplay(shouldDisplay) {
    // Hide/display the navDrawer
    
    if (shouldDisplay) {
      showNavDrawer();
    } else {
      hideNavDrawer();
    }
    
  }

  function showNavDrawer() {
    // Triggers transitions to make navDrawer visible

    // Hide the drawer icon and float button
    $('.js-show-nav-drawer').css('transform', 'scale(0)').hide();
    
    // Make the nav drawer slide in
    $('.js-nav-shim').attr('hidden', false);
    $('.js-nav-shim').removeClass('nav-shim-hidden');
    $('.js-nav-shim').addClass('nav-shim-shown');

  }
  
  function hideNavDrawer() {
    // Triggers transitions to hide navDrawer and show toggleButtons
    // NOTE: toggleButtons' actual visibility determined by CSS (responsive)
    
    // Show the drawer icon and float button
    $('.js-show-nav-drawer').show().css('transform', 'scale(1)');
    
    // Make the nav drawer slide out
    $('.js-nav-shim').removeClass('nav-shim-shown');
    $('.js-nav-shim').addClass('nav-shim-hidden');
    $('.js-nav-shim').attr('hidden', true);

  }
  


/* === LAUNCH CODES === */

$(pageLoadNavSystem());
$(handlePageResize);
$(handleNavToggleClicks);
