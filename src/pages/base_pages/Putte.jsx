import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import HighlightedArea from '../../components/page_components/HighlightedArea';
import SofCountdown from '../../components/page_components/SofCountdown'
import ContactCard from '../../components/page_components/ContactCard';
import Modal from '../../components/page_components/Modal';

import { connect, connectAdvanced } from 'react-redux';

import { ListDivider } from '@rmwc/list';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';

const contactSara = { name: 'Sara Wågman', title: 'Personalansvarig', email: 'personal', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/SaraW.png' };
const contactIngrid = { name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: '' };

export const committees = {
    economy: { email: 'vicegeneral', path: '/economy', spots: ['vice', 'tickets'] },
    security: { email: 'sakerhet', path: '/security', spots: ['vice'] },
    services: { email: 'servering', path: '/services', spots: ['vice', 'festival', 'staff', 'bar'] },
    cooperation: { email: 'samarbete', path: '/cooperation', spots: ['vice', 'spons'] },
    staff: { email: 'personal', path: '/staff', spots: ['vice', 'schedule', 'funkis'] },
    orchestra: { email: 'orkester', path: '/orchestra', spots: ['vice', 'scene', 'logistics', 'housing'] },
    premises: { email: 'omrade-festival(omrade-uppbyggnad', path: '/premises', spots: ['custodian', 'electrics', 'wifi', 'decor', 'activity'] },
    marketing: { email: 'marknadsforing', path: '/marketing', spots: ['vice', 'fotoFilm', 'pr'] },
    parade: { email: 'kartege', path: '/parade', spots: ['vice', 'locale', 'material', 'train'] },
    it: { email: 'it', path: '/it', spots: ['vice', 'frontend'] },
    event: { email: 'event', path: '/event', spots: ['vice', 'sittings', 'town'] },
    artDirector: { email: 'ad', path: '/art_director', spots: ['vice', 'creation', 'print'] }
}

class Putte extends Component {

    constructor(props) {
        super(props);
        this.intl = this.props.intl;

        this.state = {
            formOpen: false, formLoading: true,
            timerFinished: false, toDate: new Date('2020-09-27T23:59:59')
        }
    };

    closeModal = () => {
        this.setState({ formOpen: false });
    }

    static pageTitle() {
        return <FormattedMessage id='Putte.title' />
    }

    static pageNavTitle() {
        return <FormattedMessage id='Putte.title' />
    }

    render() {
        const mappedCommittees = Object.keys(committees).map(key => {
            return (
                <GridCell phone="4" tablet="8" desktop='12' key={key}>
                    {!this.props.isMobile ?
                        <h4 style={{ margin: '0' }}>
                            <FormattedMessage id={'Putte.'.concat(key, '.title')} />
                        </h4>
                        :
                        <h5 style={{ margin: '0' }}>
                            <FormattedMessage id={'Putte.'.concat(key, '.title')} />
                        </h5>
                    }
                    <p>
                        <FormattedMessage id={'Putte.'.concat(key, '.text')} />
                    </p>
                    <Button onClick={() => this.props.history.push(committees[key].path)}>
                        <FormattedMessage id='Putte.readmore' />
                    </Button>
                </GridCell>
            )
        })
        return (
            <React.Fragment>
                <Grid className="base-outer-grid base-outer-grid--first">
                    <GridInner>
                        <GridCell phone="4" tablet="8" desktop='12'>
                            <img
                                className='full-width-grid-image'
                                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Putterek/Hero-putte-1920px-01_margin.png'
                                alt=''

                            />
                        </GridCell>
                        <GridCell phone="4" tablet="8" desktop='12'>
                            {this.props.lang === 'en' ? <b> This page is not available in english, sorry! </b> : null}
                            <h4 style={{ margin: '0px', fontWeight: '700' }}>
                                Vad innebär det att vara Putte i SOF?
                            </h4>
                            <p>
                                <FormattedMessage id='Putte.p1' />
                            </p>
                            <p>
                                <FormattedMessage id='Putte.p2' />
                            </p>
                        </GridCell>
                    </GridInner>
                </Grid>
                <HighlightedArea className='countdown-inner' color='yellow'
                >
                    {(!this.state.timerFinished) ?
                        <SofCountdown
                            label={<FormattedMessage id='Putte.timeLeft' />}
                            toDate={this.state.toDate}
                            countdownFinishCallback={() => this.setState({ timerFinished: true })}
                        /> :
                        <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
                            <h4 style={{ margin: '0' }}>
                                <FormattedMessage id='Putte.closed' />
                            </h4>
                        </GridCell>
                    }
                    {(!this.state.timerFinished) ?
                        <GridCell phone="4" tablet="8" desktop='12' >
                            <Button
                                raised
                                onClick={() => window.open('https://podio.com/webforms/21551423/1499537')}
                                style={{ width: '100%', marginBottom: '5px' }}
                            >
                                <FormattedMessage id='Putte.register' />
                            </Button>
                            <Button
                                raised
                                onClick={() => window.open('https://podio.com/webforms/24969877/1832852')}
                                style={{ width: '100%' }}
                            >
                                <FormattedMessage id='Putte.nominate' />
                            </Button>
                        </GridCell>
                        :
                        ''
                    }
                    {/* {(!this.state.timerFinished) ?
                        <GridCell span='12'>
                            <Button
                                raised
                                style={{ width: '100%' }}
                                onClick={() => this.setState({ toDate: new Date(Date.now() + 2000) })}
                            >
                                Press to test timer
                            </Button>
                        </GridCell>
                        : ''
                    } */}
                </HighlightedArea>
                <Grid className="base-outer-grid ">
                    <GridInner>
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
                        {mappedCommittees}
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

export default connect(mapStateToProps)(injectIntl(Putte, { forwardRef: true }));
