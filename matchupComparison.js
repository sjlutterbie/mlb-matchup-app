'use strict';

/* ================================
   = MATCHUP COMPARISON GENERATOR =
   ================================ */

  function generateMatchupComparison(team1, team2, season) {
    // Central function that calls the individual matchup comparison analyses
    
    console.log(`Generating ${team1} vs ${team2} comparison for ${season} season...`);

    // Clear any previous analysis
    $('main').html('');
    
    // Head-to-Head W-L, including table of individual box scores
    generateHeadtoHeadSummaryCard(team1, team2, season);
    
    // Combined box score summary, plus other comparisons, if available
    // NOTE: Currently turned off; code commented out, below
    //  generateCombinedBoxScoreCard(team1, team2, season); 
    
    // Side-by-side comparison of overall season stats
    generateSeasonComparisonCard(team1, team2, season);
    
    // A "win tracker" charting their relative progress over the course of the season
    generateWinTrackerCard(team1, team2, season);
  
  }
  
/* ====================================
   = MATCHUP CARD GENERATOR FUNCTIONS =
   ==================================== */

/* === HEAD-TO-HEAD SUMMARY === */

function generateHeadtoHeadSummaryCard(team1, team2, season) {
  // Generate the Head-to-Head W-L Card, including table of individual box scores

  // Initiate cardID and content string
  const cardID = 'HeadtoHead';

  // Get head-to-head games
  let games = getHeadtoHeadGames(team1, team2, seasonDataGlobal[season].Games);

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
      gameResult = `<p class="game-date">${gameDateString}</p>
      <table class="box-score">
        <tr>
          <th>&nbsp;</th>
          <th class="box-score-stat">R</th>
          <th class="box-score-stat">H</th>
          <th class="box-score-stat">E</th>
        </tr>
        <tr>
          <td>${game.AwayTeam}</td>
          <td class="box-score-stat">${Math.floor(game.AwayTeamRuns)}</td>
          <td class="box-score-stat">${Math.floor(game.AwayTeamHits)}</td>
          <td class="box-score-stat">${Math.floor(game.AwayTeamErrors)}</td>
        </tr>
        <tr>
          <td>${game.HomeTeam}</td>
          <td class="box-score-stat">${Math.floor(game.HomeTeamRuns)}</td>
          <td class="box-score-stat">${Math.floor(game.HomeTeamHits)}</td>
          <td class="box-score-stat">${Math.floor(game.HomeTeamErrors)}</td>
        </tr>
      </table>`;
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
      gameResult = `<p class="game-date">${gameDateString} TBD (at ${game.HomeTeam})</p>`;
      
      // Increase the scheduled count
      gameCounts.scheduled += 1;
    }
    
    // Add game to the gameResults HTML
    gameResults += gameResult;
  
  }

  // Build the summary paragraph
    let summaryHTML = "";
    
    // If there are games remaining...
    if (gameCounts.scheduled > 0 ) {
      // If team1 leads the series...
      if (gameCounts[team1] > gameCounts[team2]) {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team1} have a
                       ${gameCounts[team1]} games to ${gameCounts[team2]}
                       series lead over ${team2}, with
                       ${gameCounts.scheduled} games remaining.`;
      // If team2 leads the series...
      } else if (gameCounts[team2] > gameCounts[team1]) {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team2} have a
                       ${gameCounts[team2]} games to ${gameCounts[team1]}
                       series lead over ${team1}, with
                       ${gameCounts.scheduled} games remaining.`;
      // If the series is tied...
      } else {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team1} and ${team2}
                       have split the head-to-head series ${gameCounts[team1]}
                       games apiece, with ${gameCounts.scheduled}
                       games remaining.`;
      }
    // If the series is complete
    } else {
      // If team1 won the series...
      if (gameCounts[team1] > gameCounts[team2]) {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team1} won the
                       head-to-head series against ${team2},
                       ${gameCounts[team1]} games to ${gameCounts[team2]}.`;
      // If team2 leads the series...
      } else if (gameCounts[team2] > gameCounts[team1]) {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team2} won the
                       head-to-head series against ${team1},
                       ${gameCounts[team2]} games to ${gameCounts[team1]}.`;
      // If the series is tied...
      } else {
        summaryHTML = `<p class="head-to-head-summary">In the ${season} season, ${team1} and ${team2}
                      split the head-to-head series
                      ${gameCounts[team1]} games apiece.`;
      }
    }
    
  // Create card header
  const cardHeader = '<h2>Series summary</h2>';
    
  // Create the card
  generateMatchupComparisonCard(cardID);

  // Output summary paragraph
  $(`#${cardID}`).append(cardHeader)
                 .append(summaryHTML)
                 .append(gameResults);
}
  
/* === COMBINED BOX SCORE === */  

/*

function generateCombinedBoxScoreCard(team1, team2, season) {
  // Combined box score summary, plus other comparisons, if available
  
  // Initiate cardID and content string
  const cardID = 'CombinedBoxScore';

  // Get head-to-head games
  let games = getHeadtoHeadGames(team1, team2, seasonDataGlobal[season].Games);
  
  // Initiate output boxScore
  const boxScore = {};
    boxScore[team1] = {};
    boxScore[team2] = {};
    
    boxScore[team1].runs = 0;
    boxScore[team2].runs = 0;
    
    boxScore[team1].hits = 0;
    boxScore[team2].hits = 0;
    
    boxScore[team1].errors = 0;
    boxScore[team2].errors = 0;
    
  // Loop through games, compiling Box Score
  for (let key in games) {
    
    // Extract the current game
    const game = games[key];
    
    // Set home and away teams (for clarity)
    const homeTeam = game.HomeTeam;
    const awayTeam = game.AwayTeam;
    
    // Update box score
    boxScore[awayTeam].runs += game.AwayTeamRuns;
    boxScore[homeTeam].runs += game.HomeTeamRuns;
    
    boxScore[awayTeam].hits += game.AwayTeamHits;
    boxScore[homeTeam].hits += game.HomeTeamHits;
    
    boxScore[awayTeam].errors += game.AwayTeamErrors;
    boxScore[homeTeam].errors += game.HomeTeamErrors;

  }
  
  // Generate combined box score HTML
  const combinedBoxScoreTable = `
    <table>
      <tr>
        <th>&nbsp;</th>
        <th>Runs</th>
        <th>Hits</th>
        <th>Errors</th>
      </tr>
      <tr>
        <td>${team1}</td>
        <td>${boxScore[team1].runs}</td>
        <td>${boxScore[team1].hits}</td>
        <td>${boxScore[team1].errors}</td>
      </tr>
      <tr>
        <td>${team2}</td>
        <td>${boxScore[team2].runs}</td>
        <td>${boxScore[team2].hits}</td>
        <td>${boxScore[team2].errors}</td>
      </tr>
    </table>
  `;
  
  // Create card Header
  const cardHeader = '<h2>Combined box score</h2>';
  
  // Create the card
  generateMatchupComparisonCard(cardID);

  // Insert content into card
  $(`#${cardID}`).append(cardHeader).append(combinedBoxScoreTable);
  
}

*/

/* === SEASON STATS COMPARISON === */

function generateSeasonComparisonCard(team1, team2, season) {
  // Side-by-side comparison of overall season stats

  // Initiate cardID and content string
  const cardID = 'SeasonComparison';

  // Initiate stats object
  const teamStats = {};
  
  //For each team...
  [team1, team2].forEach(team => {
    
    // Initialize team stats object
    teamStats[team] = {};
    
    // Get raw stats
    teamStats[team].raw = getTeamStats(team, season);
    
    // Shorter var names, for convenience
    const rawStats = teamStats[team].raw;
    const output = {};
    
    // Clean calculate the relevant Team Stats
    output.wins = Math.floor(rawStats.Wins);
    output.losses = Math.floor(rawStats.Losses);
    output.winPerc = (output.wins / (output.wins + output.losses)).toFixed(3);
    output.runsFor = Math.floor(rawStats.Runs);
    output.runsAgainst = Math.floor(rawStats.PitchingRuns);
    output.avg = (rawStats.Hits / rawStats.AtBats).toFixed(3);
    output.obp = ((rawStats.Hits + rawStats.Walks + rawStats.HitByPitch) 
                  / (rawStats.Hits + rawStats.Walks
                     + rawStats.HitByPitch + rawStats.AtBats)).toFixed(3);
    output.slg = ((rawStats.Singles
                  + (2 * rawStats.Doubles)
                  + (3 * rawStats.Triples)
                  + (4 * rawStats.HomeRuns)
                 ) / (rawStats.AtBats)).toFixed(3);
    output.hits = Math.floor(rawStats.Hits);
    output.doubles = Math.floor(rawStats.Doubles);
    output.triples = Math.floor(rawStats.Triples);
    output.homeRuns = Math.floor(rawStats.HomeRuns);
    output.era = (rawStats.PitchingEarnedRuns
                 / (rawStats.InningsPitchedDecimal / 9)).toFixed(3);
    output.whip = ((rawStats.PitchingHits + rawStats.PitchingWalks)
                  / rawStats.InningsPitchedDecimal).toFixed(3);
    output.errors = Math.floor(rawStats.Errors);
    
    // Insert data into original object
    teamStats[team].output = output;
    
  });

  // Generate HTML output


  // <div id="season-comp-table"></div>`;
  
  const cardHTML = `
  <div class="season-comparison-container">
    <table class="season-comparison">
      <tr>
        <th>&nbsp;</th>
        <th>W</th>
        <th>L</th>
        <th>Pct.</th>
        <th>Rf</th>
        <th>Ra</th>
        <th>Avg.</th>
        <th>Obp.</th>
        <th>Slg.</th>
        <th>H</th>
        <th>2B</th>
        <th>3B</th>
        <th>HR</th>
        <th>Era.</th>
        <th>Whip</th>
        <th>E</th>
      </tr>
      <tr>
        <th>${team1}</th>
        <td>${teamStats[team1].output.wins}</td>
        <td>${teamStats[team1].output.losses}</td>
        <td>${teamStats[team1].output.winPerc}</td>
        <td>${teamStats[team1].output.runsFor}</td>
        <td>${teamStats[team1].output.runsAgainst}</td>
        <td>${teamStats[team1].output.avg}</td>
        <td>${teamStats[team1].output.obp}</td>
        <td>${teamStats[team1].output.slg}</td>
        <td>${teamStats[team1].output.hits}</td>
        <td>${teamStats[team1].output.doubles}</td>
        <td>${teamStats[team1].output.triples}</td>
        <td>${teamStats[team1].output.homeRuns}</td>
        <td>${teamStats[team1].output.era}</td>
        <td>${teamStats[team1].output.whip}</td>
        <td>${teamStats[team1].output.errors}</td>
      </tr>
      <tr>
        <th>${team2}</th>
        <td>${teamStats[team2].output.wins}</td>
        <td>${teamStats[team2].output.losses}</td>
        <td>${teamStats[team2].output.winPerc}</td>
        <td>${teamStats[team2].output.runsFor}</td>
        <td>${teamStats[team2].output.runsAgainst}</td>
        <td>${teamStats[team2].output.avg}</td>
        <td>${teamStats[team2].output.obp}</td>
        <td>${teamStats[team2].output.slg}</td>
        <td>${teamStats[team2].output.hits}</td>
        <td>${teamStats[team2].output.doubles}</td>
        <td>${teamStats[team2].output.triples}</td>
        <td>${teamStats[team2].output.homeRuns}</td>
        <td>${teamStats[team2].output.era}</td>
        <td>${teamStats[team2].output.whip}</td>
        <td>${teamStats[team2].output.errors}</td>
      </tr>
    </table>
  </div>
  `;
  

  // Create the card
  generateMatchupComparisonCard(cardID);

  const cardHeader = '<h2>Team Season Stats Comparison</h2>';

  // Insert content into card
  $(`#${cardID}`).append(cardHeader).append(cardHTML);
  
}

/* === WIN TRACKER === */

function generateWinTrackerCard(team1, team2, season) {
  // A "win tracker" charting their relative progress over the course of the season
  
  // Initiate cardID and content string
  const cardID = 'WinTracker';
  let cardHTML = `Data for this card is currently output to the console log.`; // TEMP DESIGN STRING
  
  // Initialize Team Wins object
  const teamWins = {};
    teamWins[team1] = [];
    teamWins[team2] = [];
    
  // For each team...
  [team1, team2].forEach(team => {

    // Get the games they've played in the season.
    const games = getTeamGames(team, seasonDataGlobal[season].Games);
    
    // Initialize win counter
    let winCount = 0;
  
    // Loop through the games
    for (let key in games) {
      
      // Convenience variable
      let game = games[key];
          
      // Only use complete games
      if (game.Status === "Final") {
        
        // Account for whether team is home or away
        if (game.HomeTeam === team) {
          // Team is home...
          if (game.HomeTeamRuns > game.AwayTeamRuns) {
            // It's a win!
            winCount += 1;
            // Store the date and win count in the teamWin array
            teamWins[team].push([game.Day, winCount,
                                `${game.AwayTeamRuns} - ${game.HomeTeamRuns}`,
                                game.AwayTeam]);
          }
       } else {
          //Team is away...
          if (game.HomeTeamRuns < game.AwayTeamRuns) {
            // It's a win!
            winCount += 1;
            // Store the date and win count in the teamWin array
            teamWins[team].push([game.Day, winCount,
                                `${game.AwayTeamRuns} - ${game.HomeTeamRuns}`,
                                game.HomeTeam]);
          }
        }
      }
    }
  });
  
  // Output data to console log, until Google Visualization is in place.
  //console.table(teamWins);
  
  // Create the card
  generateMatchupComparisonCard(cardID);

  const cardHeader = '<h2>Team Wins Tracker</h2>';

  // Insert content into card
  $(`#${cardID}`).append(cardHeader).append(cardHTML);

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
  
function getHeadtoHeadGames(team1, team2, gameSet) {
  // Daisy-chain getTeamGames() to get all games between two teams
  
  // Get team1's games
  let games = getTeamGames(team1, gameSet);
  
  // Filter only the games between team1 and team2
  games = getTeamGames(team2, games);

  return games;
}

function getTeamStats(team, season) {
  // Get {team}'s stats for a given {season}
  
  const stats = seasonDataGlobal[season].TeamSeasonStats.find(statLine => {
    return statLine.Team === team;
  });
  
  return stats;
  
}