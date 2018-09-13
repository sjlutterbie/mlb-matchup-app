'use strict';

/* =====================
   = ON LOAD FUNCTIONS =
   ===================== */

  // NOTE: fantasyData API functions can be found in fantasyData.js
   
function populateMatchupForm() {
  // Populates the Matchup Comparison Form with a list of all active MLB Teams
  
  $(fantasyDataAPIQuery('teams', buildMatchupFormOptions));
   
}


  /* === populateMatchupComparisonForms helper functions === */
  
  function buildMatchupFormOptions(teams) {
    // Renders options for MatchupComparisonForm dropdown
    // Note: Callback function for fantasyData API request

    
    // Store team information in global variable
    storeTeamInfoData(teams);
    
    // Generate option list
    const optionsHTML =  buildMatchupFormHTML(teams);
  
    // Populate BOTH team dropdown lists
    $('.js-team-select').append(optionsHTML);

  }
  
  function buildMatchupFormHTML(teams) {
    // Takes a list of teams, plus their leagues and divisions, and returns a
    // list of the same, sorted by league & division
    
    // Initalize teamOps object
    const teamOpts = {
      AL: {
        West: [],
        Central: [],
        East: []
      },
      NL: {
        West: [],
        Central: [],
        East: []
      }
    };
    
    // Loop through teams
    
    for (let key in teams) {
      
      // Extract variables for brevity
      let league = teams[key].League;
      let division = teams[key].Division;

      // Add team to teamOpts
      teamOpts[league][division].push(teams[key]);
      
    }
    
    // Initialize blank options list
    
    let teamOutput = [];
    
    // Loop through leagues
    for (let league in teamOpts){
      
      // Loop through divisions
      for (let division in teamOpts[league]) {
        
      // Create option group
      teamOutput.push(`<optgroup label="${league} ${division}">`);
        
        // Sort team lists
        teamOpts[league][division].sort((a, b) => {
          let textA = a.Name.toUpperCase();
          let textB = b.Name.toUpperCase();
          
          return  (textA < textB) ? -1 : 1;
          
        });
        
        // Add team options
        teamOpts[league][division].forEach(team => {
          teamOutput.push(`<option value="${team.Key}">${team.Name}</option>`);});
        }
      
        // Close option group
        teamOutput.push(`</optgroup>`);
      
    }
    
    return teamOutput;

  }
  
  
/* ===========================
   = MATCHUP FORM SUBMISSION = 
   =========================== */

function handleMatchupFormSubmission() {
  
  // When the user submits MatchupForm:
    // NOTE: Form submission hides nav drawer in navigation.js
  $('.js-matchup-form').submit(function(e) {
    e.preventDefault();
    
    // Submitting the form hides the landing page
    
    if (window.innerWidth < screenThresholdGlobal) {
          hideNavDrawer();
          hideNavButtons();
    }

    // Collect data from form...
    let team1 = this[0].value;
    let team2 = this[1].value;
    let season = String(this[2].value);
    
    // Repopulate the form for next use
    $('select[name="team1"]').val(team1);
    $('select[name="team2"]').val(team2);
    $('select[name="season"]').val(season);
 
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
    
    // If the season data already exists in seasonDataGobal...
    if (seasonDataGlobal[season]) {

        // Proceed to generating matchup analysis
        generateMatchupComparison(team1, team2, season);

    // If it doesn't already exist...
    } else {

        // Initialize seasonDataGLobal[season] object
        seasonDataGlobal[season] = {};
        
        //TODO: Display "Loading..." animation
        
        // Begin "Data loading chain":
        
          //Load processing image
          loadProcessingIcon('loading-spinner.gif');
    
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
  
  // NOTE: Matchup Comparison functions can be found in matchupComparison.js

  function loadProcessingIcon(img) {
    // Replace the main content with a processing icon
    
    const processingHTML = `
    <img src="${img}" class="loading-spinner js-loading-spinner"
      alt="Data is loading and will display momentarily">`;
      
    $('main').html(processingHTML);
    
  }
  
/* =======================
   = TEAM INFO FUNCTIONS =
   ======================= */

function storeTeamInfoData(teams) {
  // Stores team data from API Query in teamInfoGlobal object.
  
  teamInfoGlobal = teams;
}

function getTeamInfo(teamID, item) {
  // Get a specific item from the teamInfoGlobal object
  
  // Get the team object
  const teamInfo = teamInfoGlobal.find(team => {
    
      return team.Key === teamID;
    
  });
  
  // Enable "ALL" to return full object
  if (item === "ALL") {
    return teamInfo;
  } else {
    return teamInfo[item];
  }

}



/* ================
   = LAUNCH CODES =
   ================ */

function initFunctions() {
  
  handleMatchupFormSubmission();
  populateMatchupForm();
}



$(initFunctions);