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
        getTeamInfo(team, "TertiaryColor"),
        getTeamInfo(team, "QuarternaryColor")
      ];
      });
      
  // Default to primary colors (in case loop doesn't find a contrasting pair)
    let team1Color = colors[team1][0];
    let team2Color = colors[team2][0];
  
  // Loop through team1's colors
    for(let i = 0; i < colors[team1].length; i++) {
      // If team1's color contrasts sufficiently with white...
      if(evalColorContrast(colors[team1][i], "ffffff", minContrast)) {
        // Loop through team2's colors
        for(let j = 0; j < colors[team2].length; j++) {
          // If team2's color contrasts sufficiently with white...
          if (evalColorContrast(colors[team2][j], "ffffff", minContrast)) {
            // And team2's color contrasts sufficiently with team1's color...
            if(evalColorContrast(colors[team1][i], colors[team2][j], minContrast)) {
              
              // Set colors, and break!
              team1Color = colors[team1][i];
              team2Color = colors[team2][j];
              break;
              
            }
          }
        }
      }
    }


  // Store team colors
  setTeamInfo(team1, "DisplayColor", team1Color);
  setTeamInfo(team2, "DisplayColor", team2Color);

  console.log(getTeamInfo(team1, "DisplayColor"));
  console.log(getTeamInfo(team2, "DisplayColor"));
}



/* === HELPER FUNCTIONS === */

  function hexToYIQ(hexString) {
    // Converts a 6-digit hex color to a YIQ value
    
    // Remove #, if present
    hexString = hexString.replace("#", "");
    
    // Extract RGB components
    const hexR = parseInt(hexcolor.substr(0,2),16);
    const hexG = parseInt(hexcolor.substr(2,2),16);
    const hexB = parseInt(hexcolor.substr(4,2),16);
    
    // Calculate YIQ value
    const YIQ = ((hexR*299)+(hexG*587)+(hexB*114))/1000;
    
    return YIQ;
    
  }

  function evalColorContrast(color1, color2, minContrast) {
    // Calculate the contrast between two YIQ color values
    
    return (((color1 - color2) / 255) >= minContrast);
    
  }