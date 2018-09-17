'use strict';

// Gets MLB data via fantasyData.com's API
// API Documentation: https://fantasydata.com/developers/getting-started
// NOTE: fantasyData's 'free trial' API key puts no time limit on data access;
//  however, key stats are 'scrambled' by +/- 5-20%. Therefore, stats returned
//  look realistic but are incorrect, and likely not internally consistent.
//  For example, the number of wins a team has does not necessarily equal the
//  number of times they score more runs than their opponents, since wins,
//  runsFor, and runsAgainst were all independently scrambled.

/* ==================================
   = CORE FANTASYDATA API FUNCTIONS =
   ================================== */
   
function fantasyDataAPIQuery(searchType, successCallback,
                             season = null, completeCallback = null) {
  // Makes a FantasyData API call, returning a JSON object in response
  // Required arguments: searchType, successCallback
  // Optional arguments: season, completeCallback
  
  // Initialize the ajax settings object
  const ajaxSettings = {};
  
  // Implement the required settings
  ajaxSettings.beforeSend = setHeader;
  ajaxSettings.error = fantasyDataAPIErrorCallback;
  ajaxSettings.method = 'GET';
  ajaxSettings.success = successCallback;
  ajaxSettings.url = `https://api.fantasydata.net/v3/mlb/stats/json/${searchType}`;
  
  // Implement optional settings
  if (season != null) {
    ajaxSettings.url += `/${season}`;
  }
  
  if (completeCallback != null) {
    ajaxSettings.complete = completeCallback;
  }
  
  // Execute the query
  // NOTE: Using .ajax() rather than .getJSON() because API requires
  //  authentication in the RequestHeader, which is unavailable via .getJSON().
  $.ajax(ajaxSettings);
  
}
  
  /* === HELPER FUNCTIONS === */
  
  function setHeader(xhr) {
    // Establish API authorization
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key',FD_API_KEY);
  }

  function fantasyDataAPIErrorCallback(xhrObj,err,exObj) {
    
    //TODO: Extend this to provide actionable user feedback.
    
    console.log(`The following error occured: ${err}`);
    console.log('Details:');
    console.log(exObj);
    
  }