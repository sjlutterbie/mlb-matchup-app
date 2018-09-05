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
    
    // Check for season data in memory:
    if (seasonDataGlobal[season]) {
      // If it exsists...

      // TODO
        console.log("Season data exists!");
        // Proceed to generating matchup analysis
        generateMatchupComparison(team1, team2, season);

    } else {
      // If it doesn't...
      
      //TODO
        console.log("Season data doesn't exist!");
        
        // Initialize seasonDataGLobal[season] object
        seasonDataGlobal[season] = {};
        
        console.log("Loading season data...");
        
        //TODO: Display "Loading..." animation
        
        // Begin "Data loading chain":
          // Load Game data...
          fantasyDataAPIQuery('Games',
            function(data) {
              storeSeasonData(data, 'Games', season);
            },
            season,
            // ...On complete, load Team Season Stats data
            function() {
              fantasyDataAPIQuery('TeamSeasonStats',
                  function(data) {
                    storeSeasonData(data, 'TeamSeasonStats', season);
                  },
                  season,
                  // ...On complete, generate Matchup Comparison
                  function() {
                    generateMatchupComparison(team1, team2, season);
                  }
              );
            }
          );
    }
  });
}

  function storeSeasonData(data, dataType, season) {
    // Stores data from API Query in seasonDataGlobal[season] object.
    
    seasonDataGlobal[season][dataType] = data;
    
  }
  
/* ======================
   = MATCHUP COMPARISON =
   ====================== */
  
  function generateMatchupComparison(team1, team2, season) {
    
    //TODO: Make this function actually do something.
    
    /*
    Mathup Cards to generate:
      * Head-to-head W-L
      * Includes a table with the box score for each matchup
      * How many games the two teams have remaining in the season
      * Combined box score across all head-to-head games
      * Side-by-side comparison of their overall season stats.
      * A 'win tracker' charting their relative progress over the course of the season.
      * The win tracker highlights the winner of head-to-head match-ups, with tooltips that display the score.
    */
    
    console.log(`Generating ${team1} vs ${team2} comparison for ${season} season...`);
    
    console.log(seasonDataGlobal);
    
  
  }


/* ================
   = LAUNCH CODES =
   ================ */

function initFunctions() {
  
  handleMatchupFormSubmission();
  populateMatchupForm();
  
}



$(initFunctions);