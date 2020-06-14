import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import ImageModal from '../../components/page_components/ImageModal';
import { Ripple } from '@rmwc/ripple';

const images = [
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester1.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester2.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester3.jpg',
    description: '',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/orchestra_about/orkester4.jpg',
    description: '',
  }
]


class OrchestraAbout extends Component{

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
    return <FormattedMessage id='OrchestraAbout.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='OrchestraAbout.navTitle' />
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
              <p>
                <FormattedMessage
                  id="OrchestraAbout.p1"
                />
              </p>
              <p className='cite' style={{paddingTop: '0px'}}>
                <FormattedMessage
                  id="OrchestraAbout.cite1"
                />
              </p>
              <Ripple>
                <div
                  className = 'cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[1].original + ')'}}
                  onClick={() => this.openModal(1)}
                />
              </Ripple>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <Ripple>
                <div
                  className = 'cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[2].original + ')'}}
                  onClick={() => this.openModal(2)}
                />
              </Ripple>
              <p>
                <FormattedMessage
                  id="OrchestraAbout.p2"
                />
              </p>
              <Ripple>
                <div
                  className = 'cortege-image mdc-item-only-hover'
                  style={{backgroundImage: 'url(' + images[3].original + ')'}}
                  onClick={() => this.openModal(3)}
                />
              </Ripple>
              <p style={{fontSize: '0.75rem', lineHeight: '1rem'}}>
                <FormattedMessage
                  id="OrchestraAbout.small"
                />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}


export default injectIntl(OrchestraAbout);
