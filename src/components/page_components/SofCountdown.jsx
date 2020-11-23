import React, { Component } from 'react';

import { GridCell } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';
import { FormattedMessage } from 'react-intl';

class SofCountdown extends Component {
  constructor(props){
    super(props);

    this.countdownFinishCallback = this.countdownFinishCallback.bind(this);
    this.updateTime = this.updateTime.bind(this);

    this.state = {timeLeft: {}, finised: false};
  }

  secondsToTime(secs) {
    let days = Math.floor(secs / (24 * 60 * 60));

    let divisor_for_hours = secs % (24 * 60 * 60);
    let hours = Math.floor(divisor_for_hours / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "d": days,
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  countdownFinishCallback(){
    this.props.countdownFinishCallback();
  }

  componentDidMount() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  updateTime() {
    if(!this.state.finished){
      var now = new Date();
      let seconds = (this.props.toDate.getTime() - now.getTime())/1000;
      if(seconds >= 0){
        this.setState({timeLeft: this.secondsToTime(seconds)});
      } else{
        this.setState({finished: true});
        this.countdownFinishCallback();
      }
    }
  }

  render(){
    return(
      <React.Fragment>
        <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
          <h3 style={{margin: '0'}}>
            {this.props.label}
          </h3>
        </GridCell>

        <GridCell phone='4' tablet='8' desktop='12' >
          <ListDivider/>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h4 style={{margin: '0'}}>
            {this.state.timeLeft.d} <br className='hide-mobile' /> 
            <FormattedMessage
              id="Countdown.days"
              defaultMessage="DAGAR"
            />
          </h4>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h4 style={{margin: '0'}}>
            {this.state.timeLeft.h} <br className='hide-mobile' />
            <FormattedMessage
              id="Countdown.hours"
              defaultMessage="TIMMAR"
            />
          </h4>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h4 style={{margin: '0'}}>
            {this.state.timeLeft.m} <br className='hide-mobile' /> 
            <FormattedMessage
              id="Countdown.minutes"
              defaultMessage="MINUTER"
            />
          </h4>
        </GridCell>

        <GridCell phone="4" tablet="4" desktop='3' className='h-center'>
          <h4 style={{margin: '0'}}>
            {this.state.timeLeft.s} <br className='hide-mobile' /> 
            <FormattedMessage
              id="Countdown.seconds"
              defaultMessage="SEKUNDER"
            />
          </h4>
        </GridCell>
      </React.Fragment>
    )
  }
}

export default SofCountdown;
