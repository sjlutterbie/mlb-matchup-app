'use strict';

// Functions that generate the content for the three matchup comparison cards:
// - Head-to-head record
// - Team season stats comparison
// - Time win tracker

/* =====================
   = CONTROLL FUNCTION =
   ===================== */

function generateMatchupComparison(team1, team2, season) {
  // Central function that calls the individual matchup comparison functions

  // Select team colors
  selectTeamColors(team1, team2);
  
  // Clear any previous analysis (or landing card condnetcontent)
  $('main').html('');
  
  // If first analysis, update state and adjust layout to accommodate navDrawer
  if (!landingPageDismissedGlobal) {
    
    landingPageDismissedGlobal = true;
    $('main').addClass('landing-page-dismissed');
  }

  // Update page header
  generatePageHeader(team1, team2, season);
  
  // On narrow screens, load nav buttons
  if (window.innerWidth < screenThresholdGlobal) {
    showNavButtons();
  }
  
  // On wide screens, load nav drawer
  if (window.innerWidth >= screenThresholdGlobal) {
    showNavDrawer();
  }

  // Call matchup comparison card functions
    generateHeadtoHeadSummaryCard(team1, team2, season);
    generateSeasonComparisonCard(team1, team2, season);
    generateWinTrackerCard(team1, team2, season);

}
 
/* ====================================
   = MATCHUP CARD GENERATOR FUNCTIONS =
   ==================================== */

/* === UPDATE HEADER === */

function generatePageHeader(team1, team2, season) {
  // Update the page header to reflect the current matchup comparison
  
  const headerHTML = `${team1} vs ${team2}, ${season} season`;
  
  $('header h1').html(headerHTML);
  
}

/* === HEAD-TO-HEAD SUMMARY === */

function generateHeadtoHeadSummaryCard(team1, team2, season) {
  // Generate the Head-to-Head W-L Card, including pie chart & box scores
  
  // Initiative variables
    // For counting wins
    const gameCounts = {};
      gameCounts[team1] = 0;
      gameCounts[team2] = 0;
      gameCounts['scheduled'] = 0;
    // Box score data
    const gameBoxScores = [];

  // Get head-to-head games
  let games = getHeadtoHeadGames(team1, team2, seasonDataGlobal[season].Games);
  
  // Process head-to-head games
  for (let key in games) {
    
    const game = games[key];

    // Build "Box Score" HTML tables for completed games
    gameBoxScores.push(buildBoxScoreElement(game));

    // Build gameCounts
    // NOTE: Omits InProgress, Suspended, Postponed, or Canceled games
    if (game.Status === "Final") {
    
      // If the home team won...
      if (game.HomeTeamRuns > game.AwayTeamRuns) {
        gameCounts[game.HomeTeam] += 1;
      } else {
        gameCounts[game.AwayTeam] += 1;
      }

    } else if (game.Status === "Scheduled") {

      // Increase the scheduled count
      gameCounts.scheduled += 1;

    }
  }

  // Build game summary HTML
  let completedGames = '';
  let upcomingGames = '';
  
  gameBoxScores.forEach(game => {
    if (game[1] === "Final") {
      // Box score
      completedGames += `<div class="box-score-container">
        ${game[2]}</div>`;
    } else {
      // Upcoming game
      upcomingGames += `<div class="box-score-container">
        <p class="game-date">${game[0]}</p>${game[2]}</div>`;
    }
  });

  // Build summary paragraph
    let summaryHTML = '';
    const team1City = getTeamInfo(team1, 'City');
    const team2City = getTeamInfo(team2, 'City');
    const team1Name = getTeamInfo(team1, 'Name');
    const team2Name = getTeamInfo(team2, 'Name');

    // CASE 1: There are games remaining
    if (gameCounts.scheduled > 0 ) {
      // If team1 leads the series...
      if (gameCounts[team1] > gameCounts[team2]) {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                       the ${team1City} ${team1Name} have a
                       ${gameCounts[team1]} games to ${gameCounts[team2]}
                       series lead over the ${team2City} ${team2Name}, with
                       ${gameCounts.scheduled} games remaining.`;
      // If team2 leads the series...
      } else if (gameCounts[team2] > gameCounts[team1]) {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                       the ${team2City} ${team2Name} have a
                       ${gameCounts[team2]} games to ${gameCounts[team1]}
                       series lead over the ${team1City} ${team1Name}, with
                       ${gameCounts.scheduled} games remaining.`;
      // If the series is tied...
      } else {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                       the ${team1City} ${team1Name} and the ${team2City}
                       ${team2Name} have split the head-to-head series
                       ${gameCounts[team1]} games apiece, with
                       ${gameCounts.scheduled} games remaining.`;
      }
    // CASE 2: The season series is complete
    } else if (gameCounts.scheduled === 0) {
      // If team1 won the series...
      if (gameCounts[team1] > gameCounts[team2]) {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                       the ${team1City} ${team1Name} won the 
                       head-to-head series against the ${team2City} 
                       ${team2Name},${gameCounts[team1]} games
                       to ${gameCounts[team2]}.`;
      // If team2 leads the series...
      } else if (gameCounts[team2] > gameCounts[team1]) {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                       the ${team2City} ${team2Name} won the
                       head-to-head series against the ${team1City} 
                       ${team1Name}, ${gameCounts[team2]} games
                       to ${gameCounts[team1]}.`;
      // If the series is tied...
      } else {
        summaryHTML = `<p class="card-summary">In the ${season} season,
                      the ${team1City} ${team1Name} and ${team2City}
                      ${team2Name} split the head-to-head series
                      ${gameCounts[team1]} games apiece.`;
      }
    }
      
    // OVERRIDE: If the teams never actually played each other
    if (Object.keys(games).length === 0 && games.constructor === Object) {
      
      let haveTense = "have";
      
      if (season != 2018) {
        haveTense = "had";
      }
      
      summaryHTML = `<p class="card-summary">${team1Name} and ${team2Name}
                     ${haveTense} no head-to-head games scheduled in the ${season}
                     season.</p>`;
    }

  // Put it all together and build the full card
    const cardID = 'HeadtoHead';
    const cardHeader = '<h2>Series summary</h2>';
      
    // Create the card
    generateMatchupComparisonCard(cardID);
    
    // Append card content strings
    $(`#${cardID}`).append(cardHeader)
                   .append(summaryHTML)
                   .append('<div id="gv-head-to-head"></div>') // Google Viz
                   .append(`<div class="flexrow">${completedGames}</div>`)
                   .append(`<div class="flexrow">${upcomingGames}</div>`);
  
  
  // Unless the teams never played... 
  if (!(Object.keys(games).length === 0 && games.constructor === Object)) {
    // Insert Google visualization
    drawHeadtoHeadPie(team1, team2, gameCounts, 'gv-head-to-head');
  }
  
  // Make chart responsive
  $(window).resize(function(){
      drawHeadtoHeadPie(team1, team2, gameCounts, 'gv-head-to-head');
  });
}

  /* === HELPER FUNCTIONS === */

  function buildBoxScoreElement(game) {
    // Builds a "Box Score Array Element", consisting of the game date and:
    //  If the game is "Final": A box score table
    //  If the game is "Scheduled": A "TBD" string including the location
    
    // Format the game date string
    let gameDate = new Date(game.Day);
    let gameDateString = gameDate.toLocaleDateString(
      "en-US",
      {month: 'long', day: 'numeric'}
    );
    
    // Initiate gameResult string
    let gameResult = "";
  
    // If the game was completed...
    // NOTE: Omits InProgress, Suspended, Postponed, or Canceled games
    if (game.Status === "Final") {
      
      // Build a complete game box score
      gameResult = `<table class="box-score">
        <caption class="box-score-caption">
          ${gameDateString}: ${game.AwayTeam} at ${game.HomeTeam}
        </caption>
        <tr>
          <th scope="col"><span class="reader-only">Team</span></th>
          <th scope="col" class="box-score-stat box-score-column-header">
            Runs</th>
          <th scope="col" class="box-score-stat box-score-column-header">
            Hits</th>
          <th scope="col" class="box-score-stat box-score-column-header">
            Errors</th>
        </tr>
        <tr>
          <th scope="row" class="box-score-row-header">
            ${game.AwayTeam}</th>
          <td class="box-score-stat box-score-runs">
            ${Math.floor(game.AwayTeamRuns)}</td>
          <td class="box-score-stat">
            ${Math.floor(game.AwayTeamHits)}</td>
          <td class="box-score-stat">
            ${Math.floor(game.AwayTeamErrors)}</td>
        </tr>
        <tr>
          <th scope="row" class="box-score-row-header">
            ${game.HomeTeam}</th>
          <td class="box-score-stat box-score-runs">
            ${Math.floor(game.HomeTeamRuns)}</td>
          <td class="box-score-stat">
            ${Math.floor(game.HomeTeamHits)}</td>
          <td class="box-score-stat">
            ${Math.floor(game.HomeTeamErrors)}</td>
        </tr>
      </table>`;
        
    } else if (game.Status === "Scheduled") {
      
      const awayTeam = getTeamInfo(game.AwayTeam, 'Name');
      const homeTeam = getTeamInfo(game.HomeTeam, 'Name');
      
      gameResult = `<p class="tbd-game">${awayTeam} at ${homeTeam}</p>`;
    }
    
    // Return array element
    return [gameDateString, game.Status, gameResult];
  
  }


/* === SEASON STATS COMPARISON === */

function generateSeasonComparisonCard(team1, team2, season) {
  // Side-by-side comparison of overall season stats

// Initiate stats object
  const teamStats = {};
  
  // Compile season stats for each team
  // NOTE: Due to data scrambling, some stats must be calculated manually
  [team1, team2].forEach(team => {
  
    // Get raw stats
    const rawStats = getTeamStats(team, season);
    
    // Object to hold output statistics
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
    output.saves = Math.floor(rawStats.Saves);
    output.errors = Math.floor(rawStats.Errors);
    
    // Insert data into original object
    teamStats[team] = output;
    
  });
  
  // Create summary paragraph HTML (comprised of 3 statements)

    // Initialize summary paragraph HTML
    let summaryHTML = "";

    // STATEMENT 1 (Winning percentage)
    
      // Set present/past tense
      let haveHad = "";
      season === "2018" ?  haveHad = "have" : haveHad = "had";
    
      // Initlialize comparison stats
      let topTeam = "";
        let topTeamName = "";
      let botTeam = "";
        let botTeamName = "";
      let topTeamStat = 0;
      let botTeamStat = 0;
    
      // Compare winning percentages
      if (teamStats[team1].winPerc > teamStats[team2].winPerc) {
        topTeam = team1;
        botTeam = team2;
      } else if (teamStats[team2].winPerc > teamStats[team1].winPerc) {
        topTeam = team2;
        botTeam = team1;
      } else {
        // Handle the edge case
        topTeam = "EQUAL";
      }
    
      // Assign strings
      if (topTeam != "EQUAL") {
        topTeamStat = teamStats[topTeam].winPerc;
        botTeamStat = teamStats[botTeam].winPerc;
        topTeamName = getTeamInfo(topTeam, 'Name');
        botTeamName = getTeamInfo(botTeam, 'Name');
      
        // Append statement to summaryHTML
        summaryHTML += `<p class="card-summary">
          In the ${season} Season, the ${topTeamName} ${haveHad} a
          higher winning percentage than the ${botTeamName}
          (${topTeamStat} compared to ${botTeamStat}); `;
        
      } else {
        
        // Append statement to summaryHTML      
        summaryHTML += `<p class="card-summary">
          In the ${season} Season, the ${getTeamInfo(team1, 'Name')}
          and ${getTeamInfo(team2, 'Name')} both ${haveHad} a winning
          percentage of ${teamStats[team1].winPerc}; `;
      }
    
    // STATEMENT 2 (Batting average)
      
      // Compare batting averages
      if (teamStats[team1].avg > teamStats[team2].avg) {
        topTeam = team1;
        botTeam = team2;
      } else if (teamStats[team2].avg > teamStats[team1].avg) {
        topTeam = team2;
        botTeam = team1;
      } else {
        // Handle edge case
        topTeam = "EQUAL";
      }
      
      // Assign strings
      if (topTeam != "EQUAL") {
        topTeamStat = teamStats[topTeam].avg;
        botTeamStat = teamStats[botTeam].avg;
        topTeamName = getTeamInfo(topTeam, 'Name');
        botTeamName = getTeamInfo(botTeam, 'Name');
        
        // Append statement to summaryHTML
        summaryHTML += ` the ${topTeamName} ${haveHad} a
          higher batting average than the ${botTeamName}
          (${topTeamStat} compared to ${botTeamStat}); `;

      } else {
        
        // Append statement to summaryHTML
        summaryHTML += ` the ${getTeamInfo(team1, 'Name')} and
          ${getTeamInfo(team2, 'Name')} both 
          ${haveHad} a batting average of ${teamStats[team1].avg}; `;
      }
    
    // STATEMENT 3 (ERA)

      // Compare ERAs
      if (teamStats[team1].era > teamStats[team2].era) {
        topTeam = team1;
        botTeam = team2;
      } else if (teamStats[team2].era > teamStats[team1].era) {
        topTeam = team2;
        botTeam = team1;
      } else {
        // Handle edge case
        topTeam = "EQUAL";
      }
      
      // Assign strings
      if (topTeam != "EQUAL") {
        topTeamStat = teamStats[topTeam].era;
        botTeamStat = teamStats[botTeam].era;
        topTeamName = getTeamInfo(topTeam, 'Name');
        botTeamName = getTeamInfo(botTeam, 'Name');

        // Append statement to summaryHTML      
        summaryHTML += `and the ${topTeamName} ${haveHad} a
          higher ERA than the ${botTeamName} (${topTeamStat} compared 
          to ${botTeamStat}).</p>`;

      } else {
        
        // Append statement to summaryHTML
        summaryHTML += `and the ${getTeamInfo(team1, 'Name')}
          and ${getTeamInfo(team2,'Name')} both ${haveHad} a winning
          percentage of ${teamStats[team1].era}.</p>`;
      }



  // Draw Google Viz tables
    // Overall
      const statsNamesOverall = [
        ['string', ''],
        ['number', 'W'],
        ['number', 'L'],
        ['string', 'Pct.'],
        ['number', 'Runs for'],
        ['number', 'Runs against']
      ];

      const statsDataOverall = [
        [team1,
          Number(teamStats[team1].wins),
          Number(teamStats[team1].losses),
          Number(teamStats[team1].winPerc).toFixed(3),
          Number(teamStats[team1].runsFor),
          Number(teamStats[team1].runsAgainst)
        ],
        [team2,
          Number(teamStats[team2].wins),
          Number(teamStats[team2].losses),
          Number(teamStats[team2].winPerc).toFixed(3),
          Number(teamStats[team2].runsFor),
          Number(teamStats[team2].runsAgainst)
        ]
      ];


    // Batting
      const statsNamesBatting = [
        ['string', ''],
        ['string', 'Avg.'],
        ['string', 'Obp.'],
        ['string', 'Slg.'],
        ['number', 'H'],
        ['number', 'HR']
      ];

      const statsDataBatting = [
        [team1,
          Number(teamStats[team1].avg).toFixed(3),
          Number(teamStats[team1].obp).toFixed(3),
          Number(teamStats[team1].slg).toFixed(3),
          Number(teamStats[team1].hits),
          Number(teamStats[team1].homeRuns)
        ],
        [team2,
          Number(teamStats[team2].avg).toFixed(3),
          Number(teamStats[team2].obp).toFixed(3),
          Number(teamStats[team2].slg).toFixed(3),
          Number(teamStats[team2].hits),
          Number(teamStats[team2].homeRuns)
        ]
      ];


    // Pitching
      const statsNamesPitching = [
        ['string', ''],
        ['string', 'Era.'],
        ['string', 'Whip.'],
        ['number', 'S'],
        ['number', 'K'],
        ['number', 'BB']
      ];

      const statsDataPitching = [
        [team1,
          Number(teamStats[team1].era).toFixed(3),
          Number(teamStats[team1].whip).toFixed(3),
          Number(teamStats[team1].saves),
          Number(teamStats[team1].strikeouts),
          Number(teamStats[team1].walks)
        ],
        [team2,
          Number(teamStats[team2].era).toFixed(3),
          Number(teamStats[team2].whip).toFixed(3),
          Number(teamStats[team2].saves),
          Number(teamStats[team2].strikeouts),
          Number(teamStats[team2].walks)
        ]
      ];
    


    // Put it all together
      // Initiate cardID
      const cardID = 'SeasonComparison';
      const cardHTML = `${summaryHTML}
        <div id="gv-season-overall-table"><h3>Overall Stats</h3></div>
        <div id="gv-season-batting-table"></div>
        <div id="gv-season-pitching-table"></div>`;
  
  // Create the card
  generateMatchupComparisonCard(cardID);

  const cardHeader = '<h2>Team Season Stats Comparison</h2>';

  // Insert content into card
  $(`#${cardID}`).append(cardHeader).append(cardHTML);
  
  // Draw Google Viz tables
  drawSeasonStatsTable(
    statsNamesOverall, statsDataOverall, 'gv-season-overall-table');
  drawSeasonStatsTable(
    statsNamesBatting, statsDataBatting, 'gv-season-batting-table');
  drawSeasonStatsTable(
    statsNamesPitching, statsDataPitching, 'gv-season-pitching-table');


  // Make tables responsive
  $(window).resize(function(){
    drawSeasonStatsTable(
      statsNamesBatting, statsDataBatting, 'gv-season-batting-table');
    drawSeasonStatsTable(
      statsNamesOverall, statsDataOverall, 'gv-season-overall-table');
    drawSeasonStatsTable(
      statsNamesPitching, statsDataPitching, 'gv-season-pitching-table');
  });
}

/* === WIN TRACKER === */

function generateWinTrackerCard(team1, team2, season) {
  // The 'win tracker' charts the teams' relative win accumulation
  //  over the course of the season.

  // Initialize key variables
  const teamWinData = [];
  const winCounts = {};
    winCounts[team1] = 0;
    winCounts[team2] = 0;
  const daysAhead = {};
    daysAhead[team1] = 0;
    daysAhead[team2] = 0;
  
  let gameWinner = "";
  
  // Shorthand variable, for convenience
  const games = seasonDataGlobal[season].Games;
  
  // Loop through all the games..
  for (let i = 0; i < games.length; i++) {
    
    // If the game is complete...
    if (games[i].Status === "Final") {
      // If one of the teams was involved...
      if ([team1, team2].includes(games[i].HomeTeam)
          || [team1, team2].includes(games[i].AwayTeam)) {
      
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
          
          // Advanced "daysAhead"
          if (winCounts[team1] > winCounts[team2]) {
            daysAhead[team1] += 1;
          }
          if (winCounts[team2] > winCounts[team1]) {
            daysAhead[team2] += 1;
          }
          
          // Format the date
          
          let gameDay = new Date(games[i].Day);
          let gameDayStr = `${gameDay.getFullYear()}-${gameDay.getMonth()+1}`
                            + `-${gameDay.getDate()}`;
        
          // Add a data row
          teamWinData.push([gameDay, winCounts[team1], winCounts[team2]]);
        }
      }
    }
  }
  
  // Create the summary paragraph
  let haveTense = "have";
  let hasBeenTense = "have been";
  let summaryHTML = "";
  
  // If not the current season...
  if (season != 2018) {
    haveTense = "";
    hasBeenTense = "were";
  }


  if (winCounts[team1] > winCounts[team2]) {

    let margin = winCounts[team1] - winCounts[team2];
    let percentage = (daysAhead[team1]
                     / (daysAhead[team1] + daysAhead[team2])
                     * 100).toFixed(0);
    
    summaryHTML = `<p class="card-summary">In the ${season} season,
      the ${getTeamInfo(team1, 'Name')} ${haveTense} won ${margin} more games
      than the ${getTeamInfo(team2, 'Name')} (${winCounts[team1]} compared to
      ${winCounts[team2]}). The ${getTeamInfo(team1, 'Name')} ${hasBeenTense}
      ahead in win count for ${percentage}% of the season.</p>`;
    
  } else if (winCounts[team2] > winCounts[team1]) {
    
    let margin = winCounts[team2] - winCounts[team1];
    let percentage = (daysAhead[team2]
                     / (daysAhead[team1] + daysAhead[team2])
                     * 100).toFixed(0);
    
    summaryHTML = `<p class="card-summary">In the ${season} season,
      the ${getTeamInfo(team2, 'Name')} ${haveTense} won ${margin} more games
      than the ${getTeamInfo(team1, 'Name')} (${winCounts[team2]} compared to
      ${winCounts[team1]}). The ${getTeamInfo(team2, 'Name')} ${hasBeenTense}
      ahead in win count for ${percentage}% of the season.</p>`;
      
  } else {
    
    let percentage = (daysAhead[team1]
                     / (daysAhead[team1] + daysAhead[team2])
                     * 100).toFixed(0);
    
    summaryHTML = `<p class="card-summary">In the ${season} season,
      the ${getTeamInfo(team1, 'Name')} and the ${getTeamInfo(team2, 'Name')}
      ${haveTense} won the same number of games (${winCounts[team1]} wins each).
      The ${getTeamInfo(team1, 'Name')} ${hasBeenTense} ahead in win count for
      ${percentage}% of the season.</p>`;
  }
  
  // Put it all together
    // Initiate cardID and content string
    const cardID = 'WinTracker';
    let cardHTML = `<div id="gv-win-tracker"></div>`;

    // Create the card
    generateMatchupComparisonCard(cardID);

    const cardHeader = '<h2>Team Wins Tracker</h2>';

    // Insert content into card
    $(`#${cardID}`).append(cardHeader).append(summaryHTML).append(cardHTML);
  
    // Draw the Google Visualization
    drawWinTracker(team1, team2, teamWinData);
  
    // Make chart responsive
    $(window).resize(function(){
      drawWinTracker(team1, team2, teamWinData);
    });
    
}

/* =======================================
   = MATCHUP COMPARISON HELPER FUNCTIONS =
   ======================================= */

function generateMatchupComparisonCard(cardID) {
  // Generates the wrapper HTML for a matchup comparison card
  
  // Build HTML
  const cardHTML = `<section class="card js-card" id="${cardID}"
                             tabindex="0"></section>`;
                    
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