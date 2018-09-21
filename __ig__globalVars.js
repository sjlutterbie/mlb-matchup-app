'use strict';

// FantasyData API Key

 const FD_API_KEY = "8b5ff3c305dd4088aad7c825d45e9b0d";

// Global data variables

const seasonDataGlobal = {};
let teamInfoGlobal = {};

// Nav Drawer display variables

let landingPageDismissedGlobal = false;
let screenIsWideGlobal = true;
let wideNavScreenGlobal = true;
const screenThresholdGlobal = 660; // NOTE: Must match media query in styles.css