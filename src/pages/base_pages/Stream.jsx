
import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import AboutCard from '../../components/page_components/AboutCard';
import Header from '../../components/page_components/NiceHeader';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import Feed from "react-instagram-authless-feed"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { isSafari } from 'react-device-detect';

class Stream extends Component {

  constructor(props){
    super(props)
    this.state = {gotScript: false, wu: null};
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://secure.wufoo.com/scripts/embed/form.js';
    script.crossOrigin = true;

    script.onload = () => this.scriptLoaded();

    document.head.appendChild(script);


    //this.a = new WuufooForm();
    //this.a.initialize(options)
    //this.a.display()


  }

  scriptLoaded() {
    const wu = new window.WufooForm();
    const options = {
      'userName': 'sof21',
      'formHash': 'zw8w4fd18pzpde',
      'autoResize': true,
      'height': '435',
      'async': true,
      'host': 'wufoo.com',
      'header': 'show',
      'ssl': true
    };

    wu.initialize(options);
    this.setState({
      gotScript: true,
      wu: wu
    })
  }

  static pageTitle() {
    return <FormattedMessage id='Stream.title' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Stream.navTitle' />
  }

  render() {
    return (
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
          <GridCell desktop='12' tablet='8' phone='4'>
            <p><FormattedMessage id='Stream.info.p1' /></p>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <p><FormattedMessage id='Stream.info.vote' /></p>
            
            <div id='wufoo-zw8w4fd18pzpde'>
            </div>
            {this.state.gotScript? this.state.wu.display() : null}
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12'>
            <Header>Streams</Header>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <div className='iframe-container'>
              <iframe className='responsive-iframe' width="560" height="315" src="https://www.youtube.com/embed/G8vSqfkNi9Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <p className='iframe-container'>
              <iframe className='responsive-iframe' width="560" height="315" src="https://www.youtube.com/embed/X6VXLTBJopA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </p>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <div className='iframe-container'>
              <iframe className='responsive-iframe'  width="560" height="315" src="https://www.youtube.com/embed/F3-cq7hkorM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </GridCell>

          <GridCell desktop='12' tablet='8' phone='4'>
            <div className='iframe-container'>
              <iframe title='twitch' className='responsive-iframe' src="https://player.twitch.tv/?channel=studentorkesterfestivalen&parent=localhost&autoplay=false" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
            </div>
          </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps)(withRouter(injectIntl(Stream)));
