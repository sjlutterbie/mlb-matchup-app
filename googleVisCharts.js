'use strict';

function drawSeasonCompTable(team1, team2, teamStats) {
  
  // Initialize Google Charts
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(function(){return drawTable(team1, team2, teamStats)});
  
  
  function drawTable(team1, team2, teamStats) {
  
  console.log("drawTable called");
  console.log(team1)
  
    // Set up the data table variables
    const dataTableColumns = [
      ['string', 'Team'],
      ['number', 'W'],
      ['number', 'L'],
      ['number', 'PCT'],
      ['number', 'R for'],
      ['number', 'R against'],
      ['number', 'AVG'],
      ['number', 'OBP.'],
      ['number', 'SLG'],
      ['number', 'H'],
      ['number', '2B'],
      ['number', '3B'],
      ['number', 'HR'],
      ['number', 'ERA'],
      ['number', 'WHIP'],
      ['number', 'E']
    ];
    
    const data = new google.visualization.DataTable();
      //Create the data columns
      dataTableColumns.forEach(column => {
        data.addColumn(column[0], column[1]);
      });
      // Create data rows
      let dataRows = [];
      
      console.log(teamStats);
      
      [team1, team2].forEach(team => {
        dataRows.push(
          [
            team,
            teamStats[team].output.wins,
            teamStats[team].output.losses,
            Number(teamStats[team].output.winPerc),
            teamStats[team].output.runsFor,
            teamStats[team].output.runsAgainst,
            Number(teamStats[team].output.avg),
            Number(teamStats[team].output.obp),
            Number(teamStats[team].output.slg),
            teamStats[team].output.hits,
            teamStats[team].output.doubles,
            teamStats[team].output.triples,
            teamStats[team].output.homeRuns,
            Number(teamStats[team].output.era),
            Number(teamStats[team].output.whip),
            teamStats[team].output.errors
          ]
        );
      });
      
      // Add rows to GoogleViz data object
      data.addRows(dataRows);
      
      
    // Set chart options
    const options = {
      width: '100%',
      alternatingRowStyle: false,
      showRowNUmber: false,
      cssClassNames: {},
    };
    
    // Instantiate and draw the chart
    const chart = new google.visualization.Table(document.getElementById('season-comp-table'));
    chart.draw(data, options);
  }
  
}
