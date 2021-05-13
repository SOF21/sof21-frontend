import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"
import FormTextInput from "../../components/forms/components/FormTextInput"
import Button from "@rmwc/button"
import Header from "../../components/page_components/NiceHeader"

import { info } from "../../constants"

const teams = [
  { name: "test", link: "/#" },
  { name: "test", link: "/#" },
  { name: "test", link: "/#" },
  { name: "test", link: "/#" },
  { name: "test", link: "/#" },
]

class SaturdaySchedule extends Component {
  constructor(props) {
    super()
    this.state = {
      code: "",
      open: false,
    }
  }

  static pageTitle() {
    return "Information"
  }

  static pageNavTitle() {
    return "Information"
  }

  render() {
    return (
      <React.Fragment>
        <Grid className='base-outer-grid '>
          <GridInner style={{ padding: "1.2em" }}>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>Festivalstreamen</Header>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
      
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}

export default SaturdaySchedule
