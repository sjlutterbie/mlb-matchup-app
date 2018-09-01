# Baseball Matchup Comparison

## User-story drafting

* When they user visits they site, they arrive at a `landing page`.
  * The `landing page` explains the purpose of the app, and how to use it.
    * *The `landing page` specifies that the app is currently using fake data.*
  * The `landing page` has a clear `get started` action point.
    * The `get started` action point is a button that:
      * Closes the `get started` display.
      * Opens the `drawer nav`, which includes the `matchup selection form`.

* The `matchup selection form` contains three fields:
  * `Team1` - A dropdown list of all active MLB teams.
  * `Team2` - A dropdown list of all active MLB teams.
  * `Season` - A dropdown list of all MLB seasons for which statistics are available via the API.
  * `Submit` - A button that submits the form and generates the `matchup analysis`.

* When the user submits the `matchup selection form`:
  * The `drawer nav` transitions away
  * A `loading wheel` is displayed (if necessary)
  * The `matchup analysis` is displayed in the `main display`

* The `main display` contains the `matchup analysis`, which consists of:
  * Head-to-head W-L
    * Includes a table with the box score for each matchup
  * How many games the two teams have remaining in the season
  * Combined box score across all head-to-head games
  * Side-by-side comparison of their overall season stats.
  * A 'win tracker' charting their relative progress over the course of the season.
    * The win tracker highlights the winner of head-to-head match-ups, with tooltips that display the score.

* The `title bar` displays:
  * Before the user has chosen a matchup: 'MLB Matchup Comparison'
  * After the user has chosen a matchup: `XXX vs. YYY, ZZZZ season'
  * On small screens, a `drawer icon` that opens up the `drawer nav`

* A `hover button` sits above the `main display`, in the lower right-hand corner.
  * When the user clicks the `hover button`:
    * The `hover button` disappears
    * The `drawer nav` appears
  * Either the `drawer nav` XOR the `hover button` are visible at any one time.