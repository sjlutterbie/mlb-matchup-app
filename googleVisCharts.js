'use strict';

function drawSeasonCompTable(team1, team2, teamStats) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(function(){return drawTable(team1, team2, teamStats)});
  
  
  function drawTable(team1, team2, teamStats) {
  
  console.log("drawTable called");

    // Set up the data table variables
    const dataTableColumns = [
      ['string', 'stat'],
      ['number', team1],
      ['number', team2]
    ];
    
    const data = new google.visualization.DataTable();
      //Create the data columns
      dataTableColumns.forEach(column => {
        data.addColumn(column[0], column[1]);
      });
      // Create data rows
      let dataRows = [];
      
      const dataKey = [
        ['W', 'wins'],
        ['L', 'losses'],
        ['Pct.', 'winPerc'],
        ['R for','runsFor'],
        ['R against','runsAgainst'],
        ['Avg.','avg'],
        ['Obp.','obp'],
        ['Slg.','slg'],
        ['H','hits'],
        ['2B','doubles'],
        ['3B','triples'],
        ['HR','homeRuns'],
        ['Era.','era'],
        ['Whip.','whip'],
        ['E','errors']
      ];
      
      console.log(dataKey);
      
      dataKey.forEach(key => {
        dataRows.push([
          key[0],
          Number(teamStats[team1].output[key[1]]),
          Number(teamStats[team2].output[key[1]])
          ]);
      });
      
      // Add rows to GoogleViz data object
      data.addRows(dataRows);
      
      
    // Set chart options
    const options = {
      showRowNUmber: false,
      cssClassNames: {},
    };
    
    // Instantiate and draw the chart
    const chart = new google.visualization.Table(document.getElementById('season-comp-table'));
    chart.draw(data, options);
  }
  
}
