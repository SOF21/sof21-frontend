
import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import AboutCard from '../../components/page_components/AboutCard';
import Header from '../../components/page_components/NiceHeader';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import Feed from "react-instagram-authless-feed"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { isSafari } from 'react-device-detect';

const scheduleIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/schedule_festival/schedule1.jpg';
const areaIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_festival/Map_small.png';
const cortegeFestivalIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg';
const eventIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_events/event1.jpg';

const festivalAboutIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival1.jpg';
const cortegeAboutIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege1.jpg';
const orchestraAboutIm = 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester1.jpg';
const HistoryIm = 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Bilder/Guldbrallor.jpg';

class Start extends Component {
  constructor(props) {
    super(props)

    this.onTimerFinish = this.onTimerFinish.bind(this);

    this.state = { timerFinished: false, toDate: new Date('2019-01-21T00:00:00') };
  }

  static pageTitle() {
    return <FormattedMessage id='Start.title' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Start.navTitle' />
  }

  onTimerFinish() {
    this.setState({ timerFinished: true });
  }

  render() {
    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;

    return (
      <React.Fragment>
        {/* <Grid className="base-outer-grid base-outer-grid--first" style={{ paddingBottom: '1.5rem' }}>
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12' >
              <img
                className='full-width-grid-image'
                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Header-hemsida-vit.png'
                alt='The SOF logo next to the date of the festival'
              />
            </GridCell>
          </GridInner>
        </Grid> */}

        {/*  THIS YEARS FESTIVAL
            
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='Start.festivalTitle' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={scheduleIm}
                title={<FormattedMessage id='ScheduleFestival.navTitle'/>}
                desc={
                  <React.Fragment>
                    <FormattedMessage id='ScheduleFestival.text'/>
                    <br/>
                    <FormattedMessage id='ScheduleFestival.text2'/>
                  </React.Fragment>
                }
                onClickProp={() =>this.props.history.push('/festival_schedule')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={areaIm} 
                title={<FormattedMessage id='AreaFestival.navTitle'/>}
                desc={<FormattedMessage id='AreaFestival.text'/>}
                onClickProp={()=>this.props.history.push('/festival_area')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={cortegeFestivalIm}
                title={<FormattedMessage id='CortegeFestival.navTitle'/>}
                desc={
                  <React.Fragment>
                    <FormattedMessage id='CortegeFestival.time'/>
                    <br/>
                    <FormattedMessage id='CortegeFestival.route'/>
                  </React.Fragment>
                }
                onClickProp={()=>this.props.history.push('/festival_cortege')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard 
                background={eventIm}
                title={<FormattedMessage id='EventFestival.navTitle'/>}
                desc={<FormattedMessage id='EventFestival.activitiesT'/>}
                onClickProp={() => this.props.history.push('/festival_activities')}
              />
            </GridCell> */}
        {/* <HighlightedArea className='countdown-inner' color='yellow'
        >
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            {!this.props.isMobile ?
              <h2 style={{ margin: '10px' }}>
                <Link to='/putte' style={{ color: 'white' }}>
                  <FormattedMessage id='Start.putte' />
                </Link>
              </h2>
              :
              <h4 style={{ margin: '10px' }}>
                <Link to='/putte' style={{ color: 'white' }}>
                  <FormattedMessage id='Start.putte' />
                </Link>
              </h4>
            }
          </GridCell>
        </HighlightedArea> */}

        <Grid className="base-outer-grid">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12' >
              <img
                className='full-width-grid-image'
                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Header-hemsida-vit.png'
                alt='The SOF logo next to the date of the festival'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='Start.moreInfo' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard
                background={festivalAboutIm}
                title={<FormattedMessage id='About.navTitle' />}
                desc={<FormattedMessage id='About.p1' />}
                onClickProp={() => this.props.history.push('/about_festival')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard
                background={cortegeAboutIm}
                title={<FormattedMessage id='CortegeAbout.navTitle' />}
                desc={<FormattedMessage id='CortegeAbout.p1' />}
                onClickProp={() => this.props.history.push('/about_cortege')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard
                background={orchestraAboutIm}
                title={<FormattedMessage id='OrchestraAbout.navTitle' />}
                desc={<FormattedMessage id='OrchestraAbout.p1' />}
                onClickProp={() => this.props.history.push('/about_orchestra')}
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' >
              <AboutCard
                background={HistoryIm}
                title={<FormattedMessage id='History.navTitle' />}
                desc={<FormattedMessage id='History.historyParagraph1' />}
                onClickProp={() => this.props.history.push('/about_history')}
              />
            </GridCell>
          </GridInner>
        </Grid >

      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.mobile.isMobile,
    //isTablet: state.tablet.isTablet,
  };
}

export default connect(mapStateToProps)(withRouter(injectIntl(Start)));
