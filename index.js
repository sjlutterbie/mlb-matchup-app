'use strict';

/* =====================
   = ON LOAD FUNCTIONS =
   ===================== */
   
function populateMatchupComparisonForm() {
  // Populates the Matchup Comparison Form with a list of all active MLB Teams
  
  $(fantasyDataAPIQuery('teams', buildMCFOptions));
   
}

  /* === populateMatchupComparisonForms helper functions === */
  
  function buildMCFOptions(teams) {
    // Renders options for MatchupComparisonForm dropdown
    // Note: Callback function for fantasyData API request
    
    
    // Create empy HTML
    let optionsHTML = "";
    
    
    // Loop through teams
    
    for (let i = 0; i < teams.length; i++) {
      
      optionsHTML += `<option value="${teams[i].Key}">${teams[i].Name}</option>`;
      
    }
    
    $('.js-team-select').html(optionsHTML);

  }


$(populateMatchupComparisonForm);