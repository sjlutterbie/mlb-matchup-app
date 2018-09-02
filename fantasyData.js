'use strict';

/* ==================================
   = CORE FANTASYDATA API FUNCTIONS =
   ================================== */
   
function fantasyDataAPIQuery(searchType, season, successCallback) {
  // Makes a FantasyData API call, returning a JSON object in response
  
  // Set the search endpoint
  const searchURL = `https://api.fantasydata.net/v3/mlb/stats/json/${searchType}/${season}`;
  
  // Execute query
  
  // Execute query
  $.ajax({
    url: searchURL,
    success: successCallback,
    beforeSend: setHeader,
    type: "GET"
  });
  
}
  
  /* === fantasyDataAPIQuery helper functions === */
  
  function setHeader(xhr) {
    // Establish API authorization
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key',FD_API_KEY);
  }

  function outputAjaxData(data) {
    // Temporary helper function for outputting API response data
    console.table(data);
  }
  
/* ==============================
   = FANTASYDATA API CALL TYPES =
   ============================== */
   
function getTeamList() {
  // Queries the fantasyData API for a list of active MLB Teams
  
  fantasyDataAPIQuery('teams', '2018', console.log);
  
  
}

$(getTeamList);