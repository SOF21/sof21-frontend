import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"

const teams = [
  { name: "Komp1", link: "https://www.instagram.com/lithe_komp/" },
  { name: "Horn Balun", link: "https://www.instagram.com/hornbalun/" },
  {
    name: "Saxofonsektionen i LiTHe Blås",
    link: "https://www.instagram.com/saxsekten/",
  },
  {
    name: "Luhrarne SOF21",
    link: "https://www.instagram.com/luhrarne_sof21/",
  },
]

class FridayEventTeams extends Component {
  constructor(props) {
    super()
    this.state = {
      code: "",
      open: false,
    }
  }

  static pageTitle() {
    return "Lag"
  }

  static pageNavTitle() {
    return "Lag"
  }

  render() {
    console.log(teams)
    return (
      <React.Fragment>
        <Grid className='base-outer-grid '>
          <GridInner style={{ padding: "1.2em" }}>
            {teams.map((team) => (
              <GridCell
                phone='4'
                tablet='4'
                desktop='4'
                style={{ textAlign: "center" }}
              >
                <h5 style={{ marginBottom: 0 }}>
                  <a target='_blank' rel='noopener noreferrer' href={team.link}>
                    {team.name}
                  </a>
                </h5>
              </GridCell>
            ))}
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}

export default FridayEventTeams
