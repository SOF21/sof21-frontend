import React, { Component } from "react"
import { FormattedMessage, injectIntl } from "react-intl"
import Header from "../../components/page_components/NiceHeader"

import { connect, connectAdvanced } from "react-redux"

import { Grid, GridCell, GridInner } from "@rmwc/grid"

class FridayEventInfo extends Component {
  static pageTitle() {
    return <FormattedMessage id='Information' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Information' />
  }

  render() {
    return (
      <React.Fragment>
        <Grid className='base-outer-grid '>
          <GridInner>
            <GridCell
              phone='4'
              tablet='8'
              desktop='12'
              style={{ padding: "1.2em" }}
            >
              <p>
                Mångkampen är en tävling som hålls under SOF-Fredagen mellan kl
                10:00-16:00. Vinnaren kommer sedan att presenteras under
                sittningen. För att delta skapar du ett lag med en eller flera
                personer genom att skapa ett öppet instagramkonto eller använda
                ett redan existerande. Laget ska sedan anmäla sig i
                <a href='https://forms.gle/9QewKDZJAHV7FgXy8'>
                  {" "}
                  detta formulär{" "}
                </a>
                och utföra uppdragen som står på under SOF-Fredag -> Uppdrag.
                När laget är anmält kommer lagnamn och länk till instagramkontot
                läggas upp på hemsidan under SOF-Fredag -> Laginfo. Glöm inte
                att följa
                <a href='https://www.instagram.com/studentorkesterfestivalen/'>
                  {" "}
                  @studentorkesterfestivalen{" "}
                </a>
                på Instagram!
              </p>

              <p>
                Uppdragen är uppdelade i frågor och utmaningar. Under varje
                kategori finns 6 teman: geografi, underhållning, historia,
                naturvetenskap, kultur & litteratur och sport & fritid. Klara så
                många uppdrag som du kan innan tiden är slut. Frågorna får bara
                skickas in en gång per lag.{" "}
              </p>

              <p>
                Försök att inte träffa folk och tänk på att följa
                Folkhälsomyndighetens restriktioner och de rekommendationer som
                finns i din region. Ingen av uppgifterna ska utföras om det
                finns risk för att skada sig. Deltagande sker på egen risk. Ha
                kul!
              </p>

              <p>Att göra:</p>
              <ol>
                <li>
                  Hitta lag, Behöver du hjälp att hitta lagkamrater gå in här:
                  ???
                </li>
                <li>
                  Skapa ett publikt instagramkonto eller använd ett befintligt
                </li>
                <li>
                  Följ{" "}
                  <a href='https://www.instagram.com/studentorkesterfestivalen/'>
                    {" "}
                    @studentorkesterfestivalen{" "}
                  </a>{" "}
                  på instagram
                </li>
                <li>
                  <a href='https://forms.gle/9QewKDZJAHV7FgXy8'>Anmäl laget</a>
                </li>
                <li>Börja med uppdragen!</li>
              </ol>

              <p>Är det några frågor skriv till SOF på instagram. </p>

              <p style={{ marginBottom: 0 }}>
                <b>Snabb info</b>
              </p>
              <p style={{ marginTop: 0 }}>
                Dag: 14 maj <br />
                Tid: 10:00 - 16:00 <br />
                Uppdragen: ??? <br />
                Hitta lag: ??? <br />
                Vinnaren prsenteras på sittningarna. <br />
                Pris: En högtalare och lite annat smått och gott.
              </p>
              <p>Lycka till!</p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}

export default injectIntl(FridayEventInfo)
