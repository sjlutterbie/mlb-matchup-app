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
    let season = String(this[2].value);

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

    // The form submission looks good, so clear alerts and move forward:
    $('.js-form-alert-two-teams').hide();
    $('.js-form-alert-dist-teams').hide();
    
    console.log(season);
    
    // Check for season data in memory:
    if (seasonDataGlobal[season]) {
      // If it exsists...

      // TODO
        console.log("Season data exists!");
        // Proceed to generating matchup analysis

    } else {
      // If it doesn't...
      
      //TODO
        console.log("Season data doesn't exist!");
        // Call the API to load the data into memory
        // Once data is loaded into memory, proceed to generating matchup analysis
    }
  });
}


/* ================
   = LAUNCH CODES =
   ================ */

function initFunctions() {
  
  handleMatchupFormSubmission();
  populateMatchupForm();
  
}



$(initFunctions);