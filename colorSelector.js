'use strict';

// Each team has at least three potential colors. These functions select
//  a color for each team, such that:
//  - Both colors contrast sufficiently from white
//  - Both colors contrast sufficient from each other
// Priority is given to team1's color list 

function selectTeamColors(team1, team2) {
  // Select display colors for team1 & team2 that are sufficiently different

  // Set minimum hue difference between colors
  const minHueDiff = 45;
  
  // Set max luminance to ensure contrast against white
  const maxLum = 60;
  
  // Initiate color object
    const colors = {};

    // Extract colors from teamInfo
    [team1, team2].forEach(team => {
      colors[team] = [
        getTeamInfo(team, "PrimaryColor"),
        getTeamInfo(team, "SecondaryColor"),
        getTeamInfo(team, "TertiaryColor")
      ];
    });
      
  // Default to primary colors (in case loop doesn't find a contrasting pair)
    let team1Color = colors[team1][0];
    let team2Color = colors[team2][0];

  // Loop through team1's colors
  team1Loop:
    for(let i = 0; i < colors[team1].length; i++) {
      
      // Extract color information
      let team1HSL = hslFromHex(colors[team1][i]);  // Returns [h,s,l]
      let team1Hue = team1HSL[0];
      let team1Lum = team1HSL[2];
      
      // If the color is too close to white...
      if (!evalMaxLum(team1Lum, maxLum)) {
        // ...Move on to the next color
        continue;
      }
      
      // Loop through team2's colors
    team2Loop:
      for(let j = 0; j < colors[team2].length; j++) {
        
        // Extract color information
        let team2HSL = hslFromHex(colors[team2][j]); // Returns [h,s,l]
        let team2Hue = team2HSL[0];
        let team2Lum = team2HSL[2];
        
        // If the color is too close to white...
        if (!evalMaxLum(team2Lum, maxLum)) {
          // ...Move on to the next color
          continue;
        }

        // If team1 and team2 colors are sufficiently different...
        if (evalHueDifference(team1Hue, team2Hue, minHueDiff)) {

            // Set colors, and break both loops
            team1Color = colors[team1][i];
            team2Color = colors[team2][j];
            break team1Loop;
          
        }
      }
    }

  // Store team colors
  setTeamInfo(team1, "DisplayColor", team1Color);
  setTeamInfo(team2, "DisplayColor", team2Color);

}


/* === HELPER FUNCTIONS === */

  function hslFromHex(hexString) {
    // Takes a hex color string and returns the color's hue (from HSL) value
    // NOTE: Solution drawn from:
    //  https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
    
    
    // Remove #, if present
    hexString = hexString.replace("#", "");
    
    // Extract RGB components
    let r = parseInt(hexString.substr(0,2),16);
    let g = parseInt(hexString.substr(2,2),16);
    let b = parseInt(hexString.substr(4,2),16);
    
    // Convert to fractions of 255
    r /= 255, g /= 255, b /= 255;
    
    // Identify max & min values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (min + max) / 2;
    
    if(max == min){
        h = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
  
  h = Math.round(360 * h);
  s = Math.round(100 * s);
  l = Math.round(100 * l);
  
  return [h, s, l];
    
  }
  
  function evalHueDifference(hue1, hue2, minDiff) {
    // Calculates whether two hues are sufficiently different
    // NOTE: Hue runs 0-360, but loops; this must be taken into account.
  
    // Case 1: They're simply within the minDiff of each other:
    if (Math.abs(hue1 - hue2) <= minDiff) {
      return false;
    }    
    
    // Case 2: They appear far enough apart, but hue1 is within minDiff of 0
    if (hue1 < minDiff) {
      // Move hue2 to 0 end of the scale
      return (hue1 - (hue2-360) >= minDiff);
    }
    
    // Case 3: They appear far enough apart, but hue1 is within minDiff of 360
    if (360 - hue1 < minDiff) {
      // Move hue1 to the 0 end of the scale
      return (hue2 - (hue1-360) >= minDiff);
    }
    
    // Case 4: They've passed the tests, and we certify them different!
    return true;

  }
  
  function evalMaxLum(lum, maxLum) {
    // Confirms that a color's luminosity is less than a defined maximum
    // NOTE: This turned out to be easier than hue difference.
    
    return lum <= maxLum;
    
  }