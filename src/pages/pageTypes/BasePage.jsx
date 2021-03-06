import React, { Component } from 'react';

import BasePageHeader from './BasePageHeader';
import PageFooter from './PageFooter';

import posed from 'react-pose';

const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

export default class BasePage extends Component{

  render() {
    const {content: { pageTitle } = {}, title} = this.props;
    return(
      <React.Fragment>
        <BasePageHeader
          title={(pageTitle && pageTitle()) || title}
        />

        <PosedPage  className='base-page-content'>
          {this.props.children}
        </PosedPage>

        <PageFooter/>
      </React.Fragment>
    );
  }
}

