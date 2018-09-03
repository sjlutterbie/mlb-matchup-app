'use strict';

/* =====================
   = ON LOAD FUNCTIONS =
   ===================== */
   
function populateMatchupForm() {
  // Populates the Matchup Comparison Form with a list of all active MLB Teams
  
  $(fantasyDataAPIQuery('teams', buildMatchupFormOptions));
   
}

  /* === populateMatchupComparisonForms helper functions === */
  
  function buildMatchupFormOptions(teams) {
    // Renders options for MatchupComparisonForm dropdown
    // Note: Callback function for fantasyData API request
    
    // Create empy HTML
    let optionsHTML = "";
    
    // Loop through teams
    
    for (let i = 0; i < teams.length; i++) {
      
      let team = teams[i];
      // Add the team to the option list
      optionsHTML += `<option value="${team.Key}">${team.Name}</option>`;

    }
    
    // Populate BOTH team dropdown lists
    $('.js-team-select').append(optionsHTML);

  }
  
/* ===========================
   = MATCHUP FORM SUBMISSION = 
   =========================== */

function handleMatchupFormSubmission() {
  
  // When the user submits MatchupForm:
  $('.js-matchup-form').submit(function(e) {
    e.preventDefault();
    
    // Collect data from form
    let team1 = this[0].value;
    let team2 = this[1].value;
    let season = this[2].value;

    // If one or both teams missing...
    if (team1 === "" || team2 === "") {
      
      // ...Show the "two teams alert" and exit the function
      $('.js-form-alert-two-teams').show()
      return; 
    
    }
    
    // If the two teams are the same...
    if (team1 === team2) {
      
      // ... Show the "distinct teams alert" and exit the function
      $('.js-form-alert-dist-teams').show()
      return;
    }


  });
  
  
}

// When the user clicks the "Compare" button...
  // Check if two teams have been selected.
    // If two teams have NOT been selected:
      // Throw an alert and require two teams be selected.
    // If two teams HAVE been selected:
      // Hide the .js-form-alert element
      // Check if the relevant season's data is in memory
        // If the data IS in memory:
          // Proceed to generating matchup analysis
        // If the data is NOT in memory:
          // Call the API to load the data into memory
          // Once data is loaded into memory, proceed to generating matchup analysis



// Launch codes!

function initFunctions() {
  
  handleMatchupFormSubmission();
  populateMatchupForm();
  
}



$(initFunctions);