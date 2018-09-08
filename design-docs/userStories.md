# Baseball Matchup Comparison

## User-story drafting

### User interaction flow

* When a user loads the app, they arrive at the `landing card`.
  * From the `landing card`, the user can:
    * Click the `get started button`, which...
      * Makes the `landing card` disappear
      * Makes the `drawer nav` appear
* ~~From the `drawer nav`, the user can:~~
  * ~~Complete and submit the `matchup comparison form`~~
  * ~~On small screens, click the `close drawer nav link` to make the `drawer nav` disappear.~~
* ~~When the user clicks the `close drawer nav link`:~~
  * ~~The `drawer nav` disappears.~~
  * ~~The user can view the `main display`.~~
* ~~When the user is at the `main display`, they can:~~
  * ~~On small screens:~~
    * ~~Click the `drawer icon` in the `title bar` to open the `drawer nav`.~~
    * ~~Click the `floating button` in the lower-right corner to open the `drawer nav`.~~
  * ~~On large screens:~~
    * ~~View the `drawer nav` to the left of the `main display`.~~
  * ~~View and interact with a `display card`.~~
* ~~When the user clicks the `floating button`:~~
  * ~~The `floating button` disappears.~~
  * ~~The `drawer nav` appears.~~
* ~~When the user submits the `matchup comparison form`:~~
  * ~~On smaller screens, the `drawer nav` transitions away~~
  * ~~A `loading wheel` is displayed in the `main display`~~
  * ~~The `display cards` are generated and displayed in the `main display`~~
* When a user clicks a `display card`:
  * If the card is NOT expanded:
    * The `display card` expands to display additional information, such as:
      * A text summary of the statistics/visualizations presented.
      * Additional statistics or details.
  * If the card IS expanded:
    * The card contracts, hiding any additional information it contained.

### Components and their descriptions

* ~~The `close drawer nav link`:~~
  * ~~Is:~~
    * ~~A link/icon that appears on the `drawer nav`~~
* ~~The `drawer icon`:~~
  * ~~Is:~~
    * ~~On smaller screens: A link/icon that appears on the `title bar`, to the left of the site title.~~
* ~~The `drawer nav`:~~
  * ~~Is:~~
    * ~~On small screens, a slide in/out hover layer on the left side of the screen~~
    * ~~On large screens, a panel adjacent to the `main display` on the left side of the screen~~
  * ~~Contains:~~
    * ~~The `matchup selection form`~~
    * ~~On small screens, a `close drawer nav link` (w/ icon)~~
* ~~The `floating button`:~~
  * ~~Is:~~
    * ~~A button that floats above the `main display`, in the lower right-hand corner.~~
* The `get started button`:
  * Is a button that:
      * Makes the `landing card` disappear
      * On small screens: Makes the `drawer nav` appear
      * On large screens: Makes the `drawer nav` and `main display` appear.
* The `landing card`:
  * Is:
    * A full-screen, floating card
  * Contains:
    * A welcome statement, introducing the purpose of the app
    * Instructions on how to use the app
    * A disclaimer stating the app currently uses fake data.
    * A `get started` button.
* The `main display`:
  * ~~Is:~~
    * ~~The central content area in the app.~~
  * Contains the following `display cards`:
    * When the user first launches the app:
      * The `landing card`
    * Once the user has submitted the `matchup comparison form`:
      * ~~Head-to-head W-L~~
        * ~~Includes a table with the box score for each matchup~~
        * ~~How many games the two teams have remaining in the season~~
      * ~~Side-by-side comparison of their overall season stats.~~
      * ~~A 'win tracker' charting their relative progress over the course of the season.~~
        * The win tracker highlights the winner of head-to-head match-ups, with tooltips that display the score.
* ~~The `matchup comparison form`~~
  * ~~Is:~~
    * ~~The form that allows the user to select a new matchup comparison.~~
  * ~~Contains the following inputs:~~
    * ~~`Team1` - A dropdown list of all active MLB teams.~~
    * ~~`Team2` - A dropdown list of all active MLB teams.~~
    * ~~`Season` - A dropdown list of all MLB seasons for which statistics are available via the API.~~
    * ~~`Submit` - A button that submits the form and generates the `matchup analysis`.~~
* The `title bar`:
  * Is:
    * A fixed-position bar at the top of the app
  * Contains:
    * On small screens: The `drawer nav` button
    * On all screens: The site title, which is either:
      * ~~Before the user has submitted the `matchup comparison form`:~~
        * ~~*MLB Matchup Comparison App*~~
      * After the user has submitted the `matchup comparison form`:
        * *XXX vs. YYY, ZZZZ season*

### Data flow

* ~~When a user loads the app:~~
  * ~~A fantasyData API Call collects the list of team details~~
  * ~~These details populate the `matchup comparison form` dropdown fields.~~
  * ~~Is the list of available seasons queryable via API, or should it be statically coded?~~
* When a user submits the `matchup comparison form`:
  * ~~The system checks whether the requested season's data exists as the object, `seasonDataGlobal.{season}`~~
  * ~~If the data DOES exist:~~
    * ~~The `matchup analysis process` is initiated.~~
  * ~~If the data does NOT exist:~~
    * ~~A fantasyData API Call collects:~~
      * ~~Team stats for the requested season~~
      * ~~Game schedule for the requested season~~
    * ~~The data are stored as objects within `seasonDataGlobal.{season}.teamStats`
        and `seasonData.{season}.games`, respectively.~~
    * ~~The `matchup analysis process` is initiated.~~

