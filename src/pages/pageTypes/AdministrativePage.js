import React, { Component } from 'react';

import AdministrativePageHeader from './AdministrativePageHeader';
import AccountPageFooter from './AccountPageFooter';

import posed from 'react-pose';

const PosedPage = posed.div({
  enter: { y: 0, opacity: 1},
  exit: { y: -100, opacity: 0, transition:{ opacity: {duration: 250}}}
});

export default class AdministrativePage extends React.PureComponent{

  render() {
    return(
      <div className='administrative-page'>

        <PosedPage  className='base-page-content'>
          {this.props.children}
        </PosedPage>

        <AccountPageFooter/>
      </div>
    );
  }
}

