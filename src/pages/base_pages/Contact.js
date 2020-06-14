import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage } from 'react-intl'

import ContactView from '../../components/page_components/ContactView';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';

const generalContact = {name: 'David Stigsmark', title: 'General', email: 'sof-general', image: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/das_general.jpg'}

const festivalContacts = [
  {name: 'Christina Hedner', title: 'Samordnare Festival', email: 'festival', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/the_one_ring.jpg'},
  {name: 'Johan Stenström', title: 'Säkerhet', email: 'sakerhet', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/juan.jpg'},
  {name: 'Anton Nordin', title: 'Servering', email: 'servering', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/anton_boy.jpg'},
  {name: 'Petter Palmqvist', title: 'Område - Festival', email: 'omrade-festival', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/frodo.jpg'},
  {name: 'Jesper Sundström', title: 'Område - Uppbyggnad', email: 'omrade-uppbyggnad', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/jappe.jpg'},
  {name: 'Johanna Samuelsson', title: 'Aktiviteter och Dekor', email: 'aktiviteter-dekor', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/rosmarie.jpg'},
];

const commContacts = [
  {name: 'Sofia Hagel', title: 'Samordnare Kommunikation', email: 'kommunikation', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/aappelknyckaren.jpg'},
  {name: 'Anton Gefvert', title: 'IT', email: 'it', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/glasklart.jpg'},
  {name: 'Johanna Gustavsson', title: 'Samarbete & Spons', email: 'samarbete', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/trassel.png'},
  {name: 'Evelyn Post', title: 'Marknadsföring', email: 'marknadsforing', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/tuttifrutti.jpg'},
  {name: 'Emilia Edman', title: 'Personal', email: 'personal', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/hejsan.jpg'},
  {name: 'Erik Nordvall', title: 'Art Director', email: 'ad', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/filur.jpg'},
  {name: 'Esaias Jerrelind', title: 'Event', email: 'event', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/tjena_kexet.png'},
];

const orkesterContacts = [
  {name: 'Jasmine Tarander', title: 'Samordnare Orkester och Kårtege', email: 'orkesterkartege', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/tussilago.jpg'},
  {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/million_dollar_smile.jpg'},
  {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/larsa.jpg'},
  {name: 'Filip Jaredson', title: 'Orkester', email: 'orkester', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/staalmannen.jpg'},
  {name: 'Simon Calderon', title: 'Riks-SMASK', email: 'rikssmask', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/tjillevippen.jpg'},
];

class Contact extends Component{

  static pageTitle(){
    return <FormattedMessage id='Contact.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Contact.navTitle' />
  }

  render() {

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
              <GridCell phone="4" tablet="8" desktop='12'>
              <Header style={{width: '100%'}}>
                General 
              </Header>
            </GridCell>
            {/* padding for centering of contact*/}
            <GridCell phone='0' tablet='1' desktop='3' className = 'hide-mobile'> </GridCell>
            <GridCell phone="4" tablet="6" desktop='6'>
              <ContactCard
                name={generalContact.name} 
                title={generalContact.title} 
                email={generalContact.email} 
                image={generalContact.image}
                mailSuffix="@lintek.liu.se"
              />
            </GridCell>
            <GridCell phone='0' tablet='1' desktop='3' className = 'hide-mobile'> </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Festival' 
                contacts={festivalContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Kommunikation' 
                contacts={commContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Orkester och Kårtege' 
                contacts={orkesterContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Contact;
