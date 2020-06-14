import React, { Component, forwardRef } from 'react';

import Header from '../../components/page_components/NiceHeader';

import { FormattedMessage } from 'react-intl'
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


class EventCard extends Component{

  render(){

    return(
      <React.Fragment>
        <Card className='about-card' >
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href={this.props.url}
            style={{color: 'inherit', textDecoration: 'inherit'}}
          >
          <CardPrimaryAction
            style={{cursor: 'pointer'}}
          >
            <CardMedia
              sixteenByNine
              style={{ backgroundImage: 'url('+ this.props.img + ')' }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <h5 style={{margin: '8px 0px'}}>
                  {this.props.title}
              </h5>
              <div className='fading-desc'>
                  {this.props.desc}
              </div>
              <div className='fading-bot' style={{bottom: '48px'}}/>
              <div style={{width: '100%', zIndex: '2', textAlign: 'center', position: 'relative'}}>
                <Header tag='h6'>
                  <FormattedMessage id='EventFestival.more' />
                </Header>
              </div>
            </div>
          </CardPrimaryAction>
        </a>
        </Card>
      </React.Fragment>
    );
  }
}

export default EventCard;
