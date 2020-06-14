import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

import { withRouter } from 'react-router-dom';

class NotFound extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  static pageTitle(){
    return <FormattedMessage id='404.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='404.title' />
  }

  render() {
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h4 style={{margin: '0px', marginBottom: '16px'}} className='h-center'>
                <FormattedMessage
                  id="404.text"
                />
              </h4>
              <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('/')}>
                <FormattedMessage
                  id="404.button"
                />
              </Button>
            </GridCell>
          </GridInner>
        </Grid>

      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(NotFound, { withRef: true }));
