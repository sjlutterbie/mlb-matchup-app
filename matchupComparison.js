'use strict';

  function generateMatchupComparison(team1, team2, season) {
    // Central function that calls the individual matchup comparison analyses
    
    console.log(`Generating ${team1} vs ${team2} comparison for ${season} season...`);
    console.log(seasonDataGlobal);

    
    // Head-to-Head W-L, including table of individual box scores
    generateHeadtoHeadSummaryCard(team1, team2, season);
    
    // Combined box score summary, plus other comparisons, if available
    generateCombinedBoxScoreCard(team1, team2, season);
    
    // A summary of upcoming matches, if they have any.
    generateUpcomingMatchesCard(team1, team2, season);

    // Side-by-side comparison of overall season stats
    generateSeasonComparisonCard(team1, team2, season);
    
    // A "win tracker" charting their relative progress over the course of the season
    generateWinTrackerCard(team1, team2, season);
  
  }
  
  /* === Matchup Comparison Card functions === */
  
  function generateMatchupComparisonCard() {
    // Generates the wrapper HTML for a matchup comparison card
    
    //TODO
    
    console.log("Generating Matchup Comparison Card... somdeday.");
    
  }
  
  function generateHeadtoHeadSummaryCard(team1, team2, season) {
    // Generate the Head-to-Head W-L Card, including table of individual box scores
      
    //TODO
    
    console.log("Generating Head to Head Summary Card... somdeday.");
      
  }
    
  function generateCombinedBoxScoreCard(team1, team2, season) {
    // Combined box score summary, plus other comparisons, if available
    
    //TODO
    
    console.log("Generating Upcoming Matches Card... somdeday.");
    
  }
  
  function generateUpcomingMatchesCard(team1, team2, season) {
    // A summary of upcoming matches, if they have any.
    
    //TODO
    
    console.log("Generating Upcoming Matches Card... somdeday.");
    
  }
  
  function generateSeasonComparisonCard(team1, team2, season) {
    // Side-by-side comparison of overall season stats

    //TODO
    
    console.log("Generating Season Comparison Card... someday");
    
  }
  
  function generateWinTrackerCard(team1, team2, season) {
    // A "win tracker" charting their relative progress over the course of the season
    
    //TODO
    
    console.log("Generating Win Tracker Card... someday");

  }