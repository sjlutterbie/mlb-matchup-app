'use strict';

/* ================================
   = MATCHUP COMPARISON GENERATOR =
   ================================ */

  function generateMatchupComparison(team1, team2, season) {
    // Central function that calls the individual matchup comparison analyses
    
    console.log(`Generating ${team1} vs ${team2} comparison for ${season} season...`);
    console.log(seasonDataGlobal[season].Games);

    // Clear any previous analysis
    $('main').html('');
    
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
//    let cardHTML = `This is the ${cardID} Card`; // TEMP DESIGN STRING
  
    // Get team1's games
    let games = getTeamGames(team1, seasonDataGlobal[season].Games);
    
    // Filter only the games between team1 and team2
    games = getTeamGames(team2, games);

    // Initiate gameCounts
    
    const gameCounts = {};
      gameCounts[team1] = 0;
      gameCounts[team2] = 0;
      gameCounts['scheduled'] = 0;
      
    // Initiate the gameResults table content string
    
    let gameResults = "";
    
    // Loop through games, increasing counts & building output
    
    for (let key in games) {
      
      // Extract the current game
      const game = games[key];

      // Format the game date string
      let gameDate = new Date(game.Day);
      const dateOptions = {month: 'long', day: 'numeric' };
      let gameDateString = gameDate.toLocaleDateString("en-US", dateOptions);

      // Initiate gameResult string
      let gameResult = "";

      // If the game was completed...
      // NOTE: Omits InProgress, Suspended, Postponed, or Canceled games
      if (game.Status === "Final") {
        
        // Build a complete game result
        gameResult = `<tr><td>${gameDateString}</td>
                      <td>${game.AwayTeam} ${game.AwayTeamRuns}
                      - ${game.HomeTeamRuns} ${game.HomeTeam}</td></tr>`;
        
        // If the home team won...
        if (game.HomeTeamRuns > game.AwayTeamRuns) {
          // Give the home team a win
          gameCounts[game.HomeTeam] += 1;
        } else {
          // Or give the away team a win
          gameCounts[game.AwayTeam] += 1;
        }
      } else if (game.Status === "Scheduled") {
        
        // Build a TBD game result
        gameResult = `<tr><td>${gameDateString}</td>
                      <td>TBD (at ${game.HomeTeam})</td></tr>`;
        
        // Increase the scheduled count
        gameCounts.scheduled += 1;
      }
      
      // Add game to the gameResults table
      gameResults += gameResult;
    
    }

    // Build the full game results table
    const gameResultsTable = `<table><tr><th>Date</th><th>Score</th></tr>
                              ${gameResults}</table>`;
    
    // Build the summary paragraph
      let summaryHTML = "";
      
      // If there are games remaining...
      if (gameCounts.scheduled > 0 ) {
        // If team1 leads the series...
        if (gameCounts[team1] > gameCounts[team2]) {
          summaryHTML = `<p>In the ${season} season, ${team1} have a
                         ${gameCounts[team1]} games to ${gameCounts[team2]}
                         series lead over ${team2}, with
                         ${gameCounts.scheduled} games remaining.`;
        // If team2 leads the series...
        } else if (gameCounts[team2] > gameCounts[team1]) {
          summaryHTML = `<p>In the ${season} season, ${team2} have a
                         ${gameCounts[team2]} games to ${gameCounts[team1]}
                         series lead over ${team1}, with
                         ${gameCounts.scheduled} games remaining.`;
        // If the series is tied...
        } else {
          summaryHTML = `<p>In the ${season} season, ${team1} and ${team2}
                         have split the head-to-head series ${gameCounts[team1]}
                         games apiece, with ${gameCounts.scheduled}
                         games remaining.`;
        }
      // If the series is complete
      } else {
        // If team1 won the series...
        if (gameCounts[team1] > gameCounts[team2]) {
          summaryHTML = `<p>In the ${season} season, ${team1} won the
                         head-to-head series against ${team2},
                         ${gameCounts[team1]} games to ${gameCounts[team2]}.`;
        // If team2 leads the series...
        } else if (gameCounts[team2] > gameCounts[team1]) {
          summaryHTML = `<p>In the ${season} season, ${team2} won the
                         head-to-head series against ${team1},
                         ${gameCounts[team2]} games to ${gameCounts[team1]}.`;
        // If the series is tied...
        } else {
          summaryHTML = `<p>In the ${season} season, ${team1} and ${team2}
                        split the head-to-head series
                        ${gameCounts[team1]} games apiece.`;
        }
      }
      
    // Create the card
    generateMatchupComparisonCard(cardID);

    // Output summary paragraph
    $(`#${cardID}`).append(summaryHTML).append(gameResultsTable);
    
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
  const cardHTML = `<section class="card js-card" data-highlight="false"
                      id="${cardID}"></section>`;
                    
  // Create card
  $('main').append(cardHTML);
  
}
  
function getTeamGames(team, gameSet) {
  // From {gameSet}, select all the games in which {team} played
  
  // Create data object
  const data = {};
  
  // Select games involving team
  Object.keys(gameSet).forEach(key => {
    const game = gameSet[key];
    
    if ([game.HomeTeam, game.AwayTeam].includes(team)) {
      data[key] = game;
    }
    
  });
  
  return data;
  
}
  

  
  