import React, { Component } from 'react';

import posed from 'react-pose/lib/index';

import ScrollLock from 'react-scrolllock';

import ImageGallery from 'react-image-gallery';

import { IconButton } from '@rmwc/icon-button';

const Frame = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0
  },
  open: {
    applyAtStart: { display: 'block' },
    opacity: 1
  }
});

const Container = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    scale: 0.8,
    transition:{
      duration: 150,
    }
  },
  open: {
    applyAtStart: { display: 'flex' },
    opacity: 1,
    scale: 1,
  }
});

export default class ImageModal extends Component{
  constructor(props){
    super(props)

    this.changeImage = this.changeImage.bind(this);

    this.galleryRef = React.createRef();
  }

  changeImage(index){
    this.galleryRef.current.slideToIndex(index);
  }

  render(){
    let stopScroll;
    if (this.props.isOpen){
      stopScroll = <ScrollLock/>;
    }

    return(
      <div>
        {stopScroll}
        <Frame 
          className = 'image-modal-frame' pose={(this.props.isOpen) ? 'open' : 'closed'} 
          onClick={() => this.props.exitCallback()}
        />
        <Container className = 'image-modal-container' pose={(this.props.isOpen) ? 'open' : 'closed'}>
          <IconButton 
            icon='close'
            className='image-modal-exit-button'
            onClick={() => this.props.exitCallback()}
          />
          <ImageGallery 
            infinite={false}
            ref={this.galleryRef}
            items={this.props.images} 
            showBullets
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            startIndex={this.props.selectedImage}
            {...this.props}
          />
        </Container>
      </div>
    );
  }
}

