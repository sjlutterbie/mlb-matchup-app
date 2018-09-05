'use strict';

/* ================================
   = MATCHUP COMPARISON GENERATOR =
   ================================ */

  function generateMatchupComparison(team1, team2, season) {
    // Central function that calls the individual matchup comparison analyses
    
    console.log(`Generating ${team1} vs ${team2} comparison for ${season} season...`);
    console.log(seasonDataGlobal[season].Games);

    
    // Head-to-Head W-L, including table of individual box scores
    generateHeadtoHeadSummaryCard(team1, team2, season);
    
    // Combined box score summary, plus other comparisons, if available
    generateCombinedBoxScoreCard(team1, team2, season);
    
    // A summary of upcoming matches, if they have any.
    generateUpcomingGamesCard(team1, team2, season);

    // Side-by-side comparison of overall season stats
    generateSeasonComparisonCard(team1, team2, season);
    
    // A "win tracker" charting their relative progress over the course of the season
    generateWinTrackerCard(team1, team2, season);
  
  }
  
/* ====================================
   = MATCHUP CARD GENERATOR FUNCTIONS =
   ==================================== */

  function generateHeadtoHeadSummaryCard(team1, team2, season) {
    // Generate the Head-to-Head W-L Card, including table of individual box scores
  
    // Initiate cardID and content string
    const cardID = 'HeadtoHead';
    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
    
    // Extract team1's games
      // NOTES: AwayTeam & HomeTEam
      
      // Initiate data object
      let data = {};
      
      // Select games involving team 1
      seasonDataGlobal[season].Games.forEach(game => {
        
          if ([game.HomeTeam, game.AwayTeam].includes(team1)) {
            data[game.GameID] = game;
          }
      });
      
      console.table(data);
    
    // Filter only the games between team1 and team2
    
    // Filter only complete and not-yet-played games
    
    // From complete games, calculate W-L
    
    // Count not-yet-played games
    
    // Create summary paragraph
    
    // Create game details table

    
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Insert content into card
    $(`#${cardID}`).html(cardHTML);
    
  }
    
  function generateCombinedBoxScoreCard(team1, team2, season) {
    // Combined box score summary, plus other comparisons, if available
    
    // Initiate cardID and content string
    
    const cardID = 'CombinedBoxScore';
    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
    
    //TODO: Generate content
    
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Insert content into card
    $(`#${cardID}`).html(cardHTML);
    
  }
  
  function generateUpcomingGamesCard(team1, team2, season) {
    // A summary of upcoming games, if they have any.
    
    // Initiate cardID and content string
    const cardID = 'UpcomingGames';
    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
    
    //TODO: Generate content
    
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Insert content into card
    $(`#${cardID}`).html(cardHTML);
    
  }
  
  function generateSeasonComparisonCard(team1, team2, season) {
    // Side-by-side comparison of overall season stats

    // Initiate cardID and content string
    const cardID = 'SeasonComparison';
    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
    
    //TODO: Generate content
    
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Insert content into card
    $(`#${cardID}`).html(cardHTML);
    
  }
  
  function generateWinTrackerCard(team1, team2, season) {
    // A "win tracker" charting their relative progress over the course of the season
    
    // Initiate cardID and content string
    const cardID = 'WinTracker';
    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
    
    //TODO: Generate content
    
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Insert content into card
    $(`#${cardID}`).html(cardHTML);

  }
  
/* =======================================
   = MATCHUP COMPARISON HELPER FUNCTIONS =
   ======================================= */

  function generateMatchupComparisonCard(cardID) {
    // Generates the wrapper HTML for a matchup comparison card
    
    // Build HTML
    const cardHTML = `<section class="card js-card"
                               data-highlight="false"
                               id="${cardID}">
                      </section>`
                      
    // Create card
    
    $('main').append(cardHTML);
    
  }
  