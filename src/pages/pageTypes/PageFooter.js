import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { ListDivider } from '@rmwc/list';

import { Ripple } from '@rmwc/ripple';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

import posed from 'react-pose';

import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

const PosedFooter= posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

class PageFooter extends Component{

  render() {
    return(
      <React.Fragment>

        {/*For when content doesn't fill screen, footer still att bottom
        <div className='page-footer-margin'/> */}

        <PosedFooter className='page-footer'>
          <div className='page-footer-content'>
            <Grid>
              <GridInner>
                <GridCell phone='4' tablet='8' desktop='12' >
                  <ListDivider/>
                </GridCell>

                <GridCell phone='4' tablet='5' desktop='8'>
                  <h6>
                      <b>&copy;Studentorkesterfestivalen, 2019</b>
                  </h6>
                </GridCell>
                <GridCell phone='4' tablet='3' desktop='4' className='page-footer-ra-text v-center'>
                  <div className='v-center' style={{flexWrap: 'wrap'}}>
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://lintek.liu.se/" 
                      style={{color: 'white'}}
                    >
                      <h6>
                        <FormattedMessage id="Footer.LinTek"/>
                      </h6>
                              {/*<img 
                        style={{height: '20px'}}
                        async='on'
                        src='https://lintek.liu.se/wp-content/uploads/2018/04/logo-mobile3x.png'
                        alt='LinTek'
                      />
                        */}
                    </a>
                  </div>
                </GridCell>

                <GridCell span='1' desktop='2'>
                  <Ripple unbounded >
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://www.facebook.com/Studentorkesterfestivalen/" 
                      className='fa-ripple'
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} size='3x'/>
                    </a>
                  </Ripple>
                </GridCell>
                <GridCell span='1' desktop='2'>
                  <Ripple unbounded >
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      href="https://www.instagram.com/studentorkesterfestivalen/" 
                      className='fa-ripple'
                    >
                      <FontAwesomeIcon icon={faInstagram} size='3x'/>
                    </a>
                  </Ripple>
                </GridCell>
                <GridCell span='2'>
                </GridCell>
                <GridCell span='4' desktop='6'>
                  <div
                    style={this.props.isMobile ? {} : {textAlign: 'right'}}
                  >
                    <FormattedMessage id='Footer.contact' /> 
                    <a 
                      href='mailto:support@sof.lintek.nu'
                      style={{color: 'white', fontWeight: 'bold'}}
                    >
                      support@sof.lintek.nu
                    </a>
                  </div>
                </GridCell>
              </GridInner>
            </Grid>
          </div>
          <Grid style={{width: '100%', paddingTop: '0px'}}>
            <GridInner>
              <GridCell phone='4' tablet='8' desktop='12' >
                <div
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  <ListDivider style={{width: '100%'}}/>
                  <h6 style={{flexGrow: '2', flexShrink: '0', margin: '0px 12px'}}>
                    <b> <FormattedMessage id='Footer.sponsors'/> </b>
                  </h6>
                  <ListDivider style={{width: '100%'}}/>
                </div>
              </GridCell>
                {/* #############################
                    #       SPONSORS            #
                    #############################*/}
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="http://ebbepark.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/ebbepark_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.studieframjandet.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Studieframjandet_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.grolls.se/" 
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Grolls_logo.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.beijerbygg.se"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Beijer.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='2' tablet='4' desktop='3' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.idainfront.se/en/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/ida-infront.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://nordictoilet.se/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/NordicToilet.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.baljan.org/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Baljan.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.villevallapub.se/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/vvp.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="http://hg.se/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/hg.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="http://www.flamman.org/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/Flamman.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='1' tablet='2' desktop='2' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="http://matnat.se/index.php/utskott/pubverkeriet/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/pubv.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
              <GridCell phone='2' tablet='4' desktop='4' className='v-center'>
                <a
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.linkoping.se/"
                >
                  <img
                    src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/sponsors/linkoping.png'
                    style={{width: '100%'}}
                  />
                </a>
              </GridCell>
            </GridInner>
          </Grid>
        </PosedFooter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.mobile.isMobile,
    //isTablet: state.tablet.isTablet,
  };
}

export default connect(mapStateToProps)(PageFooter);
