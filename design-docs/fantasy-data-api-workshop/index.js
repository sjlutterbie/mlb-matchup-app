'use strict';

/*
  1. Build a basic, successful API query.
  2. Refactor into general API connector function
  3. Build additional API queries using the connector function
*/

function setHeader(xhr) {
  // Establish API authorization
  
  xhr.setRequestHeader('Ocp-Apim-Subscription-Key',FD_API_KEY);
}

function outputAjaxData(data) {
  
  console.table(data);
}

function getMLBTeamList() {
  // Gets a JSON of all MLB Teams, with description data
  
  
  // Set endpoint (will need to be customized for future calls)
  const searchURL = "https://api.fantasydata.net/v3/mlb/stats/json/teams";
  
  // Set paramaters for search query
  const query = {
    format: 'jsonp'
  };
  
  // Execute query
  $.ajax({
    url: searchURL,
    data: query,
    success: outputAjaxData,
    beforeSend: setHeader,
    type: "GET"
  });
  
  
}

$(getMLBTeamList)