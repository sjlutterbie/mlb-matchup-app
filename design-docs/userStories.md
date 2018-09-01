# Baseball Matchup Comparison

## User-story drafting

### User interaction flow

* When a user loads the app, they arrive at the `landing card`.
  * From the `landing card`, the user can:
    * Click the `get started button`, which...
      * Makes the `landing card` disappear
      * Makes the `drawer nav` appear
* From the `drawer nav`, the user can:
  * Complete and submit the `matchup comparison form`
  * On small screens, click the `close drawer nav link` to make the `drawer nav` disappear.
* When the user clicks the `close drawer nav link`:
  * The `drawer nav` disappears.
  * The user can view the `main display`.
* When the user is at the `main display`, they can:
  * On small screens:
    * Click the `drawer icon` in the `title bar` to open the `drawer nav`.
    * Click the `floating button` in the lower-right corner to open the `drawer nav`.
  * On large screens:
    * View the `drawer nav` to the left of the `main display`.
  * View and interact with a `display card`.
* When a user clicks a `display card`:
  * If the card is NOT expanded:
    * The `display card` expands to display additional information, such as:
      * A text summary of the statistics/visualizations presented.
      * Additional statistics or details.
  * If the card IS expanded:
    * The card contracts, hiding any additional information it contained.

### Components and their descriptions

* The `close drawer nav link`
  * TODO
* The `drawer icon`
  * TODO
* The `drawer nav`...
  * Is:
    * On small screens, a slide in/out hover layer on the left side of the screen
    * On large screens, a panel adjacent to the `main display` on the left side of the screen
  * Contains:
    * The `matchup selection form`
    * On small screens, a `close drawer nav link` (w/ icon)
* The `get started button`...
  * Is a button that:
      * Makes the `landing card` disappear
      * On small screens: Makes the `drawer nav` appear
      * On large screens: Makes the `drawer nav` and `main display` appear.
* The `landing card`...
  * Is:
    * A full-screen, floating card
  * Contains:
    * A welcome statement, introducing the purpose of the app
    * Instructions on how to use the app
    * A disclaimer stating the app currently uses fake data.
    * A `get started` button.
* The `main display`
  * TODO
* The `matchup comparison form`:
  * TODO
* The `title bar`
  * TODO




### Unsorted stories

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