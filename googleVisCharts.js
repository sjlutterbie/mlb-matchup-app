'use strict';

function drawWinTracker(team1, team2, teamWinData) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(function(){return drawChart(team1, team2, teamWinData)});
  
  
  function drawChart(team1, team2, teamWinData) {
  
  const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', team1);
    data.addColumn('number',team2);
  data.addRows(teamWinData);
  
  // Set visualization colors
  const team1Color = getTeamInfo(team1, 'DisplayColor');
  const team2Color = getTeamInfo(team2, 'DisplayColor');
  
  const options = {
    colors: [
      team1Color,
      team2Color
    ]
  };

  //  TODO: Make this actually do something.

    // Instantiate and draw the chart
    const chart = new google.charts.Line(document.getElementById('gv-win-tracker'));
    chart.draw(data, options);
  }
  
}

function drawHeadtoHeadPie(team1, team2, winCounts) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){return drawChart(team1, team2, winCounts)});
  
  function drawChart(team1, team2, winCounts) {
    
    const data = google.visualization.arrayToDataTable([
    ['Winner', 'Games'],
    [getTeamInfo(team1, 'Name'), winCounts[team1]],
    [getTeamInfo(team2, 'Name'), winCounts[team2]],
    ['Upcoming',winCounts['scheduled']]
    ]);
    
  // Set visualization colors
  const team1Color = getTeamInfo(team1, 'DisplayColor');
  const team2Color = getTeamInfo(team2, 'DisplayColor');  
  
  var options = {
    legend: 'bottom',
    chartArea: {
      width: '80%',
      height: '80%'
    },
    pieSliceText: 'label',
    slices: {
      0: {color: team1Color},
      1: {color: team2Color},
      2: {color: '#aaa'}
    }
  };

  const chart = new google.visualization.PieChart(document.getElementById('gv-head-to-head'));
  
  chart.draw(data, options);

  }
  
}

function drawSeasonStatsTable(statsNames, statsData, divId) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages': ['table']});
  google.charts.setOnLoadCallback(function() {return drawTable(statsNames, statsData, divId)});
  

  function drawTable(statsNames, statsData, divId) {
    const data = new google.visualization.DataTable();
    statsNames.forEach(stat => {
      data.addColumn(stat[0], stat[1]);
    });
    data.addRows(statsData);
    
    const options = {
      width: '100%',
      cssClassNames: {
        headerCell: 'gv-table-header-cell',
        tableCell: 'gv-table-cell'
      }
      
    };
    
    const table = new google.visualization.Table(document.getElementById(divId));

    table.draw(data, options);

  }

}