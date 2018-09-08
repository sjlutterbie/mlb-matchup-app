'use strict';

function drawWinTracker(team1, team2, teamWinData) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(function(){return drawChart(team1, team2, teamWinData)});
  
  
  function drawChart(team1, team2, teamWinData) {
  
  console.log("drawChart called");
  
  const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', team1);
    data.addColumn('number',team2);
  data.addRows(teamWinData);
  
  const options = {};

  //  TODO: Make this actually do something.

    // Instantiate and draw the chart
    const chart = new google.charts.Line(document.getElementById('gv-win-tracker'));
    chart.draw(data, options);
  }
  
}
