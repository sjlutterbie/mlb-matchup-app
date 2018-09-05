'use strict';

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
  $.ajax(ajaxSettings);
  
}
  
  /* === fantasyDataAPIQuery helper functions === */
  
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

  function outputAjaxData(data) {
    // Temporary helper function for outputting API response data
    
    console.log(data);
    
    if (TESTING) {
      
      console.log(`"outputAjazData" was called`);
    }
    
  }