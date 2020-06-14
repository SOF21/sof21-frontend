import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';
import SofCountdown from '../../components/page_components/SofCountdown'

import { FormattedMessage, injectIntl } from 'react-intl'

import { withRouter } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';
import { ListDivider } from '@rmwc/list';
import { SimpleDataTable } from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import {
  List,
  ListGroup,
} from '@rmwc/list';

import CortegeEntry from '../../components/page_components/CortegeEntry';


class CortegeFestival extends Component{
  constructor(props){
    super(props)

  }

  static pageTitle(){
    return <FormattedMessage id='AreaFestival.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='AreaFestival.navTitle' />
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <a
                target="_blank" 
                rel="noopener noreferrer" 
                href='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_festival/Map.png'
              >
                <Ripple>
                  <div
                    className = 'full-width-grid-image cortege-image mdc-item-only-hover'
                    style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_festival/Map_small.png)', paddingTop: '54%'}}
                  >
                  </div>
                </Ripple>
              </a>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' style={{marginTop: '16px'}}>
              <p>
                <FormattedMessage id='AreaFestival.text' />
              </p>
              <p>
                <FormattedMessage id='AreaFestival.text2' />
              </p>
              <Header>
                <FormattedMessage id='AreaFestival.map' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <iframe src="https://www.google.com/maps/d/u/2/embed?mid=1ssIM5drM_DpSRxUI0fC3HBUIaq9j_LPc" width="640" height="480" style={{width: '100%'}}>
              </iframe>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(CortegeFestival));
