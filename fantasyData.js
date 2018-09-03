'use strict';

/* ==================================
   = CORE FANTASYDATA API FUNCTIONS =
   ================================== */
   
function fantasyDataAPIQuery(searchType, successCallback, season = null) {
  // Makes a FantasyData API call, returning a JSON object in response
  
  // Set the search endpoint to include a season
  let searchURL = `https://api.fantasydata.net/v3/mlb/stats/json/${searchType}`;    
  
  // Append the season, if required for the call
  if (season != null) {
    searchURL += `/${season}`;
  }
  
  // Execute query
  $.ajax({
    url: searchURL,
    success: successCallback,
    beforeSend: setHeader,
    type: "GET"
  });
  
  if(TESTING) {
    
    console.log(`"fantasyDataAPIQuery" was called`);
    
  }
  
}
  
  /* === fantasyDataAPIQuery helper functions === */
  
  function setHeader(xhr) {
    // Establish API authorization
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key',FD_API_KEY);
  }

  function outputAjaxData(data) {
    // Temporary helper function for outputting API response data
    
    console.log(data);
    
    if (TESTING) {
      
      console.log(`"outputAjazData" was called`);
    }
    
  }