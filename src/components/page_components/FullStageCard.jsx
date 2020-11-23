import React, { Component, forwardRef } from 'react';

import Header from '../../components/page_components/NiceHeader';

import { orchestras } from '../..//orchestraConstants';

import { TouchScrollable } from 'react-scrolllock';

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

function parseISOLocal(s) {
  var b = s.split(/\D/);
  return new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
}

function getHM(time){
  return time.substring(11, 16);
}

function getDayChangeIndex(stageList){
  var indexes =new Array(stageList.length)
  var lastDate = stageList[0].start
  stageList.forEach((entry, id) => {
    var eStart = parseISOLocal(entry.start);
    var lastD = parseISOLocal(lastDate);
    if ( eStart.getDay() === lastD.getDay() &&
      eStart.getHours() > 3 && lastD.getHours() <= 3
    ) {
      indexes[id] = true;
    } else {
      indexes[id] = false;
    }

    lastDate = entry.start
  })
  return indexes;
}

function stageEntryToDayStr(stageList, num, intl){
  const day = parseISOLocal(stageList[num].start)

  if(day === 4){
    return intl.formatMessage({id: 'ScheduleFestival.thur'})
  } else if(day === 5){
    return intl.formatMessage({id: 'ScheduleFestival.fri'})
  } else {
    return intl.formatMessage({id: 'ScheduleFestival.sat'})
  }
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

    const pastGigs = stageList.slice(0, curStage);
    var nextGigs = stageList.slice(curStage);

    const changeI = getDayChangeIndex(stageList);

    if (this.props.break){
      const currentGig = {
        end: nextGigs[0].start,
        id: 39
      }
      //nextGigs = nextGigs.slice(1);
      nextGigs.unshift(currentGig);
    }

    const pastGigsElems = pastGigs.reverse().map((gig, it) => (
      <React.Fragment key={gig.id + gig.start}>
        <ListItem style={{height: '72px'}} className='mdc-item-uninteractive' ripple={false}>
          <span>
            {
              getHM(gig.start)
                + " - "
                + getHM(gig.end)
                + ": "
            }
          <b> {orchestras[gig.id]} </b>
          </span>
        </ListItem>
        <ListDivider/> 
      </React.Fragment>
    ));

    const nextGigElems = nextGigs.map((gig, it) => (
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
          {it < nextGigs.length - 1? 
              (changeI[it + curStage + 1]  ? <Header tag='h6'> 
                  {stageEntryToDayStr(stageList, it + curStage + 1, this.props.intl)} 
                </Header> : 
              <ListDivider/>)
              : null}
      </React.Fragment>
    ));

    return(
      <React.Fragment>
          <TouchScrollable>
        <Card 
          className='about-card' 
          style={{height: '80vh', width: '90vw', maxWidth: '720px', overflowY: 'scroll', pointerEvents: 'auto'}}
        >
            <div>
              <List>
                {nextGigElems}
              </List>
              <Header>
                <FormattedMessage id='ScheduleFestival.pastGigs' />
              </Header>
              <List>
                {pastGigsElems}
              </List>
            </div>
        </Card>
          </TouchScrollable>
      </React.Fragment>
    );
  }
}

export default injectIntl(StageCard);
