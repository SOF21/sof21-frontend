import React, { Component } from 'react';

import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar';

import posed from 'react-pose';

const PosedHeaderTitle = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

const PosedHeaderImage= posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0 }
});

export default class BasePageHeader extends Component{

  render() {
    var imageClass = '';
    if(this.props.color === 'Red'){
      imageClass = 'base-page-header-image base-page-header-red';
    } else if (this.props.color === 'Yellow'){
      imageClass = 'base-page-header-image base-page-header-yellow';
    } else{
      imageClass = 'base-page-header-image';
    }
    return(
      <React.Fragment>
        <div className='base-page-header'>
          <TopAppBarFixedAdjust/>
          <PosedHeaderImage className={imageClass}>
            {/* <img 
              async='on'
              className='base-page-header-image-left-dots' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            />
            <img 
              async='on'
              className='base-page-header-image-right-dots' 
              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/header-hero-edge.png'
              alt=''
            /> */}
          </PosedHeaderImage>
          <PosedHeaderTitle className='base-page-header-content'>
            <div className='base-page-header-title'>
              <h1>
                {this.props.title}
              </h1>
            </div>
          </PosedHeaderTitle>
        </div>
      </React.Fragment>
    );
  }
}
