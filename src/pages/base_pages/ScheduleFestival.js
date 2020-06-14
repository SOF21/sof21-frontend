import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';
import SofCountdown from '../../components/page_components/SofCountdown'
import StageCard from '../../components/page_components/StageCard';
import FullStageCard from '../../components/page_components/FullStageCard';
import Modal from '../../components/page_components/Modal';

import { stageOne, stageTwo, stageThree, stageFour } from '../../orchestraConstants';

import { FormattedMessage, injectIntl } from 'react-intl'

import { withRouter } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';
import { ListDivider } from '@rmwc/list';
import { SimpleDataTable } from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import {
  List,
  ListGroup,
} from '@rmwc/list';


function parseISOLocal(s) {
  var b = s.split(/\D/);
  return new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
}

function findCurrent(stage){
  var i = 0;
  var b = false;
  const now = new Date();
  while (i < stage.length - 1 && parseISOLocal(stage[i].end) < now){
    i++;
  }
  if(parseISOLocal(stage[i].start) > now){
    b = true
  }
  return [i, b];
}


class ScheduleFestival extends Component{
  constructor(props){
    super(props)

    this.state = {
      stageOneS: [null, null], 
      stageTwoS: [null, null], 
      stageThreeS: [null, null], 
      stageFourS: [null, null],
      modalOpen:  false,
      modalStage: '',
    }

  }

  mapStageStrToStageNum = (stage) => {
    if (stage === '1'){
      return stageOne;
    } else if(stage === '2'){
      return stageTwo;
    } else if(stage === '3'){
      return stageThree;
    } else if(stage === '4'){
      return stageFour;
    } else {
      return stageOne;
    }
  }

  mapStageStrToStage = (stage) => {
    if (stage === '1'){
      return this.state.stageOneS;
    } else if(stage === '2'){
      return this.state.stageTwoS;
    } else if(stage === '3'){
      return this.state.stageThreeS;
    } else if(stage === '4'){
      return this.state.stageFourS;
    } else {
      return [null, null];
    }
  }

  static pageTitle(){
    return <FormattedMessage id='ScheduleFestival.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='ScheduleFestival.navTitle' />
  }

  componentDidMount() {
    this.updatePages();
    this.timer = setInterval(this.updatePages, 120000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  updatePages = () => {
    const stageOneCurrent = findCurrent(stageOne);
    const stageTwoCurrent = findCurrent(stageTwo);
    const stageThreeCurrent = findCurrent(stageThree);
    const stageFourCurrent = findCurrent(stageFour);
    this.setState({
      stageOneS: stageOneCurrent, 
      stageTwoS: stageTwoCurrent, 
      stageThreeS: stageThreeCurrent, 
      stageFourS: stageFourCurrent
    });
  }

  render() {
    /*const stageOneCurrent = findCurrent(stageOne);
    const stageTwoCurrent = findCurrent(stageTwo);
    const stageThreeCurrent = findCurrent(stageThree);
    const stageFourCurrent = findCurrent(stageFour);*/
    const stageOneCurrent = this.state.stageOneS;
    const stageTwoCurrent = this.state.stageTwoS;
    const stageThreeCurrent = this.state.stageThreeS;
    const stageFourCurrent = this.state.stageFourS;

    const modalStage = this.mapStageStrToStage(this.state.modalStage)
    const modalStageList = this.mapStageStrToStageNum(this.state.modalStage) 

    return(
      <React.Fragment>
        <Modal
          isOpen={this.state.modalOpen}
          exitCallback={() => this.setState({modalOpen: false})}
        >
          <FullStageCard
            stageList={modalStageList}
            current={modalStage[0]}
            break={modalStage[1]}
          />

        </Modal>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <img
                className = 'full-width-grid-image'
                src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/schedule_festival/schedule1.jpg'
                alt=''
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' style={{marginTop: '16px'}}>
              <Header>
                <FormattedMessage id='ScheduleFestival.stages' />
              </Header>
              <p>
                <FormattedMessage id='ScheduleFestival.text' />
              </p>
              <p>
                <FormattedMessage id='ScheduleFestival.text2' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='1'
                stageName='Bullerbyn'
                stageList={stageOne}
                current={stageOneCurrent[0]}
                break={stageOneCurrent[1]}
                clickCallback={(s) => this.setState({modalOpen: true, modalStage: s})}
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='2'
                stageName='Nangijala'
                stageList={stageTwo}
                current={stageTwoCurrent[0]}
                break={stageTwoCurrent[1]}
                clickCallback={(s) => this.setState({modalOpen: true, modalStage: s})}
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='3'
                stageName='Lönneberga'
                stageList={stageThree}
                current={stageThreeCurrent[0]}
                break={stageThreeCurrent[1]}
                clickCallback={(s) => this.setState({modalOpen: true, modalStage: s})}
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='6'>
              <StageCard 
                stageNum='4'
                stageName='Saltkråkan'
                stageList={stageFour}
                current={stageFourCurrent[0]}
                break={stageFourCurrent[1]}
                clickCallback={(s) => this.setState({modalOpen: true, modalStage: s})}
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <ListDivider style={{width: '100%'}}/>
            </GridCell>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(ScheduleFestival));
