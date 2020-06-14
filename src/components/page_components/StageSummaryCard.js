import React, { Component, forwardRef } from 'react';

import Header from '../../components/page_components/NiceHeader';

import { orchestras } from '../..//orchestraConstants';

import { FormattedMessage, injectIntl } from 'react-intl'
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
  ListDivider,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';

function getHM(time){
  return time.substring(10, 16);
}

class StageCard extends Component{

  render(){
    const curStage = this.props.current;
    const stageList = this.props.stageList;
    var firstOrch = stageList[curStage];
    var firstOrchName = orchestras[firstOrch.id];
    var secondOrch = stageList[curStage + 1];
    var thirdOrch = stageList[curStage + 2];

    if (this.props.break){
      thirdOrch = secondOrch;
      secondOrch = firstOrch;
      firstOrch = {
        end: firstOrch.start,
      }
      if(curStage === 0){
        firstOrchName = this.props.intl.formatMessage({id: 'ScheduleFestival.wait'});
      } else{
        firstOrchName = this.props.intl.formatMessage({id: 'ScheduleFestival.break'});
      }
    }
    return(
      <React.Fragment>
        <Card className='about-card' >
          <CardPrimaryAction
            style={{cursor: 'pointer'}}
            onClick={this.props.onClickProp}
          >
            <CardMedia
              sixteenByNine
              style={{ backgroundImage: 'url('+ this.props.img + ')' }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <div className='fading-desc' style={{maxHeight: '240px'}}>
                <List>
                  <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
                    <span>
                        {
                          this.props.intl.formatMessage({id: 'ScheduleFestival.now'}) + " - " 
                            + getHM(firstOrch.end)
                            + ": " 
                        }
                      <b> {firstOrchName} </b>
                    </span>
                  </ListItem>
                  <ListDivider/>
                  <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
                    <span>
                      {
                        getHM(secondOrch.start)
                          + " - "
                          + getHM(secondOrch.end)
                          + ": "
                      }
                      <b> {orchestras[secondOrch.id]} </b>
                    </span>
                  </ListItem>
                  <ListDivider/>
                  <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
                    <span>
                      {
                        getHM(thirdOrch.start)
                          + " - "
                          + getHM(thirdOrch.end)
                          + ": "
                      }
                    <b> {orchestras[thirdOrch.id]} </b>
                    </span>
                  </ListItem>
                  <ListDivider/>
                </List>
              </div>
              <div className='fading-bot' style={{bottom: '48px'}}/>
              <div style={{width: '100%', zIndex: '2', textAlign: 'center', position: 'relative'}}>
                <Header tag='h6'>
                  <FormattedMessage id='ScheduleFestival.full' />
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

export default injectIntl(StageCard);
