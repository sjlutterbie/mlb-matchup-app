'use strict';

// Each team has four potential colors. I want to select one color from each team, such that:
  // Both colors contrast sufficiently from white
  // BOth colors contrast sufficiently from each other.
// Preference will be given to team1's color priority.

// I need a function that extracts each team's colors, loops through them, and selects winners

function selectTeamColors(team1, team2) {
  // Selects sufficiently contrasting team colors
  
  // Set minimum contrast value
  const minContrast = .3;
  
  // Initiate color object
    const colors = {};

    [team1, team2].forEach(team => {
      colors[team] = [
        getTeamInfo(team, "PrimaryColor"),
        getTeamInfo(team, "SecondaryColor"),
        getTeamInfo(team, "TertiaryColor")      ];
      });
      
  // Default to primary colors (in case loop doesn't find a contrasting pair)
    let team1Color = colors[team1][0];
    let team2Color = colors[team2][0];

  // Loop through team1's colors
  loop1:
    for(let i = 0; i < colors[team1].length; i++) {
      
      let team1Hue = hueFromHex(colors[team1][i]);
      
      // Loop through team2's colors
  loop2:
        for(let j = 0; j < colors[team2].length; j++) {
          
          let team2Hue = hueFromHex(colors[team2][j]);

          console.log(`Testing ${team1} color ${i} (${colors[team1][i]}) vs. ${team2} color ${j} (${colors[team2][j]})...`);
          
          // If they're different...
          if (evalHueDifference(team1Hue, team2Hue, 45)) {
              console.log(`${team1} color ${i} and ${team2} color ${j} contrasts sufficiently!`);
              
              // Set colors, and break!
              team1Color = colors[team1][i];
              team2Color = colors[team2][j];
              break loop1;
            
          }
        }
    }

  // Store team colors
  setTeamInfo(team1, "DisplayColor", team1Color);
  setTeamInfo(team2, "DisplayColor", team2Color);

}



/* === HELPER FUNCTIONS === */

  function hexToYIQ(hexString) {
    // Converts a 6-digit hex color to a YIQ value
    
    // Remove #, if present
    hexString = hexString.replace("#", "");
    
    // Extract RGB components
    const hexR = parseInt(hexString.substr(0,2),16);
    const hexG = parseInt(hexString.substr(2,2),16);
    const hexB = parseInt(hexString.substr(4,2),16);
    
    // Calculate YIQ value
    const YIQ = ((hexR*299)+(hexG*587)+(hexB*114))/1000;
    
    return YIQ;
    
  }

  function evalColorContrast(color1, color2, minContrast) {
    // Calculate the contrast between two YIQ color values
  
    console.log(`Contrast value: ${Math.abs(((color1 - color2) / 255))}`);
  
    return (Math.abs(((color1 - color2) / 255)) >= minContrast);
    
  }
  
  
  // ====================================
  
  function hueFromHex(hexString) {
    // Takes a hex color string and returns the color's hue (from HSL) value
    // NOTE: Solution drawn from:
    //    https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
    
    
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
    let h = (min + max) / 2;
    
    if(max == min){
        h = 0; // achromatic
    } else {
        const d = max - min;
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
  h = Math.round(360 * h);
  
  return h;
    
  }
  
  function evalHueDifference(hue1, hue2, minDiff) {
    // Calculates whether two hues are sufficiently different
  
    console.log(`hue1: ${hue1}`);
    console.log(`hue2: ${hue2}`);
    
    // Case 1 - They're simply within the minDiff of each other:
    if (Math.abs(hue1 - hue2) <= minDiff) {
      return false;
    }    
    
    // Case 2 - They're different, but hue1 is less than minDiff from 0
    if (hue1 < minDiff) {
      return (hue1 - (hue2-360) >= minDiff);
    }
    
    // Case 3 - They're different, but hue1 is less than minDiff from 360
    if (360 - hue1 < minDiff) {
      return (hue2 - (hue1-360) >= minDiff);
    }
    
    // Case 4 - They're different, and hue isn't close to an edge
    return true;

  }
  
// TEST CASES

 // They're within minDiff (expect false)
  // And hue1 isn't close to 0 or 360
    console.log(`Within minDiff, not close (expect false): ${evalHueDifference(20, 25, 10)}`);
  // And hue1 is close to 0
    console.log(`Within minDiff, hue1 close to 0 (expect false): ${evalHueDifference(8, 12, 10)}`);
  // And hue1 is close to 360
    console.log(`Within minDiff, hue1 close to 360 (expect false): ${evalHueDifference(357, 3, 10)}`);
 // They're greater than minDiff (expect true)
  // And hue1 isn't close to 0 or 360
    console.log(`Not within minDiff, not close (expect true): ${evalHueDifference(15, 55, 10)}`);
  // And hue1 is close to 0
    console.log(`Not within minDiff, hue1 close to 0 (expect true): ${evalHueDifference(5, 50, 10)}`);
  // And hue1 is close to 360
    console.log(`Not within minDiff, hue1 close to 360 (expect true): ${evalHueDifference(355, 45, 10)}`);
