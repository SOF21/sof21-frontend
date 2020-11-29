import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';
import SofCountdown from '../../components/page_components/SofCountdown'
import EventCard from '../../components/page_components/EventCard';

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



class EventFestival extends Component{
  constructor(props){
    super(props)

  }

  static pageTitle(){
    return <FormattedMessage id='EventFestival.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='EventFestival.navTitle' />
  }

  render() {
    const eventData = [
      {
        title: this.props.intl.formatMessage({id: 'EventFestival.event1Title'}),
        desc: this.props.intl.formatMessage({id: 'EventFestival.event1'}),
        img: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/58604173_2357826084240925_9076003827664027648_o.jpg?_nc_cat=106&_nc_ht=scontent-arn2-2.xx&oh=4db235f135670a2c4ec6d37f7a198556&oe=5D727C28',
        url: 'https://www.facebook.com/events/347123572581172/'
      },
      {
        title: this.props.intl.formatMessage({id: 'EventFestival.event2Title'}),
        desc: this.props.intl.formatMessage({id: 'EventFestival.event2'}),
        img: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/58625864_2357827860907414_3037774718569545728_o.jpg?_nc_cat=107&_nc_ht=scontent-arn2-2.xx&oh=455a284592555939a6d0a3c63eaa4d4e&oe=5D5F72E3',
        url: 'https://www.facebook.com/events/278030086439913/'
      },
    ]

    const events = eventData.map(event => (
      <GridCell phone="4" tablet="4" desktop='6'>
        <EventCard {...event} />
      </GridCell>
    ));

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <img
                className = 'full-width-grid-image'
                src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/area_events/event1.jpg'
                alt=''
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' style={{marginTop: '16px'}}>
              <Header>
                <FormattedMessage id='EventFestival.activities' />
              </Header>
              <p>
                <FormattedMessage id='EventFestival.activitiesT' />
              </p>
              <p>
                <FormattedMessage id='EventFestival.activitiesT2' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='EventFestival.event' />
              </Header>
            </GridCell>
              {events}
              {/*<GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='EventFestival.sofIStan' />
              </Header>
            </GridCell>*/}

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(EventFestival));
