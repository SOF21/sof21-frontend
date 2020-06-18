import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage } from 'react-intl'

import ContactView from '../../components/page_components/ContactView';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';

const generalContact = [
  {name: 'Elin Norberg', title: 'General', email: 'sof-general', image: ''},
];

const festivalContacts = [
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: ''},
  {name: 'Emma Green', title: 'Servering', email: 'servering', image: ''},
  {name: 'Jesper Andersson', title: 'Område - Festival', email: 'omrade-festival', image: ''},
  {name: 'Kasper Landgren', title: 'Område - Uppbyggnad', email: 'omrade-uppbyggnad', image: ''},
  {name: 'Sara Wågman', title: 'Personal', email: 'personal', image: ''},
  {name: 'Joel H Nilsson', title: 'Orkester', email: 'orkester', image: ''},
  {name: 'Daniel Pysander', title: 'Kårtege', email: 'kartege', image: ''},
];

const commContacts = [
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: ''},
  {name: 'Michelle Krejci', title: 'IT', email: 'it', image: ''},
  {name: 'Ester Brandås', title: 'Samarbete', email: 'samarbete', image: ''},
  {name: 'Didrik Florhed', title: 'Marknadsföring', email: 'marknadsforing', image: ''},
  {name: 'Ylva Bröms', title: 'Art Director', email: 'ad', image: ''},
  {name: 'Hanna Emanuelsson', title: 'Event', email: 'event', image: ''},
];

const managmentContacts = [
  {name: 'Gustaf Udd', title: 'Vise General', email: 'vicegeneral', image: ''},
  {name: 'Erik Edeskog', title: 'Säkerhet', email: 'sakerhet', image: ''},
  {name: 'Sara Höglund', title: 'Riks-SMASK', email: 'rikssmask', image: ''},
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: ''},
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: ''},
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
            <GridCell phone="0" tablet="1" desktop="3"/>
            <GridCell phone="4" tablet="6" desktop='6'>
              <ContactCard
                name={generalContact[0].name} 
                title={generalContact[0].title} 
                email={generalContact[0].email} 
                image={generalContact[0].image}
                mailSuffix="@lintek.liu.se"
              />
            </GridCell>
            <GridCell phone="0" tablet="1" desktop="3"/>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Ledning' 
                contacts={managmentContacts} 
                isMobile={this.props.isMobile} />
            </GridCell>

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

            </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Contact;
