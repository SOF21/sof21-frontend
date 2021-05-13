import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"
import Button from "@rmwc/button"
import FormTextInput from "../../components/forms/components/FormTextInput"
import Header from "../../components/page_components/NiceHeader"

import { info } from "../../constants"

class FridayEventInfo extends Component {
  constructor(props) {
    super()
    this.state = {
      code: "",
      open: false,
      showInfo: new Date().getTime() > new Date("May 14 2021").getTime(),
    }
  }

  static pageTitle() {
    return "Information"
  }

  static pageNavTitle() {
    return "Information"
  }

  handlePasscode = (e) => {
    e.preventDefault()
    if (this.state.code === info.SOFFriday) {
      this.setState({ open: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.showInfo && (
          <Grid className='base-outer-grid '>
            <GridCell
              desktop='12'
              tablet='8'
              phone='4'
              style={{ textAlign: "center" }}
            >
              <h5>Mer information kommer senare!</h5>
              <img
                className='full-width-grid-image'
                style={{ maxWidth: "200px", padding: "1em" }}
                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Logo-kvadrat-512px.png'
                alt='SOF logo'
              />
            </GridCell>
          </Grid>
        )}
        {!this.state.open && this.state.showInfo && (
          <Grid className='base-outer-grid '>
            <GridCell desktop='12' tablet='8' phone='4'>
              <form onSubmit={this.handlePasscode}>
                <FormTextInput
                  label='Adminkod'
                  type='text'
                  onChange={(e) => this.setState({ code: e.target.value })}
                  onSubmit={(e) => this.handlePasscode(e)}
                  value={this.state.code}
                  style={{ width: "100%", marginBottom: "1em" }}
                />
                <Button type='submit' raised style={{ width: "100%" }}>
                  Skicka
                </Button>
              </form>
            </GridCell>
          </Grid>
        )}
        {this.state.open && this.state.showInfo && (
          <Grid className='base-outer-grid '>
            <GridInner style={{ padding: "1.2em" }}>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Mångkamp</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p style={{ marginTop: 0 }}>
                  Mångkampen är en tävling som hålls under SOF-Fredagen mellan
                  kl 10:00-16:00. Vinnaren kommer sedan att presenteras under
                  sittningen. För att delta skapar du ett lag med en eller flera
                  personer genom att skapa ett öppet instagramkonto eller
                  använda ett redan existerande. Laget ska sedan anmäla sig i
                  <a
                    href='https://forms.gle/9QewKDZJAHV7FgXy8'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {" "}
                    detta formulär{" "}
                  </a>
                  och utföra uppdragen som står på under SOF-Fredag - Uppdrag.
                  När laget är anmält kommer lagnamn och länk till
                  instagramkontot läggas upp på hemsidan under SOF-Fredag - Lag.
                  Glöm inte att följa
                  <a
                    href='https://www.instagram.com/studentorkesterfestivalen/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {" "}
                    @studentorkesterfestivalen{" "}
                  </a>
                  på Instagram!
                </p>

                <p>
                  Uppdragen är uppdelade i frågor och utmaningar. Under varje
                  kategori finns 6 teman: geografi, underhållning, historia,
                  naturvetenskap, kultur & litteratur och sport & fritid. Klara
                  så många uppdrag som du kan innan tiden är slut. Frågorna får
                  bara skickas in en gång per lag.{" "}
                </p>

                <p>
                  Försök att inte träffa folk och tänk på att följa
                  Folkhälsomyndighetens restriktioner och de rekommendationer
                  som finns i din region. Ingen av uppgifterna ska utföras om
                  det finns risk för att skada sig. Deltagande sker på egen
                  risk. Ha kul!
                </p>

                <p>Att göra:</p>
                <ol>
                  <li>
                    Hitta lag, behöver du hjälp att hitta lagkamrater gå in på
                    SOF:s
                    <a
                      href='https://www.instagram.com/studentorkesterfestivalen/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {" "}
                      instagram
                    </a>{" "}
                  </li>
                  <li>
                    Skapa ett publikt instagramkonto eller använd ett befintligt
                  </li>
                  <li>
                    Följ{" "}
                    <a
                      href='https://www.instagram.com/studentorkesterfestivalen/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {" "}
                      @studentorkesterfestivalen{" "}
                    </a>{" "}
                    på instagram
                  </li>
                  <li>
                    <a
                      href='https://forms.gle/9QewKDZJAHV7FgXy8'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Anmäl laget
                    </a>
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
                  <a
                    href='https://www.sof.lintek.liu.se/friday_tasks'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Uppdragen
                  </a>
                  <br />
                  <a
                    href='https://www.instagram.com/studentorkesterfestivalen/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Hitta lag
                  </a>
                  <br />
                  Vinnaren prsenteras på sittningarna. <br />
                  Pris: En högtalare och lite annat smått och gott.
                </p>
                <p>Lycka till!</p>
              </GridCell>
            </GridInner>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

export default FridayEventInfo
