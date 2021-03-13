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

const contactElin = { name: 'Elin Norberg', title: 'General', email: 'sof-general', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Elin.png' };
const contactJulia = { name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Julia.png' };

export const committees = {
    economy: { email: 'vicegeneral', path: '/economy', spots: ['vice', 'tickets'] },
    security: { email: 'sakerhet', path: '/security', spots: ['vice'] },
    services: { email: 'servering', path: '/services', spots: ['vice', 'festival', 'staff', 'bar'] },
    cooperation: { email: 'samarbete', path: '/cooperation', spots: ['vice', 'spons'] },
    staff: { email: 'personal', path: '/staff', spots: ['vice', 'schedule', 'funkis'] },
    orchestra: { email: 'orkester', path: '/orchestra', spots: ['vice', 'scene', 'logistics', 'housing'] },
    premises: { email: 'omrade-festival/omrade-uppbyggnad', path: '/premises', spots: ['custodian', 'electrics', 'wifi', 'decor', 'activity'] },
    marketing: { email: 'marknadsforing', path: '/marketing', spots: ['vice', 'fotoFilm', 'pr'] },
    parade: { email: 'kartege', path: '/parade', spots: ['vice', 'locale', 'material', 'train'] },
    it: { email: 'it', path: '/it', spots: ['vice', 'frontend'] },
    event: { email: 'event', path: '/event', spots: ['vice', 'sittings', 'town'] },
    artDirector: { email: 'ad', path: '/art_director', spots: ['vice', 'creation', 'print'] }
}

const vacantAssigmments = [['cooperation', 'vice'], ['premises', 'electrics'], ['premises', 'wifi'], ['parade', 'locale'], ['orchestra'], ['event', 'town']]

class Putte extends Component {

    constructor(props) {
        super(props);
        this.intl = this.props.intl;

        this.state = {
            formOpen: false, formLoading: true,
            timerFinished: false, toDate: new Date('2020-12-27T23:59:59')
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
        // creating 'paragraphs' for all committees
        const mappedCommittees = Object.keys(committees).map(key => {
            return (
                <GridCell phone="4" tablet="8" desktop='12' key={key}>
                    {!this.props.isMobile ?
                        <h4 style={{ margin: '0' }}>
                            <FormattedMessage id={`Putte.${key}.title`} />
                        </h4>
                        :
                        <h5 style={{ margin: '0' }}>
                            <FormattedMessage id={`Putte.${key}.title`} />
                        </h5>
                    }
                    <p>
                        <FormattedMessage id={`Putte.${key}.text`} />
                    </p>
                    <Button onClick={() => this.props.history.push(committees[key].path)}>
                        <FormattedMessage id='Putte.readmore' />
                    </Button>
                </GridCell>
            )
        })
        // creating 'paragraphs' for all vacant assignments
        const mappedVacantAssigments = vacantAssigmments.map(element => {
                return (
                   
                    <GridCell phone="4" tablet="8" desktop='12' key={element}>
                        {!this.props.isMobile ?
                            <h4 style={{ margin: '0' }}>
                                <FormattedMessage id={`Putte.${element[0]}.${element[1]}`} />
                            </h4>
                            :
                            <h6 style={{ margin: '0' }}>
                                <FormattedMessage id={`Putte.${element[0]}.${element[1]}`} />
                            </h6>
                        }
                        <p style={{ marginBottom: '0' }}>
                            <FormattedMessage id={`Putte.${element[0]}.text`} />
                        </p>
                    </GridCell>)
        })
        return (
            <React.Fragment>
                <Grid className="base-outer-grid base-outer-grid--first">
                    <GridInner>
                        <GridCell phone="4" tablet="8" desktop='12'>
                            <img
                                className='h-center'
                                style={{width:'100%'}}
                                src='https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Putterek/AD+_+Best%C3%A4llningar+_+Putterekrytering+2.0+_+Digitalt+_+Omslagsbild.png'
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
                <HighlightedArea className='countdown-inner' color='yellow'>
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
                </HighlightedArea>
                <Grid className="base-outer-grid ">
                    <GridInner>
                        <GridCell phone="4" tablet="4" desktop='6'>
                            <ContactCard
                                name={contactElin.name}
                                title={contactElin.title}
                                email={contactElin.email}
                                image={contactElin.image}
                                clickable
                            />
                        </GridCell>
                        <GridCell phone="4" tablet="4" desktop='6'>
                            <ContactCard
                                name={contactJulia.name}
                                title={contactJulia.title}
                                email={contactJulia.email}
                                image={contactJulia.image}
                                clickable
                            />
                        </GridCell>
                        {mappedVacantAssigments}
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
