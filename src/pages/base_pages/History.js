import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import ImageModal from '../../components/page_components/ImageModal';
import { Ripple } from '@rmwc/ripple';

const images = [
  {
    original: 'http://www.lysator.liu.se/sof/sof2003/albumbilder/sof1999/lordag/Guldbrallor.jpg',
    description: '',
  },
  {
    original: 'http://www.lysator.liu.se/sof/sof2003/albumbilder/sof2001/lordag/Bild003.jpg',
    description: '',
  },
  {
    original: 'http://www.lysator.liu.se/sof/sof2003/albumbilder/sof1999/kartege/Kartegeclowner.jpg',
    description: '',
  }
]


class History extends Component{

  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {imageModalOpen: false, selectedImage: 1};

    this.modalRef = React.createRef();
  }

  static pageTitle(){
    return <FormattedMessage id='History.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='History.navTitle' />
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

  render(){
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
              { /*<h1>
                <FormattedMessage
                  id="History.historyHeading"
                  defaultMessage="SOFs Historia"
                />
              </h1> */ }
              <p>
                <FormattedMessage
                  id="History.historyParagraph1"
                  defaultMessage="Studentorkesterfestivalen gick för allra första gången av stapeln år 1973
                  i Linköping. SOF anordnades av LinTek i Linköping varje år fram till 1977,
                  då Uppsala tog sig an uppdraget att anordna festivalen, men under namnet
                  STORK. Sedan dess har SOF arrangerats i Linköping under udda år och har
                  vuxit till en av norra Europas största studentfestivaler, med besökande
                  från hela Sverige och norra Europa."
                />
              </p>
              <Ripple>
                <div
                  className = 'cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[1].original + ')'}}
                  onClick={() => this.openModal(1)}
                />
              </Ripple>
              <p>
                <FormattedMessage
                  id="History.historyParagraph2"
                  defaultMessage="Under en helg i december 1972 grundades Riks-SMASK på ett hotell i Södertälje.
                  Styrelsen beslutade samma helg att en årlig studentorkesterfestivalen borde
                  anordnas och platsen för denna festival blev Linköping. Studentorkesterfestivalen
                  anordnas fortfarande varje år i uppdrag av Riks-SMASK. SMASK:et i Riks-SMASK
                  står för Sveriges Musicerande Akademikers Samarbetande Kårorkestrar och Riks-SMASK
                  är en samlingsorganisation för alla studentorkestrar och studentbaletter vid
                  Sveriges universitet och högskolor."
                />
              </p>
              <Ripple>
                <div
                  className = 'cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[2].original + ')'}}
                  onClick={() => this.openModal(2)}
                />
              </Ripple>
              <p>
                <FormattedMessage
                  id="History.historyParagraph3"
                  defaultMessage="Tutputten är namnet som Riks-SMASKs maskot bär. Tutputten är en vit huvudfoting
                  som för första gången visade sig år 1975 i Linköping. Tutputtens ursprung är än idag okänt."
                />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}


export default injectIntl(History);
