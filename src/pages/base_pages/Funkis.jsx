import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../../components/page_components/HighlightedArea';
import SofCountdown from '../../components/page_components/SofCountdown'
import ContactCard from '../../components/page_components/ContactCard';
import Modal from '../../components/page_components/Modal';

import { connect } from 'react-redux';

import { ListDivider } from '@rmwc/list';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { SimpleDataTable } from '@rmwc/data-table';

import { isIOS } from 'react-device-detect';


const contactSara = { name: 'Sara Wågman', title: 'Personal', email: 'personal', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/SaraW.jpg' };
const contactIngrid = { name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Ingrid.jpg' };


class Funkis extends Component {

  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.state = {
      formOpen: false, formLoading: true,
      timerFinished: false, toDate: new Date('2021-04-25T23:59:59')
    }
  };

  closeModal = () => {
    this.setState({ formOpen: false });
  }

  handleFormClick = () => {
    window.open('https://podio.com/webforms/25540968/1953117', '_blank');
  }

  static pageTitle() {
    return <FormattedMessage id='Funkis.title' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Funkis.title' />
  }

  render() {
    return (
      <React.Fragment>


        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <img
                className='full-width-grid-image'
                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Funkisrek/SOF+l+Funkisrek+l+Instagram+l+F%C3%B6rm%C3%A5ner'
                alt=''
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2 style={{ marginTop: '16px' }}>
                <FormattedMessage id='Funkis.t1' />
              </h2>
              {this.props.lang === 'en' ? <b> This page is not available in english, sorry! </b> : null}
              <p>
                <FormattedMessage id='Funkis.p1' />
              </p>
              <ul>
                <li><FormattedMessage id='Funkis.l1' /></li>
                <li><FormattedMessage id='Funkis.l2' /></li>
                <li><FormattedMessage id='Funkis.l3' /></li>
                <li><FormattedMessage id='Funkis.l4' /></li>
                <li><FormattedMessage id='Funkis.l5' /></li>
              </ul>
              <p>
                <FormattedMessage id='Funkis.p2' />
              </p>
            </GridCell>
          </GridInner>
        </Grid>
        <HighlightedArea className='countdown-inner' color='yellow'
        >
          {(!this.state.timerFinished) ?
            <SofCountdown
              label={<FormattedMessage id='Funkis.timeLeft' />}
              toDate={this.state.toDate}
              countdownFinishCallback={() => this.setState({ timerFinished: true })}
            /> :
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <h4 style={{ margin: '0' }}>
                <FormattedMessage id='Funkis.extended' />
              </h4>
            </GridCell>
          }
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider />
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <Button
              raised
              onClick={this.handleFormClick}
              style={{ width: '100%' }}
            >
              <FormattedMessage id='Funkis.register' />
            </Button>
          </GridCell>
          {/* (!this.state.timerFinished) ?
              <GridCell span='12'>
                <Button
                  raised
                  style={{width: '100%'}}
                  onClick={() => this.setState({toDate: new Date(Date.now() + 2000)})}
                >
                  Press to test timer
                </Button>
              </GridCell>
            : ''
            */}
        </HighlightedArea>
        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p style={{ textAlign: 'center' }}>
                <FormattedMessage id='Funkis.p3' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactSara.name}
                title={contactSara.title}
                email={contactSara.email}
                image={contactSara.image}
                clickable
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactIngrid.name}
                title={contactIngrid.title}
                email={contactIngrid.email}
                image={contactIngrid.image}
                clickable
              />
            </GridCell>
          </GridInner>
        </Grid>

      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state.locale.lang,
  };
}

export default connect(mapStateToProps)(injectIntl(Funkis, { forwardRef: true }));
