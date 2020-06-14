import React, { Component } from 'react';

import {
  Card,
  CardPrimaryAction,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';

import { Typography } from '@rmwc/typography';

import { injectIntl } from 'react-intl';

class OrchestraCard extends Component{

  render(){
    const { orchestra } = this.props;
    const types = [
      this.props.intl.formatMessage({id: 'Orchestra.orchestra'}),
      this.props.intl.formatMessage({id: 'Orchestra.band'}),
    ]

    const arrivalDays = [
      this.props.intl.formatMessage({id: 'Orchestra.thur'}),
      this.props.intl.formatMessage({id: 'Orchestra.fri'}),
      this.props.intl.formatMessage({id: 'Orchestra.sat'}),
    ]

    return(
      <React.Fragment>
        <Card style={{ width: '100%' }} >
          <div style={{ padding: '1rem' }}>
            <Typography use="headline5" tag="div">
              {orchestra.orchestra.name}
            </Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                {types[orchestra.orchestra.orchestra_type]}
              </Typography>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                {this.props.intl.formatMessage({id: 'Orchestra.members'})
                   +  orchestra.orchestra.members_count}
              </Typography>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography use="body1" tag="p" theme="textSecondaryOnBackground" style={{margin: '0px'}}>
                {this.props.intl.formatMessage({id: 'Orchestra.arrives'})
                  + arrivalDays[orchestra.orchestra.arrival_date]}
              </Typography>
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(OrchestraCard);
