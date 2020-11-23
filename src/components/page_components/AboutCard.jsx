import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
  CardActions,
  CardPrimaryAction,
  CardActionButtons,
  CardActionButton,
} from '@rmwc/card';

import { Ripple } from '@rmwc/ripple';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';


class AboutCard extends Component{

  render(){

    return(
      <React.Fragment>
        <Card className='about-card' >
          <CardPrimaryAction
            style={{cursor: 'pointer'}}
            onClick={this.props.onClickProp}
          >
            <CardMedia
              sixteenByNine
              style={{ backgroundImage: 'url('+ this.props.background + ')' }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <h5 style={{margin: '8px 0px'}}>
                  {this.props.title}
              </h5>
              <div className='fading-desc'>
                  {this.props.desc}
              </div>
              <div className='fading-bot'/>
            </div>
          </CardPrimaryAction>
        </Card>
      </React.Fragment>
    );
  }
}

export default AboutCard;
