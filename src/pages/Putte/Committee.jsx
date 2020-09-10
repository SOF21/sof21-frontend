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
import Putte from './Putte';
import { string } from 'prop-types';


class Committee extends Component {

    constructor(props) {
        super(props);
        this.intl = this.props.intl;
        this.committee = this.props.committee;
        this.spots = this.props.spots;

        this.state = {
            formOpen: false, formLoading: true,
        }
    };

    closeModal = () => {
        this.setState({ formOpen: false });
    }

    static pageTitle() {
        return ''
    }

    static pageNavTitle() {
        return <FormattedMessage id='Putte.title' />
    }

    render() {
        var result = this.props.spots.map(element => {
            console.log(element);
            return (
            <GridCell phone="4" tablet="8" desktop='12'>
                <h4 style={{ margin: '0px' }}>
                    <FormattedMessage id={'Putte.'.concat(this.props.committee, '.', element)}/>
                </h4>
                <p>
                    <FormattedMessage id={'Putte.'.concat(this.props.committee, '.', element, '.desc')}/>
                </p>
            </GridCell>)
        })
        return (
            <React.Fragment>

                <Grid className="base-outer-grid ">
                    <GridInner>
                        <GridCell phone="4" tablet="8" desktop='12'>
                            <h2 style={{ marginBottom: '10px', marginTop: '10px'}} className="h-center">
                                <FormattedMessage id={'Putte.'.concat(this.props.committee, '.title')}/>
                            </h2>
                        </GridCell>
                        <GridCell phone="4" tablet="8" desktop='12'>
                            <Button
                                onClick={() => window.open('https://podio.com/webforms/21551423/1499537')}
                                style={{ width: '100%'}}
                                ripple={false}
                            >
                                <FormattedMessage id='Putte.register' />
                            </Button>
                            <Button
                                onClick={() => window.open('https://podio.com/webforms/24969877/1832852')}
                                style={{ width: '100%' }}
                            >
                                <FormattedMessage id='Putte.nominate' />
                            </Button>
                        </GridCell>
                        {result}
                        <GridCell phone="4" tablet="8" desktop='12'>
                            <Button onClick={() => this.props.history.push('/putte')}>
                                <FormattedMessage id='Putte.back'/>
                            </Button>
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

export default connect(mapStateToProps)(injectIntl(Committee, { forwardRef: true }));
