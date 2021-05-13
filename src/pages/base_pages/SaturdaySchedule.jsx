import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"
import FormTextInput from "../../components/forms/components/FormTextInput"
import Button from "@rmwc/button"
import Header from "../../components/page_components/NiceHeader"

class SaturdaySchedule extends Component {
  constructor(props) {
    super()
  }

  static pageTitle() {
    return "Schema"
  }

  static pageNavTitle() {
    return "Schema"
  }

  render() {
    return (
      <React.Fragment>
        <Grid className='base-outer-grid '>
          <GridInner style={{ padding: "1.2em" }}>
            <GridCell phone='4' tablet='8' desktop='12'>
              <p>
                Ett vanligt år hade Blå Havet på Campus Valla varit fyllt med
                dansande baletter, spelande orkestrar och glada studenter. I år
                ser saker och ting annorlunda ut, och så även SOF. Årets SOF
                består av tre parallella streams, två med musik och en med
                tävlingar, intervjuer och andra roliga inslag.
              </p>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>Festivalstreamen</Header>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <p>
                I festivalstreamen kommer Markus “Boffe” Wästlund leda dig genom
                dagen. Dagens viktigaste tider hittar du här nedan.
              </p>
              <p>
                13.00: Streamen startar
                <br />
                15.00: Kårtege
                <br />
                15:30: Musikquiz
                <br />
                17:00: Cookalong
                <br />
                20:00: MelodiSOFtivalen
                <br />
              </p>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>Musikstream 1</Header>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <p>
                I musikstreamen bjuds du på spelningar av studentorkestrar från
                hela Sverige och delar av Europa. Spelschemat för musikstream 1
                hittar du här nedan.
              </p>
              <p>
                13.10: Musikcorpset Mistluren
                <br />
                13.25: Röda Arméns Gosskör
                <br />
                13:35: AllianceOrchestret & Chalmersbaletten
                <br />
                15:40: Studentorkestern Luhrarne
                <br />
                16:50: LiTHe Blås
                <br />
                18:15: Studentorkestern Snösvänget
                <br />
                18:40: Studentorkestern Luhrarne
                <br />
                19:30: Smålands Nations Glasblåsarlag
                <br />
              </p>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>Musikstream 2</Header>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <p>
                I musikstreamen bjuds du på spelningar av studentorkestrar från
                hela Sverige och delar av Europa. Spelschemat för musikstream 2
                hittar du här nedan.
              </p>
              <p>
                13.10: Promenadorquestern och med Baletten Paletten
                <br />
                14.40: Blåslaget
                <br />
                14:45: AMC Bleckhornen
                <br />
                16:30: Teekkaritorvet
                <br />
                16:35: MusikAlliansen Alte Kamereren
                <br />
                17:15: Teknologorkestern Humpsvakar
                <br />
                17:25: AllianceOrchestret & Chalmersbaletten
                <br />
                17:45: Wijkmanska Blecket
                <br />
                18:00: KHMMC Blåshjuden
                <br />
                18:05: ab Kruthornen och Letta Gardet
                <br />
                19:05: Tuna de Medicina de Granada
                <br />
                19:10: Allmand Chaoten Orchester (ACO)
                <br />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}

export default SaturdaySchedule
