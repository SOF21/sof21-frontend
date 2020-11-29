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
import { CircularProgress } from '@rmwc/circular-progress';

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
  return time.substring(11, 16);
}

class StageCard extends Component{

  render(){

    if (this.props.current === null){
      return(
        <Card className='about-card' 
          style={{minHeight: '128px'}}
        >
          <div className='h-center'>
            <CircularProgress size="large" />
          </div>
        </Card>
      );
    }
    const curStage = this.props.current;
    const stageList = this.props.stageList;
    var nextGigs = stageList.slice(curStage);
    /*var firstOrch = stageList[curStage];
    var firstOrchName = orchestras[firstOrch.id];
    var secondOrch = stageList[curStage + 1];
    var thirdOrch = stageList[curStage + 2];*/

    const moreText = this.props.soon ? <FormattedMessage id='ScheduleFestival.soon' />  : <FormattedMessage id='ScheduleFestival.full' />

    if (this.props.break){
      const currentGig = {
        end: nextGigs[0].start,
        id: 39
      }
      //nextGigs = nextGigs.slice(1);
      nextGigs.unshift(currentGig);
    }
    
      /*if (this.props.break){
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
    }*/

    const nextGigElems = nextGigs.slice(0, 3).map((gig, it) => (
      <React.Fragment key={gig.id + gig.start}>
        <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
          <span>
            {
              ( it === 0 ?
                this.props.intl.formatMessage({id: 'ScheduleFestival.now'}) :
                getHM(gig.start)
              )
                + " - "
                + getHM(gig.end)
                + ": "
            }
          <b> {orchestras[gig.id]} </b>
          </span>
        </ListItem>
          {it < nextGigs.length - 1 ? 
              <ListDivider/>
              : null}
      </React.Fragment>
    ));
    return(
      <React.Fragment>
        <Card className='about-card' >
          <CardPrimaryAction
            style={{cursor: 'pointer'}}
            onClick={() => this.props.clickCallback(this.props.stageNum)}
          >
              {/*<CardMedia
              sixteenByNine
              style={{ backgroundImage: 'url('+ this.props.img + ')' }}
            />*/}
            <div
              style={{
                width: 'calc(100% - 32px)',
                height: '20%',
                background: '#F00',
                color: 'white',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <h4 style={{margin: '0'}}>
                {this.props.intl.formatMessage({id: 'ScheduleFestival.stage'}) + this.props.stageNum}
                <br/>
                {this.props.stageName}
              </h4>
                
            </div>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <div className='fading-desc' style={{maxHeight: '240px'}}>
                <List>
                    {nextGigElems}
                    {/*<ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
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
                */}
                </List>
              </div>
              <div className='fading-bot' style={{bottom: '48px'}}/>
              <div style={{width: '100%', zIndex: '2', textAlign: 'center', position: 'relative'}}>
                <Header tag='h6'>
                    {moreText}
                </Header>
              </div>
            </div>
          </CardPrimaryAction>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(StageCard);
