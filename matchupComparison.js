'use strict';

/* ================================
   = MATCHUP COMPARISON GENERATOR =
   ================================ */

  function generateMatchupComparison(team1, team2, season) {
    // Central function that calls the individual matchup comparison analyses
    
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
  
  // Get head-to-head games
  let games = getHeadtoHeadGames(team1, team2, seasonDataGlobal[season].Games);
  
  // Initiate gameCounts
  const gameCounts = {};
    gameCounts[team1] = 0;
    gameCounts[team2] = 0;
    gameCounts['scheduled'] = 0;
  
  // Initiate game box scores
  const gameBoxScores = [];

  // Loop through games, increasing counts & building output
  
  for (let key in games) {
    
    // Extract the current game
    const game = games[key];

    // Build "Box Score" array elements for completed games
    gameBoxScores.push(buildBoxScoreElement(game));

    // Build gameCounts
    
    // For completed games...
    if (game.Status === "Final") {
      
      // If the home team won...
      if (game.HomeTeamRuns > game.AwayTeamRuns) {
        // Give the home team a win
        gameCounts[game.HomeTeam] += 1;
      } else {
        // Or give the away team a win
        gameCounts[game.AwayTeam] += 1;
      }
    } else if (game.Status === "Scheduled") {
      // Increase the scheduled count
      gameCounts.scheduled += 1;
    }
  }

  // Build summary paragraph
    let summaryHTML = '';

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

  // Build game summary HTML
  let boxScoresHTML = '';
  
  gameBoxScores.forEach(game => {
    const gameHTML = `<p class="game-date">${game[0]}</p>${game[1]}`;
    boxScoresHTML += gameHTML;
  });
  
  // Initiate cardID and content strings
  const cardID = 'HeadtoHead';
    
  // Create card header
  const cardHeader = '<h2>Series summary</h2>';
    
  // Create the card
  generateMatchupComparisonCard(cardID);
  
  // Output summary paragraph
  $(`#${cardID}`).append(cardHeader)
                 .append(summaryHTML)
                 .append('<div id="gv-head-to-head"></div>')
                 .append(boxScoresHTML);
                 
  // Insert Google visualization
  drawHeadtoHeadPie(team1, team2, gameCounts);
  
  // Make chart responsive
  $(window).resize(function(){
      drawHeadtoHeadPie(team1, team2, gameCounts);
  });

  
  
                 
}

  function buildBoxScoreElement(game) {
    // Builds a "Box Score Array Element", consisting of the game date and:
    //  If the game is "Final": A box score table
    //  If the game is "Scheduled": A "TBD" string including the location
    
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
      gameResult = `
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
      
    } else if (game.Status === "Scheduled") {
      
      // Get hometeam city
      const awayTeam = getTeamInfo(game.AwayTeam, 'Name');
      const homeTeam = getTeamInfo(game.HomeTeam, 'Name');
      
      // Build a TBD game result
      gameResult = `<p class="tbd-game">${awayTeam} at ${homeTeam}</p>`;
    }
    
    // Return array element
    
    return [gameDateString, gameResult];
  
  }


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
    output.strikeouts = Math.floor(rawStats.PitchingStrikeouts);
    output.walks = Math.floor(rawStats.PitchingWalks);
    output.saves = Math.floor(rawStats.PitchingSaves);
    output.errors = Math.floor(rawStats.Errors);
    
    // Insert data into original object
    teamStats[team].output = output;
    
  });

  // Generate HTML output


  const cardHTML = `
    <div id="gv-season-overall-table"><h3>Overall Stats</h3></div>
    <div id="gv-season-batting-table"></div>
    <div id="gv-season-pitching-table"></div>`;
  

  // Create the card
  generateMatchupComparisonCard(cardID);

  const cardHeader = '<h2>Team Season Stats Comparison</h2>';

  // Insert content into card
  $(`#${cardID}`).append(cardHeader).append(cardHTML);
  
  // Draw Google Viz tables
    // Overall
      const statsNamesOverall = [
        ['string', 'Team'],
        ['number', 'W'],
        ['number', 'L'],
        ['number', 'Pct.'],
        ['number', 'Runs for'],
        ['number', 'Runs against']
      ];

      const statsDataOverall = [
        [team1,
          Number(teamStats[team1].output.wins),
          Number(teamStats[team1].output.losses),
          Number(teamStats[team1].output.winPerc),
          Number(teamStats[team1].output.runsFor),
          Number(teamStats[team1].output.runsAgainst)
        ],
        [team2,
          Number(teamStats[team2].output.wins),
          Number(teamStats[team2].output.losses),
          Number(teamStats[team2].output.winPerc),
          Number(teamStats[team2].output.runsFor),
          Number(teamStats[team2].output.runsAgainst)
        ]
      ];

    drawSeasonStatsTable(statsNamesOverall, statsDataOverall, 'gv-season-overall-table');
      // Insert chart title
      $('#gv-season-overall-table').prepend('<h3>Overall Stats</h3>');

    // Batting
      const statsNamesBatting = [
        ['string', 'Team'],
        ['number', 'Avg.'],
        ['number', 'Obp.'],
        ['number', 'Slg.'],
        ['number', 'H'],
        ['number', 'HR']
      ];

      const statsDataBatting = [
        [team1,
          Number(teamStats[team1].output.avg),
          Number(teamStats[team1].output.obp),
          Number(teamStats[team1].output.slg),
          Number(teamStats[team1].output.hits),
          Number(teamStats[team1].output.homeRuns)
        ],
        [team2,
          Number(teamStats[team2].output.avg),
          Number(teamStats[team2].output.obp),
          Number(teamStats[team2].output.slg),
          Number(teamStats[team2].output.hits),
          Number(teamStats[team2].output.homeRuns)
        ]
      ];

    drawSeasonStatsTable(statsNamesBatting, statsDataBatting, 'gv-season-batting-table');
      // Insert chart title
      $('#gv-season-batting-table').prepend('<h3>Batting Stats</h3>');
    
    // Pitching
      const statsNamesPitching = [
        ['string', 'Team'],
        ['number', 'Era.'],
        ['number', 'Whip.'],
        ['number', 'Saves'],
        ['number', 'K'],
        ['number', 'BB']
      ];

      const statsDataPitching = [
        [team1,
          Number(teamStats[team1].output.era),
          Number(teamStats[team1].output.whip),
          Number(teamStats[team1].output.saves),
          Number(teamStats[team1].output.strikeouts),
          Number(teamStats[team1].output.walks)
        ],
        [team2,
          Number(teamStats[team2].output.era),
          Number(teamStats[team2].output.whip),
          Number(teamStats[team2].output.saves),
          Number(teamStats[team2].output.strikeouts),
          Number(teamStats[team2].output.walks)
        ]
      ];

    drawSeasonStatsTable(statsNamesPitching, statsDataPitching, 'gv-season-pitching-table');
      // Insert chart title
      $('#gv-season-pitching-table').prepend('<h3>Pitching Stats</h3>');

  // Make tables responsive
  $(window).resize(function(){
    drawSeasonStatsTable(statsNamesBatting, statsDataBatting, 'gv-season-batting-table');
      // Insert chart title
      $('#gv-season-batting-table').prepend('<h3>Batting Stats</h3>');
    drawSeasonStatsTable(statsNamesOverall, statsDataOverall, 'gv-season-overall-table');
      // Insert chart title
      $('#gv-season-overall-table').prepend('<h3>Overall Stats</h3>');
    drawSeasonStatsTable(statsNamesPitching, statsDataPitching, 'gv-season-pitching-table');
      // Insert chart title
      $('#gv-pitching-overall-table').prepend('<h3>Pitching Stats</h3>');

  });
  
}


/* === WIN TRACKER === */

function generateWinTrackerCard(team1, team2, season) {
  // A "win tracker" charting their relative progress over the course of the season
  
  // Initiate cardID and content string
  const cardID = 'WinTracker';
  let cardHTML = `<div id="gv-win-tracker"></div>`;
  
  // Initialize key variables
  const teamWinData = [];
  const winCounts = {};
    winCounts[team1] = 0;
    winCounts[team2] = 0;
  
  let gameWinner = "";
  
  // Shorthand variable, for convenience
  const games = seasonDataGlobal[season].Games;
  
  // Loop through all the games..
  for (let i = 0; i < games.length; i++) {
    
    // If the game is complete...
    if (games[i].Status === "Final") {
      // If one of the teams was involved...
      if ([team1, team2].includes(games[i].HomeTeam) || [team1, team2].includes(games[i].AwayTeam)) {
      
        // If the home team won..
        if (games[i].HomeTeamRuns > games[i].AwayTeamRuns) {
          // The home team is the winner!
          gameWinner = games[i].HomeTeam;
        } else {
          // The away team is the winner!
          gameWinner = games[i].AwayTeam;
        }
        
        // If one of the relevant teams won
        if ([team1, team2].includes(gameWinner)) {
          // Increase the winning team's total
          winCounts[gameWinner] += 1;
          
          // Format the date
          
          let gameDay = new Date(games[i].Day);
          let gameDayStr = `${gameDay.getFullYear()}-${gameDay.getMonth()+1}-${gameDay.getDate()}`;
        
          // Add a data row
          teamWinData.push([gameDay, winCounts[team1], winCounts[team2]]);
        }
      }
    }
  }
  

  // Create the card
  generateMatchupComparisonCard(cardID);

  const cardHeader = '<h2>Team Wins Tracker</h2>';

  drawWinTracker(team1, team2, teamWinData);
  
  // Make chart responsive
  $(window).resize(function(){
    drawWinTracker(team1, team2, teamWinData);
  });

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
                      id="${cardID}" tabindex="1"></section>`;
                    
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