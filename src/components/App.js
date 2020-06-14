import React from 'react';
import Navbar from './navigation';
import PageRouter from './PageRouter';
import {ThemeProvider} from '@rmwc/theme';
import { IntlProvider} from 'react-intl';
import strings from '../locale/index';
import PropTypes from 'prop-types';
import Start from '../pages/base_pages/Start';

import CortegeFestival from '../pages/base_pages/CortegeFestival';
import ScheduleFestival from '../pages/base_pages/ScheduleFestival';
import AreaFestival from '../pages/base_pages/AreaFestival';
import EventFestival from '../pages/base_pages/EventFestival';

import Om from '../pages/base_pages/About';
import CortegeAbout from '../pages/base_pages/CortegeAbout';
import OrchestraAbout from '../pages/base_pages/OrchestraAbout';
import History from '../pages/base_pages/History';

import Contact from '../pages/base_pages/Contact';
import Funkis from '../pages/base_pages/Funkis';
import Shop from '../pages/base_pages/Shop';

import { connect } from 'react-redux';
import { setLocaleAndStore } from '../actions/locale';
import { setMobile } from '../actions/mobile';
import { setTitle } from '../actions/title';
import { closeDialog, closeSnackbar } from '../actions/dialog';
import { fetchProducts } from '../actions/shop';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { Snackbar, SnackbarAction } from '@rmwc/snackbar';


const pages = intl =>{
  return{
    '/':  Start,
    /*[intl({id: 'Start.festivalTitle'})]: {
      '/festival_schedule': ScheduleFestival,
      '/festival_area': AreaFestival,
      '/festival_cortege': CortegeFestival,
      '/festival_activities': EventFestival
    },*/
    [intl({id: 'Start.aboutTitle'})]: {
      '/about_festival': Om,
      '/about_cortege': CortegeAbout,
      '/about_orchestra': OrchestraAbout,
      '/about_history': History,
    },
    //'/about': Om,
    //'/shop': Shop,
    '/contact': Contact,
    //'/funkis': Funkis,
  }
};

class App extends React.PureComponent {
  constructor(props){
    super(props)

    this.cookies = this.props.cookies;
    this.handleResize = this.handleResize.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = {isMobile: false, isTablet: false};
  }


  handleResize() {
    if(!this.state.isMobile && window.innerWidth < 480){
      this.props.setMobile(true);
    } else if(this.state.isMobile && window.innerWidth >= 480){
      this.props.setMobile(false);
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    this.changeLanguage = this.changeLanguage.bind(this);
    this.props.fetchProducts();
  }

  changeLanguage(){
    this.props.setLocaleAndStore(this.props.lang === 'sv' ? 'en' : 'sv');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { lang, isMobile } = this.props;

    return (
      <IntlProvider locale={lang} messages={strings[lang]}>
        <div className="App">

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"/>

          <img
            className='app-sof-logo'
            src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/layout/sof_19_logo_stor.png'
            alt=''
          />
          <ThemeProvider options={{
            primary: '#FF0000',
            secondary: '#0c726f'
          }}
            style={{height: '100%'}}
          >
            <div id='modal-root'/>
            <Dialog
              open={this.props.dialog.open}
              onClose={() => this.props.closeDialog()}
            >
              <DialogTitle>{this.props.dialog.title}</DialogTitle>
              <DialogContent> {this.props.dialog.text} </DialogContent>
              <DialogActions>
                <DialogButton action="accept" isDefaultAction>OK</DialogButton>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={this.props.dialog.snackBarOpen}
              onClose={() => this.props.closeSnackbar()}
              message={this.props.dialog.snackBarMsg}
            />

            <Navbar
              lang={this.props.lang}
              changeLanguage={this.changeLanguage}
              pages={pages}
              isMobile={isMobile}
            />

            <PageRouter
              isMobile={isMobile}
              pages={pages}
            />

        </ThemeProvider>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  lang: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  setLocaleAndStore: PropTypes.func.isRequired,
  setMobile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    lang: state.locale.lang,
    isMobile: state.mobile.isMobile,
    dialog: state.dialog,
    //isTablet: state.tablet.isTablet,
  };
}

export default connect(mapStateToProps, { closeDialog, closeSnackbar, setLocaleAndStore, setMobile, setTitle, fetchProducts })(App);
