import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';

import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { Ripple } from '@rmwc/ripple';
import { ListDivider } from '@rmwc/list';
import { SimpleDataTable } from '@rmwc/data-table';


const contactDaniel = {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/million_dollar_smile.jpg'};
const contactNils = {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/larsa.jpg'};

const images = [
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege1.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege2.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege4.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege3.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege5.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_about/cortege6.jpg',
    description: '',
  }
]

class CortegeAbout extends Component{
  constructor(props){
    super(props)

    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.modalRef = React.createRef();

    this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00'), imageModalOpen: false, selectedImage: 1};
  }

  static pageTitle(){
    return <FormattedMessage id='CortegeAbout.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='CortegeAbout.navTitle' />
  }

  onTimerFinish(){
    this.setState({timerFinished: true});
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
                <FormattedMessage id='CortegeAbout.Info1' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <Header>
                <FormattedMessage id='CortegeAbout.h1' />
              </Header>
              <p>
                <FormattedMessage id='Cortege.info.coronaModal.p2' />
              </p>
              <p>
                <FormattedMessage id='Cortege.info.coronaModal.p3' />
              </p>
              <p>
                <FormattedMessage id='Cortege.info.coronaModal.p5' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[1].original + ')'}}
                  onClick={() => this.openModal(1)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[2].original + ')'}}
                  onClick={() => this.openModal(2)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <div style={{height: '16px'}}/>
              <Header style={{marginTop: '16px'}}>
                <FormattedMessage id='CortegeAbout.h2' />
              </Header>
              <p>
                <FormattedMessage id='Cortege.info.coronaModal.p4' />
              </p>
              <p>
                <FormattedMessage id='Cortege.info.coronaModal.p6' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='8' className='h-center'>
              <Ripple>
                <div
                  className = 'cortege-image cortege-image-square-desktop mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[3].original + ')'}}
                  onClick={() => this.openModal(3)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='4' className='h-center'>
              <GridInner style={{width: '100%'}} className='grid-gap-8'>
                <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                  <Ripple>
                    <div
                      className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                      style={{backgroundImage: 'url(' + images[4].original + ')'}}
                      onClick={() => this.openModal(4)}
                    />
                  </Ripple>
                </GridCell>
                <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                  <Ripple>
                    <div
                      className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                      style={{backgroundImage: 'url(' + images[5].original + ')'}}
                      onClick={() => this.openModal(5)}
                    />
                  </Ripple>
                </GridCell>
              </GridInner>
            </GridCell>
          </GridInner>
        </Grid>

       {/*  <HighlightedArea className='countdown-inner' color='yellow'
        >
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h3 style={{margin: '10px'}}>
              <FormattedMessage id='CortegeAbout.themeText' />
            </h3>
          </GridCell>
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider/>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center'>
            <h2 style={{margin: '10px'}}>
              <b> <FormattedMessage id='CortegeAbout.theme' /> </b>
            </h2>
          </GridCell>
        </HighlightedArea> */}

      </React.Fragment>
    );
  }
}

export default injectIntl(CortegeAbout);
