import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage, injectIntl } from 'react-intl'

import { TextField } from '@rmwc/textfield'

import SearchField from '../../components/page_components/SearchField'
import ContactView from '../../components/page_components/ContactView';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';

const generalContact = [
  {name: 'Elin Norberg', title: 'General', email: 'sof-general', image: '', id: 1},
];

const festivalContacts = [
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: '', id: 2},
  {name: 'Emma Green', title: 'Servering', email: 'servering', image: '', id: 3},
  {name: 'Jesper Andersson', title: 'Område - Festival', email: 'omrade-festival', image: '', id: 4},
  {name: 'Kasper Landgren', title: 'Område - Uppbyggnad', email: 'omrade-uppbyggnad', image: '', id: 5},
  {name: 'Sara Wågman', title: 'Personal', email: 'personal', image: '', id: 6},
  {name: 'Joel H Nilsson', title: 'Orkester', email: 'orkester', image: '', id: 7},
  {name: 'Daniel Pysander', title: 'Kårtege', email: 'kartege', image: '', id: 8},
];

const commContacts = [
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: '', id: 9},
  {name: 'Michelle Krejci', title: 'IT', email: 'it', image: '', id: 10},
  {name: 'Ester Brandås', title: 'Samarbete', email: 'samarbete', image: '', id: 11},
  {name: 'Didrik Florhed', title: 'Marknadsföring', email: 'marknadsforing', image: '', id: 12},
  {name: 'Ylva Bröms', title: 'Art Director', email: 'ad', image: '', id: 13},
  {name: 'Hanna Emanuelsson', title: 'Event', email: 'event', image: '', id: 14},
];

const managmentContacts = [
  {name: 'Gustaf Udd', title: 'Vice General', email: 'vicegeneral', image: '', id: 15},
  {name: 'Erik Edeskog', title: 'Säkerhet', email: 'sakerhet', image: '', id: 16},
  {name: 'Sara Höglund', title: 'Riks-SMASK', email: 'rikssmask', image: '', id: 17},
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: '', id: 18},
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: '', id: 19},
];

class Contact extends Component{
  constructor(props) {
    super(props)

    this.state = { searchField: ""}
  }

  static pageTitle(){
    return <FormattedMessage id='Contact.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Contact.navTitle' />
  }

  filteredContacts(arr){
    const { searchField } = this.state
    return arr.filter(contact => 
      (contact.name.toLowerCase().includes(searchField.toLowerCase()) || 
      contact.title.toLowerCase().includes(searchField.toLowerCase())));
  }

  render() {
    const { searchField } = this.state
    const searching = (searchField.length !== 0)
    console.log(searching)

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <SearchField
                handleChange={e => this.setState({searchField: e.target.value})}
              />       
            </GridCell>
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
                contacts={this.filteredContacts(managmentContacts)}
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Festival' 
                contacts={this.filteredContacts(festivalContacts)} 
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Kommunikation' 
                contacts={this.filteredContacts(commContacts)} 
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Contact)
