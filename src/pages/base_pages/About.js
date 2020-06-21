import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'

import HighlightedArea from '../../components/page_components/HighlightedArea';
import SofCountdown from '../../components/page_components/SofCountdown'
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Ripple } from '@rmwc/ripple';

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const images = [
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival1.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival2.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival3.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival4.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival5.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/festival_about/festival6.jpg',
    description: '',
  }
]

class About extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.modalRef = React.createRef();

    this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00'), imageModalOpen: false, selectedImage: 1};
  };

  static pageTitle(){
    return <FormattedMessage id='About.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='About.navTitle' />
  }

  openModal(imageI){
    this.setState({imageModalOpen: true});
    this.modalRef.current.changeImage(imageI);
    document.addEventListener("keydown", this.keyPress, false);
  }

  closeModal(){
    this.setState({imageModalOpen: false});
    document.removeEventListener("keydown", this.keyPress, false);
  }

  keyPress(event){
    if(event.keyCode === 27){ //If esc button
      this.closeModal();
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyPress, false); // Prevent leak
  }

  render() {
    return(
      <React.Fragment>
        <ImageModal
          ref={this.modalRef}
          isOpen={this.state.imageModalOpen}
          images={images}
          exitCallback={()=>this.closeModal()}
        />
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <Ripple>
                <div
                  className = 'full-width-grid-image cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[0].original + ')'}}
                  onClick={() => this.openModal(0)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage
                  id="About.p1"
                />
              </p>
              <p>
                <FormattedMessage
                  id="About.p2"
                />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='8' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-desktop mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[1].original + ')'}}
                  onClick={() => this.openModal(1)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='4' className='h-center'>
              <GridInner style={{width: '100%'}} className='grid-gap-8'>
                <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                  <Ripple>
                    <div
                      className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                      style={{backgroundImage: 'url(' + images[2].original + ')'}}
                      onClick={() => this.openModal(2)}
                    />
                  </Ripple>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                  <Ripple>
                    <div
                      className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                      style={{backgroundImage: 'url(' + images[3].original + ')'}}
                      onClick={() => this.openModal(3)}
                    />
                  </Ripple>
                </GridCell>
              </GridInner>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage 
                  id="About.p3"
                />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[4].original + ')'}}
                  onClick={() => this.openModal(4)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[5].original + ')'}}
                  onClick={() => this.openModal(5)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <h3 style={{margin: '16px 0px'}}>
                <FormattedMessage
                  id="About.p4"
                />
              </h3>
            </GridCell>
          </GridInner>
        </Grid>

       {/*  <HighlightedArea className='countdown-inner' color='green'>
            {!this.props.isMobile ?
              <h2 style={{margin: '10px'}}>
                <Link to='/shop' style={{color: 'white'}}>
                  <FormattedMessage id='Start.buyTicket' />
                </Link>
              </h2>
                :
              <h4 style={{margin: '10px'}}>
                <Link to='/shop' style={{color: 'white'}}>
                  <FormattedMessage id='Start.buyTicket' />
                </Link>
              </h4>
            }
        </HighlightedArea> */}

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

export default connect(mapStateToProps)(withRouter(injectIntl(About, { withRef: true })));
