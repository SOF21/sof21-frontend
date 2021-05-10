import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"
import Button from "@rmwc/button"
import FormTextInput from "../../components/forms/components/FormTextInput"
import Header from "../../components/page_components/NiceHeader"

import { info } from "../../constants"

const content = [
  {
    title: "Geografi",
    events: [
      "Tutputtens äventyr: Ta bilder från alla världens hörn. Laget och tutputte ska vara med på bilden. #TutputtensÄventyr på inläggen. (1p för varje bild)",
      "Bygg ett slott (max 5p)",
      "Visa i ditt kök hur du skulle ta dig till SOF om det var i LKPG  (max 5p)",
      "Återskapa en känd plats i världen i ditt sovrum (max 5p)",
      "Anordna ett tee-party över internet (1p för varje deltagare)",
    ],
  },
  {
    title: "Underhållning",
    events: [
      "Jamma en låt med ett annat lag över internet (1p för varje deltagare)",
      "Gör er egen tolkning på en av följande låtar: Epic Sax Guy, gangnam style, nyan cat eller pink fluffy unicorn (max 5p)",
      "Sjung en trudelutt för grannarna genom fönstret (max 5p)",
      "Måla ett grupporträtt  (max 5p)",
      "Skriv en egen låt om SOF (max 5p)",

      `Spela in en musikvideo till låten <a href="https://www.youtube.com/watch?v=NjxNnqTcHhg" target='_blank' rel='noopener noreferrer'>Popcorn</a>`,
    ],
  },
  {
    title: "Historia",
    events: [
      "Ta fram en bild från det första SOF ni var med på. #SOFGammal (max 3p)",
      "Återskapa ett klassiskt dataspel (max 5p)",
      "Gör om din säng till något som inte är en säng (max 5p)",
      "Bli en superhjälte och demonstrera dina krafter (max 5p)",
      "Återskapa en känd film utan att prata  (max 5p)",
    ],
  },
  {
    title: "Kultur & Litteratur",
    events: [
      "Linda in någon som en mumie (max 3p)",
      "Gå luciatåg på distans (1p för varje deltagare)",
      "Gör ett monster med saker som finns i ditt kök (max 5p)",
      "Klä ut någon till en känd person och gör något oväntat (max 5p)",
      "Skapa ett klädesplagg med en soppåse (max 5p)",
    ],
  },
  {
    title: "Naturvetenskap",
    events: [
      "Gör något stort, som vanligtvis brukar vara litet (max 5p bedöms på storleken)",
      `Ta en bild med följande grejer i samma bild (max 5p)
        <ul>
          <li>Munskydd</li>
          <li>En SOF general</li>
          <li>5 st olika instrument</li>
          <li>Tutputten</li>
          <li>En person utklädd till Harry Potter</li>
          <li>En vitlök</li>
          <li>En karaktär från Alice i underlandet</li>
          <li>Något rött</li>
          <li>Ett ölglas med mjölk i</li>
          <li>En “sagan om ringen”-bok </li>
          <li>Blommor</li>
        </ul>`,
      "Kasta något i papperskorgen..spektakulärt (max 3p)",
      "Kamouflera dig och avslöja sedan var du är (max 5p)",
      "Baka ett bakverk med temat SOF (max 5p)",
    ],
  },
  {
    title: "Sport & Fritid",
    events: [
      `Dansa <a href="https://www.youtube.com/watch?v=WDhFVZwfe3c" target='_blank' rel='noopener noreferrer'>The Futterwacken Dance</a>. #TheFutterwackenDance (max 5p)`,
      "Häfv en flaska eller drick upp en hel sejdel (max 2p)",
      "Återskapa ett episkt sportevent i ditt kök  (max 5p)",
      "Visa upp en av grejerna som SOF försökt slå världsrekord i (max 5p)",
      "Vissa upp en balett (max 5p) ",
    ],
  },
]

class FridayEventCompInfo extends Component {
  constructor(props) {
    super()
    this.state = {
      code: "",
      open: false,
    }
  }

  static pageTitle() {
    return "Uppdrag"
  }

  static pageNavTitle() {
    return "Uppdrag"
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
        {!this.state.open && (
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
        {this.state.open && (
          <Grid className='base-outer-grid '>
            <GridInner>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Frågor</Header>
              </GridCell>
              <GridCell
                phone='4'
                tablet='8'
                desktop='12'
                style={{ padding: "1.2em" }}
              >
                <Grid>
                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1FLXPbFPYUlhHHGqhtRcegH0Fzak5HTORBbJD0usxIHM/edit?usp=sharing '
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%" }}
                    >
                      Geografi
                    </Button>
                  </GridCell>
                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1zyU4zJtC73rk0AjrPdXUrgYecMwYedcR7agScIGwQLo/edit?usp=sharing'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%" }}
                    >
                      Underhållning
                    </Button>
                  </GridCell>

                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1W6UmtBiSy1gSk0icVFGieOLLX17Geo0M-D9GbI3DNlA/edit?usp=sharing'
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%" }}
                    >
                      Historia
                    </Button>
                  </GridCell>
                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1oJ51cf9PcB8M08ZILEIXBjOVFW65gSwboOvIE-IKZdY/edit?usp=sharing '
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%" }}
                    >
                      Naturvetenskap
                    </Button>
                  </GridCell>

                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1hnofrBu5_w7BLYT9avYfRGDA0OCSKxOjSZlj-ms38qk/edit?usp=sharing '
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%" }}
                    >
                      Sport & Fritid
                    </Button>
                  </GridCell>

                  <GridCell phone='4' tablet='4' desktop='4'>
                    <Button
                      raised
                      tag='a'
                      href='https://docs.google.com/forms/d/1reGUg4iXSvyjeRM-jNCdyjj9WDA-JDeZmlnt0DRLGsw/edit?usp=sharing '
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      Kultur & litteratur
                    </Button>
                  </GridCell>
                </Grid>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Uppdrag</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridGap: "1em",
                  }}
                >
                  {content.map((category) => {
                    const events = category.events.map((event) => {
                      return (
                        <li
                          style={{ marginBottom: "0.5em" }}
                          dangerouslySetInnerHTML={{ __html: event }}
                        />
                      )
                    })
                    return (
                      <Grid>
                        <GridCell
                          phone='4'
                          tablet='3'
                          desktop='3'
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <h5>{category.title}</h5>
                        </GridCell>
                        <GridCell phone='4' tablet='5' desktop='9'>
                          <ul>{events}</ul>
                        </GridCell>
                      </Grid>
                    )
                  })}
                </div>
              </GridCell>
            </GridInner>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

export default FridayEventCompInfo
