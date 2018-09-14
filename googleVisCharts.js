'use strict';

// Functions that build data objects and send them to the Google Visualization
//  API, which returns the requested chart objects to display in the app.

function drawHeadtoHeadPie(team1, team2, winCounts) {
  // Creates a pie chart summarizing the season's head-to-head results.
  // winCounts = [team1Wins, team2Wins, scheduledGames]
  
  // Initialize Google Charts and callback function
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function() {
    return drawChart(team1, team2, winCounts);
  });
  
  // The function that actually builds the chart
  function drawChart(team1, team2, winCounts) {
    
    // Convert data to Google format data table.
    const data = google.visualization.arrayToDataTable([
    ['Winner', 'Games'],
    [getTeamInfo(team1, 'Name'), winCounts[team1]],
    [getTeamInfo(team2, 'Name'), winCounts[team2]],
    ['Upcoming',winCounts['scheduled']]
    ]);
    
    // Set visualization colors
    const team1Color = getTeamInfo(team1, 'DisplayColor');
    const team2Color = getTeamInfo(team2, 'DisplayColor');  
    
    // Set chart options
    var options = {
      legend: 'bottom',
      chartArea: {
        width: '80%',
        height: '80%'
      },
      pieSliceText: 'value',
      slices: {
        0: {color: team1Color},
        1: {color: team2Color},
        2: {color: '#aaa'}
      }
    };
  
    // Create Google Chart object
    const chart = new google.visualization.PieChart(
      document.getElementById('gv-head-to-head')
    );
    
    // Draw Chart
    chart.draw(data, options);
  }
}

function drawSeasonStatsTable(statsNames, statsData, divId) {
  // Creates a data table comparing the supplied statistics
  // NOTE: divId specifies where each table is placed in the DOM
  
  // Initialize Google Charts
  google.charts.load('current', {'packages': ['table']});
  google.charts.setOnLoadCallback(function() {
    return drawTable(statsNames, statsData, divId)
  });
  
  // The function that actually builds the chart
  function drawTable(statsNames, statsData, divId) {
    
    // Convert data into Google formatted data table
    const data = new google.visualization.DataTable();
    statsNames.forEach(stat => {
      data.addColumn(stat[0], stat[1]);
    });
    data.addRows(statsData);
    
    // Set chart options
    const options = {
      width: '100%',
      cssClassNames: {
        headerCell: 'gv-table-header-cell',
        tableCell: 'gv-table-cell'
      }
    };
    
    // Create Google Chart object
    const table = new google.visualization.Table(
      document.getElementById(divId)
    );

    // Draw chart
    table.draw(data, options);
  }
}


function drawWinTracker(team1, team2, teamWinData) {
  // Create a line chart tracking each team's wins accumulation over the season
  // NOTE: teamWinData = [...,[date, team1WinCount, team2WinCount],...]
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(function() {
    return drawChart(team1, team2, teamWinData);
  });
  
  // The function that actually builds the chart
  function drawChart(team1, team2, teamWinData) {
    
    // Convert data into Google formatted data table
    const data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', team1);
      data.addColumn('number',team2);
    data.addRows(teamWinData);
    
    // Set visualization colors
    const team1Color = getTeamInfo(team1, 'DisplayColor');
    const team2Color = getTeamInfo(team2, 'DisplayColor');
    
    // Set chart options
    const options = {
      colors: [
        team1Color,
        team2Color
      ]
    };
  
    // Create Google Chart Object
    const chart = new google.charts.Line(
      document.getElementById('gv-win-tracker')
    );
    
    // Draw chart
    chart.draw(data, options);
  }
}

