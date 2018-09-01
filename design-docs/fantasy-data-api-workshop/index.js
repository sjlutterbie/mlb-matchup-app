'use strict';

/*
  1. Build a basic, successful API query.
  2. Refactor into general API connector function
  3. Build additional API queries using the connector function
*/

function fantasyDataAPIQuery(searchType, season) {
  // Makes a FantasyData API call, returning a JSON object in response
  
  // Set the search endpoint
  const searchURL = `https://api.fantasydata.net/v3/mlb/stats/json/${searchType}/${season}`;
  
  // Execute query
  
  // Execute query
  $.ajax({
    url: searchURL,
    success: outputAjaxData,
    beforeSend: setHeader,
    type: "GET"
  });
  
}
  
  // fantasyDataAPIQuery Helper functions
  
  function setHeader(xhr) {
    // Establish API authorization
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key',FD_API_KEY);
  }

  function outputAjaxData(data) {
    // Temporary helper function for outputting API response data
    console.table(data);
  }

$(fantasyDataAPIQuery('Standings', '2018'));