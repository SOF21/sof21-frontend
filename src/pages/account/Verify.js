import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import {FormattedMessage} from 'react-intl'

class Verify extends Component{


  static pageTitle(){
    return <FormattedMessage id='Verify.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Verify.navTitle' />
  }


  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage id='Verify.success' />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Verify;
